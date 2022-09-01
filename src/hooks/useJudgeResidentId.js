import { useSelector,useDispatch } from "react-redux/es/exports";
import { setBirthMonthRight,setBirthYearRight } from "../store/FormOverviewSlice";

export default function useJudgeResidentId() {
    const formData = useSelector(state => state.formInfo);
    const dispatch = useDispatch();
    let type = formData.subject ? "subject" : "assistant";
    const residentId = formData[type].residentId;
    const birthYear = residentId.substr(6,4);
    const birthMonth = residentId.substr(10,2);
    let fillBirthYear = "";
    let fillBirthMonth = "";
    if(formData.answerSheet) {
         fillBirthYear = formData.answerSheet[1].remark;
         fillBirthMonth = formData.answerSheet[2].remark;        
    }
    if(parseInt(fillBirthYear) === parseInt(birthYear)) {
        console.log('seet true year in use hook');
        dispatch(setBirthYearRight(true));
    }
    if(parseInt(fillBirthMonth) === parseInt(birthMonth)) {
        console.log('set true month in use hook');
        dispatch(setBirthMonthRight(true));
    }
}