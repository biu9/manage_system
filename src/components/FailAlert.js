export default function FailAlert(props) {
    return (
        <div className="absolute bg-red-100 w-48 text-center flex items-center space-x-1 p-2 rounded-2xl border-2 border-red-600 left-1/2 transform -translate-x-1/2">
            <div className="bg-redRemind w-4 h-4 bg-cover"/>
            <div className="text-red-600 font-semibold text-sm">{props.text}</div>
        </div>
    )
}