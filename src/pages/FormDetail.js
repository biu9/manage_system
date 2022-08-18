import SideBar from "../components/SideBar"
import TopBar from "../components/TopBar"
import { useParams } from "react-router"

const FormDetailContainer = (props) => {
    return (
        <div className="flex flex-col">
            <TopBar />
            <div className="flex">
                <SideBar />
                <div>{props.id}</div>
            </div>
        </div>
    )
}

export default function FormDetail(props) {
    const id = useParams().id;
    return (
        <div>
            <FormDetailContainer id={id}/>
        </div>
    )
}