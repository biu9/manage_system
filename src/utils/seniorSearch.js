const server = "https://cyzz.fun/HealthCareAssessment/";

const params = [
    {type: '1', limit: '包含关键词', content: '测试1'},
    {type: '2', limit: '不包含关键词', content: '测试2'},
    {type: '0', limit: '包含关键词', content: '男'},
    {type: '0', limit: '不包含关键词', content: '男'},
];
const selectType = {or: true, and: false};

function initResBySelectType(selectType) {
    if(selectType.and === true) {
        return {
            "seniorSearchRes":{
                "$and":[
                ]
            }
        }
    } else {
        return {
            "seniorSearchRes":{
                "$or":[
                ]
            }
        }
    }
}

async function fetchBySeniorSearch(filter) {
    //console.log('search filter : ',filter);
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
    //console.log(resTmp);
    return resTmp.data;
}

function findForm(targetIndex) {
    const formArr = ['newqnnA.json','newqnnB.json','newqnnC.json','newqnnD.json','newqnnE.json','newqnnF.json','newqnnG.json'];
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
            }
        }
    }
    return false;
}

export default function seniorSearch(params,selectType) {    
    let res = [];
    const translateLimit = {
        "包含关键词":0,
        "不包含关键词":1,
    }
    res = initResBySelectType(selectType);
    for(const item in res.seniorSearchRes) {
      for(let i=0;i<params.length;i++) {
        const tmpAns = findForm(params[i].type);
        let findChoiceFlag = false;
        if(tmpAns.type === 'fill') {
            let tmpSelect = {};
            if(translateLimit[params[i].limit] === 0) 
                tmpSelect["AnswerSheet."+tmpAns.id+".Remark"] = {$in:params[i].content};
            else
                tmpSelect["AnswerSheet."+tmpAns.id+".Remark"] = {$nin:params[i].content};
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
                return false;
            }
        }
      }
    }
    return fetchBySeniorSearch(res.seniorSearchRes);
}

// TODO
// ~~1. 不包含的mogo的json查询写法怎么写~~
// ~~2. 子字段为数组的json查询怎么写~~
// 3. $and / $or 的判断
// 4. fetch测试
// 5. modal的关闭 
// 6. 接上查询失败的alert
// 7. 非空判断
//console.log(seniorSearch(params,selectType) ? seniorSearch(params,selectType).seniorSearchRes["$or"] : 'false');