import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSingleFormInfo,setAnswerSheetFill } from "../store/FormContentSlice";
import { useSelector } from "react-redux";

export default function CommonInput(props) {
    let [value, setValue] = useState(props.text);
    const dispatch = useDispatch();
    const currentView = useSelector(state => state.remindState.currentView);
    const ifFillBirthYearRight = useSelector(state => state.formOverview.birthYearRight);
    const ifFillBirthMonthRight = useSelector(state => state.formOverview.birthMonthRight);
    console.log('ifFillBirthYearRight : ',ifFillBirthYearRight,'ifFillBirthMonthRight : ',ifFillBirthMonthRight);
    let ifShowRightYear = true;
    let ifShowRightMonth = true;
    if(props.id === '1' && ifFillBirthYearRight === false)
        ifShowRightYear = false;
    if(props.id === '2' && ifFillBirthMonthRight === false)
        ifShowRightMonth = false;
    dispatch(setSingleFormInfo({
        value:value,
        dataType:props.iconType,
        locationIndex:props.locationIndex || null,
    }));
    if(props.iconType === 'default') {
        dispatch(
            setAnswerSheetFill({
                id: props.id,
                remark:value,
            })
        )
    }
    return (  
        <div>
{            ifShowRightYear && ifShowRightMonth ?
            <div className="flex border-purple-200 border-2 rounded-xl p-2 items-center ">
                    {(() => {
                        switch (props.iconType) {
                            case 'phone':
                                return <div className="bg-phone w-5 h-5 bg-cover mr-1"/>
                            case 'location':
                                return <div className="bg-position w-4 h-4 bg-cover mr-1"/>
                            case 'name':
                                return <div className="bg-name w-5 h-5 bg-cover mr-1"/>
                            case 'residentId':
                                return <div className="bg-residentId w-6 h-5 bg-cover mr-1"/>
                            case 'default':
                                return null;
                            default:
                                return null
                        }
                    })()}
                    <input className="outline-none ml-1 w-full " value={value} onChange={(e) => {
                        if(currentView === '编辑') 
                            setValue(e.target.value);                    
                    }}/>
            </div> : 
            <div>
                <div className="flex border-red-600 border-2 rounded-xl p-2 items-center ">
                            {(() => {
                                switch (props.iconType) {
                                    case 'phone':
                                        return <div className="bg-phone w-5 h-5 bg-cover mr-1"/>
                                    case 'location':
                                        return <div className="bg-position w-4 h-4 bg-cover mr-1"/>
                                    case 'name':
                                        return <div className="bg-name w-5 h-5 bg-cover mr-1"/>
                                    case 'residentId':
                                        return <div className="bg-residentId w-6 h-5 bg-cover mr-1"/>
                                    case 'default':
                                        return null;
                                    default:
                                        return null
                                }
                            })()}
                            <input className="outline-none ml-1 w-full " value={value} onChange={(e) => {
                                if(currentView === '编辑') 
                                    setValue(e.target.value);                    
                            }}/>
                </div>
                <div className="text-sm pt-2 pl-1 text-red-600">
                    问卷的出生年份或月份与身份证号不符
                </div>
            </div>
}
        </div>
    )
}