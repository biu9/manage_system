import { useSelector } from "react-redux"

const UnSelected = (props) => {
    return (
        <div>
            <div className="border-2 border-purple-200 w-full  py-1 rounded-lg flex items-center justify-start cursor-pointer">
                <div className="pl-3">
                    <div className="w-4 h-4  border-2 border-black rounded-full "></div>
                </div>
                <div className="pl-1.5">
                    {props.text}
                </div>
            </div>
        </div>
    )
}

const Selected = (props) => {
    const ifGenderRight = useSelector(state => state.formOverview.genderRight);
    let ifShowRIghtGender = true;
    if(props.id === '0'  && ifGenderRight === false) {
        ifShowRIghtGender = false;
    }
    return (
        <div>
{            
            ifShowRIghtGender ? 
            <div className="bg-purple-600 border-2 border-purple-200 w-full  py-1 rounded-lg flex items-center justify-start cursor-pointer">
                <div className="pl-3 ">
                    <div className="bg-selected w-4 h-4 bg-cover"></div>
                </div>
                <div className="pl-1.5 text-white">
                    {props.text}
                </div>
            </div> : 
            <div>
                <div className="bg-red-600 border-2 border-red-600 w-full  py-1 rounded-lg flex items-center justify-start cursor-pointer">
                    <div className="pl-3 ">
                        <div className="bg-selected w-4 h-4 bg-cover"></div>
                    </div>
                    <div className="pl-1.5 text-white">
                        {props.text}
                    </div>
                </div>
                <div className="text-sm text-red-600 pt-2 pl-1">
                    问卷的性别与身份证不符
                </div>
            </div>
}
        </div>
    )
}

export default function SelectBtn(props) {
    return (
        <div>
            {props.selected ? <Selected text={props.text} id={props.id}/> : <UnSelected text={props.text} />}
        </div>
    )
}