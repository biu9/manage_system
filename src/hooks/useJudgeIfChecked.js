import { useSelector } from "react-redux";

export default function useJudgeIfChecked(formId) {
    const checkedIds = useSelector(state => state.remindState.selectedFormId);
    if(checkedIds.indexOf(formId) !== -1)
        return true;
    return false
}