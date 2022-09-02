const server = "https://cyzz.fun/HealthCareAssessment/";

function initResBySelectType(selectType,currentType) {
    //console.log('current type : ',currentType);
    let queryCompletedAndUncompleted = false;
    let queryElderAndCareGiver = false;
    if(currentType.queryCompleted === false && currentType.queryUnCompleted === false) {
        queryCompletedAndUncompleted = true;
    } 
    if(currentType.queryElder === false && currentType.queryCareGiver === false) {
        queryElderAndCareGiver = true;
    }
    const tmpArr = [];
    if(queryCompletedAndUncompleted === false) {
        tmpArr.push({"IsCompleted":{"$eq":currentType.queryCompleted}});        
    }
    if(queryElderAndCareGiver === false) {
        if(currentType.queryElder) {
            tmpArr.push({"SubjectId":{"$ne":""}});
        } else {
            tmpArr.push({"AssistantId":{"$ne":""}});
        }
    }
    if(selectType.and === true) {
        return {
            "seniorSearchRes":{
                "$and":tmpArr,
                "$or":[]
            }
        }
    } else {
        return {
            "seniorSearchRes":{
                "$or":tmpArr,
            }
        }
    }
}

async function fetchBySeniorSearch(filter) {
    console.log('search filter : ',filter);
    const res = await fetch(server+'form/search',{
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body:JSON.stringify({
            filter:filter,
            pageSize:null,
            offset:null
        })
    });
    const resTmp = await res.json();
    console.log(resTmp);
    if(resTmp.data)
        return resTmp.data;
    else
        return false;
}

function findForm(targetIndex,currentFormType) {
    let formArr = ['newqnnA.json','newqnnB.json','newqnnC.json','newqnnD.json','newqnnE.json','newqnnF.json','newqnnG.json'];
    if(currentFormType.queryCareGiver)
        formArr = ['new-caring-questions1.json','new-caring-questions2.json','new-caring-questions3-1.json','new-caring-questions3-2.json','new-caring-questions4.json','new-caring-questions5.json'];
    for(let i=0;i<formArr.length;i++) {
        const staticForm = require('../static/lib/'+formArr[i]);
        const tmpArr = staticForm.questions[0].questions;
        for(let j=0;j<tmpArr.length;j++) {
            if(tmpArr[j].questions) {
                for(let k=0;k<tmpArr[j].questions.length;k++) {
                    if((tmpArr[j].questions[k].id) === targetIndex) {
                        return tmpArr[j].questions[k];
                    }
                }
            } else if(tmpArr[j].id === targetIndex) {
                return tmpArr[j];
            }
        }
    }
    return false;
}
/**
 * 
 * @param {String} targetStr 搜索的key 
 * @param {Number} selectType 包含关键词或不包含关键词
 * @param {String} content 搜索的内容
 * @returns {false|Array<Object>} 搜索结果
 */
function translateFindBasicInfo(targetStr,selectType,content) {
    const res = [];
     const translateType = {
        "姓名":"Name",
        "身份证号":"ResidentId",
        "电话号码":"Phone",
        "位置":"Location",
    };
    if(!translateType[targetStr]) {
        return false;
    } else {
        if(selectType === 0) {
            /** 包含关键词 */
            let tmp = {};
            const keySubject = "Subject."+translateType[targetStr];
            const keyAssistant = "Assistant."+translateType[targetStr];
            tmp[keySubject] = {$in:[content]};
            res.push(tmp);
            tmp = {};
            tmp[keyAssistant] = {$in:[content]};
            res.push(tmp);
            //{Subject.Id:{$eq:content}}
        } else {
            /** 不包含关键词 */
            let tmp = {};
            const keySubject = "Subject."+translateType[targetStr];
            const keyAssistant = "Assistant."+translateType[targetStr];
            tmp[keySubject] = {$nin:[content]};
            res.push(tmp);
            tmp = {};
            tmp[keyAssistant] = {$nin:[content]};
            res.push(tmp);
        }
        return res;
    }
}

export default function seniorSearch(params,selectType,currentType) {    
    let res = [];
    const translateLimit = {
        "包含关键词":0,
        "不包含关键词":1,
    };
    res = initResBySelectType(selectType,currentType);
    console.log('init res : ',res);
    for(const item in res.seniorSearchRes) {
      for(let i=0;i<params.length;i++) {
        //console.log('params : ',params[i]);
        if((params[i].type).charCodeAt() > 58) {
            const selectBasic = translateFindBasicInfo(params[i].type,translateLimit[params[i].limit],params[i].content);
            if(selectBasic === false)
                return new Promise((resolve,reject) => {
                    resolve(false);
                });
            else {
                selectBasic.forEach(tmpBasicSelect => {
                    res.seniorSearchRes["$or"].push(tmpBasicSelect);
                })
            }
        } else {
            const tmpAns = findForm(params[i].type,currentType);
            let findChoiceFlag = false;
            if(tmpAns.type === 'fill') {
                let tmpSelect = {};
                if(translateLimit[params[i].limit] === 0) 
                    tmpSelect["AnswerSheet."+tmpAns.id+".Remark"] = {$in:[params[i].content]};
                else
                    tmpSelect["AnswerSheet."+tmpAns.id+".Remark"] = {$nin:[params[i].content]};
                res.seniorSearchRes[item].push(tmpSelect);
            } else {
                findChoiceFlag = false;
                for(let j=0;j<tmpAns.choices.length;j++) {
                    if(tmpAns.choices[j].title === params[i].content) {
                        let tmpSelect = {};
                        if(translateLimit[params[i].limit] === 0)
                            tmpSelect["AnswerSheet."+tmpAns.id+".Answer"] = {$all:[tmpAns.choices[j].id]};
                        else
                            tmpSelect["AnswerSheet."+tmpAns.id+".Answer"] = {$nin:[tmpAns.choices[j].id]};
                        res.seniorSearchRes[item].push(tmpSelect);
                        findChoiceFlag = true;
                        break;
                    }
                }
                if(findChoiceFlag === false) {
                    return new Promise((resolve,reject) => {
                        resolve(false);
                    });
                }
            }            
        }
      }
    }
    return fetchBySeniorSearch(res.seniorSearchRes);
}
