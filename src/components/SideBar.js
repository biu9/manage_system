import CommonBtn from "./CommonBtn"
import { setSelectInfo } from "../store/formSelectSlice"
import { useSelector,useDispatch } from "react-redux"
import { popAllFormId } from "../store/RemindSlice";

export default function SideBar() {
    const dispatch = useDispatch();
    const selectInfo = useSelector(state => state.queryInfo);
    console.log('selectInfo in SideBar : ',selectInfo);
    return (
        <div className=" p-6 z-10 h-full fixed bg-white left-0 top-16">
            <div className="text-xl font-semibold py-3">选择对象</div>
            <div className="flex w-full">
                <div 
                onClick={() => {
                    dispatch(setSelectInfo({
                        queryElder: true,
                        queryCareGiver: false,
                        queryName:null
                    }));
                    dispatch(popAllFormId());
                }}
                className="w-24 mr-6">
                    <CommonBtn text="老人" selected={selectInfo.queryElder}/>
                </div>
                <div 
                onClick={() => {
                    dispatch(setSelectInfo({
                        queryElder: false,
                        queryCareGiver: true,
                        queryName:null
                    }));
                    dispatch(popAllFormId());
                }}
                className="w-24">
                    <CommonBtn text="护理员" selected={selectInfo.queryCareGiver}/>
                </div>
            </div>
            <div className="text-xl font-semibold py-3">
                完成情况
            </div>
            <div className="flex flex-col space-y-3">
                <div onClick={() => {
                    dispatch(setSelectInfo({
                        queryCompleted: true,
                        queryUnCompleted: false,
                    }));
                    dispatch(popAllFormId());
                }}>
                    <CommonBtn text="已完成" selected={selectInfo.queryCompleted} type="finish"/>
                </div>
                <div onClick={() => {
                    dispatch(setSelectInfo({
                        queryCompleted: false,
                        queryUnCompleted: true,
                    }));
                    dispatch(popAllFormId());
                }}>
                    <CommonBtn text="草稿箱" selected={selectInfo.queryUnCompleted} type="draft"/>
                </div>
            </div>
        </div>
    )
}