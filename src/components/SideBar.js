import CommonBtn from "./CommonBtn"

export default function SideBar() {
    return (
        <div className=" p-6 z-10 h-full">
            <div className="text-xl font-semibold py-3">选择对象</div>
            <div className="flex w-full">
                <div className="w-24 mr-6">
                    <CommonBtn text="老人" selected={true}/>
                </div>
                <div className="w-24">
                    <CommonBtn text="护理员" selected={false}/>
                </div>
            </div>
            <div className="text-xl font-semibold py-3">
                完成情况
            </div>
            <div className="flex flex-col space-y-3">
                <div>
                    <CommonBtn text="已完成" selected={true}/>
                </div>
                <div>
                    <CommonBtn text="草稿箱" selected={false}/>
                </div>
            </div>
        </div>
    )
}