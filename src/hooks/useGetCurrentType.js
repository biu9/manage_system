import { useSelector } from "react-redux";

export default function useGetCurrentType() {
    const selectInfo = useSelector(state => state.queryInfo);
    let res = "";
    if(selectInfo.queryElder === false 
        && selectInfo.queryCareGiver === false 
        && selectInfo.queryCompleted === false 
        && selectInfo.queryUnCompleted === false) 
    return "";
    if(selectInfo.queryElder) {
        res += "老人"
    } else {
        res += "护理员"
    }
    if(selectInfo.queryCompleted) {
        res += "已完成"
    } else {
        res += "未完成"
    }
    return res;
}