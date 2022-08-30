const server = "https://cyzz.fun/HealthCareAssessment/";

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
   // console.log('search filter : ',filter);
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

export default function seniorSearch(params,selectType,currentType) {    
    let res = [];
    const translateLimit = {
        "包含关键词":0,
        "不包含关键词":1,
    }
    res = initResBySelectType(selectType);
    console.log('current type : ',currentType);
    for(const item in res.seniorSearchRes) {
      for(let i=0;i<params.length;i++) {
        const tmpAns = findForm(params[i].type);
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
