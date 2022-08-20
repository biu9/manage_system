const server = 'https://cyzz.fun/HealthCareAssessment/';

export default async function replaceForm(formData,currentMoudleIndex,type) {
    console.log('current module index : ',currentMoudleIndex,'current type : ',type);
    console.log('form data : ',formData);
    if(currentMoudleIndex === 0) {
        return replaceSubjectOrAssiatant(formData,type);    
    } else {
        return replaceAnswerSheet(formData);
    }
}

async function replaceAnswerSheet(formData) {
    const res = await fetch(server + 'form/replace', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(formData),
    });
    const resTmp = await res.json();
    const resCode = resTmp.code;
    console.log('replace res in replace form : ',resTmp);
    if(resCode === 0) {
        return true;
    } else {
        return false;
    }
}

async function replaceSubjectOrAssiatant(formData,type) {
    const url = type === 'elder' ? 'subject/add_or_update' : 'assistant/add_or_update';
    const basicInfo = type === 'elder' ? formData.subject : formData.assistant;    
    const res = await fetch(server + url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(basicInfo)
    });
    const resTmp = await res.json();
    const resCode = resTmp.code;
    console.log('replace res : ',resTmp);
    if(resCode === 0) {
        return true;
    } else {
        return false;
    }
}