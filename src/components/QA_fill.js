import CommonInput from "./CommonInput"

export default function QAFill(props) {
    return (
        <div className=" mb-6">
            <div className="pb-3 font-semibold">{props.id}.{props.title}</div>
            <div className="flex flex-col space-y-3">
                <div>
                    <CommonInput text={props.answer} iconType="default" id={props.id}/>
                </div>
            </div>
        </div>
    )
}