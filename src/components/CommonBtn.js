const Selected = (props) => {
    return (
        <div className="w-full bg-purple-600 rounded-lg text-white font-semibold px-6 py-2 cursor-pointer text-center h-full flex items-center justify-center whitespace-nowrap shadow-std">
            {(() => {
                switch(props.type) {
                    case 'draft':
                        return <div className="bg-draft_selected w-5 h-5 mr-1 bg-cover"></div>
                    case 'finish':
                        return <div className="bg-finish_selected w-5 h-5 mr-1 bg-cover"></div>
                    default:
                        return null
                }
            })()}
            <div>{props.text}</div>
        </div>
    )
}

const UnSelected = (props) => {
    return (
        <div className="group border-2 border-gray-200 w-full bg-white-600 rounded-lg font-semibold px-6 py-2 cursor-pointer text-center h-full flex items-center justify-center whitespace-nowrap hover:bg-purple-200 hover:text-white text-purple-600 transform duration-200">
            {(() => {
                switch(props.type) {
                    case 'draft':
                        return <div className="bg-draft_unselected w-5 h-5 mr-1 bg-cover group-hover:bg-draft_selected"></div>
                    case 'finish':
                        return <div className="bg-uploadSuccess w-5 h-5 mr-1 bg-cover group-hover:bg-finish_selected"></div>
                    default:
                        return null
                }
            })()}
            <div className="">{props.text}</div>
        </div>
    )
}

export default function CommonBtn(props) {
    return (
        <div>
            {props.selected ? <Selected text={props.text} type={props.type}/> : <UnSelected text={props.text} type={props.type}/>}
        </div>
    )
}