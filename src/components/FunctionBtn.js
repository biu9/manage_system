const UnSelected = (props) => {
    return (
        <div className="border-2 border-purple-200 w-full bg-white-600 rounded-lg text-black px-6 py-2 cursor-pointer text-center h-full flex items-center justify-center whitespace-nowrap bg-white">
            {(() => {
                switch(props.type) {
                    case 'export':
                        return <div className="bg-export w-5 h-5 mr-1 bg-cover"></div>
                    case 'seniorSearch':
                        return <div className="bg-seniorSearch w-5 h-5 mr-1 bg-cover"></div>
                    default:
                        return null
                }
            })()}
            <div className="font-medium">{props.text}</div>
        </div>
    )
}

const DeleteBtn = (props) => {
    return (
        <div className="border-2 border-red-200 w-full bg-white-600 rounded-lg text-black px-6 py-2 cursor-pointer text-center h-full flex items-center justify-center whitespace-nowrap bg-white">
            <div className="bg-delete w-5 h-5 mr-1 bg-cover"></div>
            <div className="font-medium text-red-600">{props.text}</div>
        </div>
    )
}

function chooseBtn(props) {
    if(props.type === 'export') {
        return <UnSelected text={props.text} type="export"/>
    } else if(props.type === 'delete') {
        return <DeleteBtn text={props.text}/>
    } else if (props.type === 'common') {
        return <UnSelected text={props.text} type="common"/>
    } else if (props.type === 'seniorSearch') {
        return <UnSelected text={props.text} type="seniorSearch"/>
    } else {
        return null
    }
}

export default function FunctionBtn(props) {
    return (
        <div>
            {chooseBtn(props)}
        </div>
    )
}