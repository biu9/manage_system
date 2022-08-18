export default function processListData(data) {
    if(data.assistant)
        return data.assistant;
    else if(data.subject)
        return data.subject;
    return {
        name: "",
        residentId: "",
        phone: ""
    }
}