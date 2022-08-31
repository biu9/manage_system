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
                "$and":tmpArr
            }
        }
    } else {
        return {
            "seniorSearchRes":{
                "$or":tmpArr
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
    return resTmp.data;
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

export default function seniorSearch(params,selectType,currentType) {    
    let res = [];
    const translateLimit = {
        "包含关键词":0,
        "不包含关键词":1,
    }
    res = initResBySelectType(selectType,currentType);
    //console.log('init res : ',res);
    for(const item in res.seniorSearchRes) {
      for(let i=0;i<params.length;i++) {
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
    return fetchBySeniorSearch(res.seniorSearchRes);
}
