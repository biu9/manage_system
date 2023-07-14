export default function processListData(data) {
    if(data.assistant.id)
        return data.assistant;
    else if(data.subject.id)
        return data.subject;
    return {
        name: "",
        residentId: "",
        phone: ""
    }
}