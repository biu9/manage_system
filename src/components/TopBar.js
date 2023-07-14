import { useNavigate } from "react-router"
import { PRD_URL } from "../conf";

export default function TopBar() {
    const navigate = useNavigate();
    return (
        <div className="bg-white shadow-lg px-6  z-50 fixed w-full top-0 left-0">
            <div 
            onClick={() => {
                navigate(PRD_URL+"static/hca-admin/");
            }}
            className="bg-topBarWord w-48 h-20 bg-contain cursor-pointer"></div>
        </div>
    )
}