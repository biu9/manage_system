import { useSelector,useDispatch } from "react-redux/es/exports";
import { setBirthMonthRight,setBirthYearRight,setGenderRight } from "../store/FormOverviewSlice";

export default function useJudgeResidentId() {
    const formData = useSelector(state => state.formInfo);
    const dispatch = useDispatch();
    let type = formData.subject ? "subject" : "assistant";
    const residentId = formData[type].residentId;
    const birthYear = residentId.substr(6,4);
    const birthMonth = residentId.substr(10,2);
    const residentGender = parseInt(residentId.substr(16,1)) % 2 === 0 ? "女" : "男";
    let fillBirthYear = "";
    let fillBirthMonth = "";
    let fillGender = "";
    if(formData.answerSheet) {
         fillBirthYear = formData.answerSheet[1].remark;
         fillBirthMonth = formData.answerSheet[2].remark;  
         fillGender = formData.answerSheet[0].answer[0] === "1" ? "男" : "女";      
    }
    if(parseInt(fillBirthYear) === parseInt(birthYear)) {
        dispatch(setBirthYearRight(true));
    }
    if(parseInt(fillBirthMonth) === parseInt(birthMonth)) {
        dispatch(setBirthMonthRight(true));
    }
    if(fillGender === residentGender) {
        dispatch(setGenderRight(true));
    }
}