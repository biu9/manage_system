import SelectBtn from "./SelectBtn";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setAnswerSheet } from "../store/FormContentSlice";

export default function QA(props) {
    const dispatch = useDispatch();
    const currentView = useSelector(state => state.remindState.currentView);
    let ansFronRedux = useSelector(state => state.formInfo.answerSheet[props.id].answer);
    let tmpArr = ansFronRedux.slice(0);
    return (
        <div className=" mb-6">
            <div className="pb-3 font-semibold">{props.id}.{props.title}</div>
            <div className="flex flex-col space-y-3">
                {props.choices.map((item) => {
                    if(ansFronRedux.includes(item.id))
                        return (
                        <div className="" onClick={() => {
                            if(currentView === "编辑") {
                                tmpArr.splice(tmpArr.indexOf(item.id), 1);
                                dispatch(setAnswerSheet({
                                    id: props.id,
                                    answer:tmpArr
                                }));                                
                            }
                        }}>
                            <SelectBtn selected={true} text={item.title} id={props.id}/>
                        </div>)
                    else 
                        return (
                        <div onClick={() => {
                            if(currentView === "编辑") {
                                tmpArr.push(item.id);
                                dispatch(setAnswerSheet({
                                    id: props.id,
                                    answer:tmpArr
                                }));                                 
                            }
                        }}>
                            <SelectBtn selected={false} text={item.title} id={props.id}/>
                        </div>)
                })}
            </div>
        </div>
    )
}