const Selected = (props) => {
    return (
        <div className="w-full bg-purple-600 rounded-lg text-white font-semibold px-6 py-2 cursor-pointer text-center h-full flex items-center justify-center whitespace-nowrap shadow-std">
            <div>{props.text}</div>
        </div>
    )
}

const UnSelected = (props) => {
    return (
        <div className="border-2 border-gray-200 w-full bg-white-600 rounded-lg text-black px-6 py-2 cursor-pointer text-center h-full flex items-center justify-center whitespace-nowrap bg-white">
            <div className="font-medium">{props.text}</div>
        </div>
    )
}

export default function FunctionBtn(props) {
    return (
        <div>
            {props.selected ? <Selected text={props.text} /> : <UnSelected text={props.text} />}
        </div>
    )
}