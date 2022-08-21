import { useSelector } from "react-redux";

export default function useGetSelectedForm() {
    const initData = useSelector(state => state.formOverview.initData);
    const selectParams = useSelector(state => state.queryInfo);
    const resData = [];
    initData.forEach(item => {
        if(selectParams.queryName === null) {
            if(selectParams.queryCompleted && selectParams.queryElder) {
                if(item.isCompleted && item.subject) {
                    resData.push(item); 
                    return;
                }
            } else if(selectParams.queryCompleted && selectParams.queryCareGiver) {
                if(item.isCompleted && item.assistant) {
                    resData.push(item); 
                    return;
                }
            } else if(selectParams.queryUnCompleted && selectParams.queryElder) {
                if(!item.isCompleted && item.subject) {
                    resData.push(item);    
                    return;              
                }
            } else if(selectParams.queryUnCompleted && selectParams.queryCareGiver) {
                if(!item.isCompleted && item.assistant) {
                    resData.push(item);    
                    return;              
                }
            }            
        } else {
            if(item.assistant && item.assistant.name === selectParams.queryName) {
                resData.push(item);
            } else if(item.subject && item.subject.name === selectParams.queryName) {
                resData.push(item);
            }
        }
    })

    return resData
}
