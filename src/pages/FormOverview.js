import TopBar from "../components/TopBar"
import SideBar from "../components/SideBar"
import FunctionBtn from "../components/FunctionBtn";

import processTime from "../utils/processTime";
import processListData from "../utils/processListData";

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

function SimpleBreadcrumbs(props) {
    return (
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
            首页
        </Link>
        <Typography color="textPrimary">{props.text}</Typography>
      </Breadcrumbs>
    );
  }

const OverviewContent = () => {
    return (
        <div className="bg-purple-50 w-full p-6 space-y-3 px-16">
            <div>
                <SimpleBreadcrumbs text="123"/>
            </div>
            <div className="flex justify-between">
                <div>
                    <input placeholder="请输入搜索内容" className="ouline-none rounded-lg p-1 border-2 border-purple-200 px-2"/>
                </div>
                <div className="flex space-x-6">
                    <div>
                        <FunctionBtn text="导出表格" selected={false}/>
                    </div>
                    <div>
                        <FunctionBtn text="批量删除" selected={false}/>
                    </div>
                </div>
            </div>
            <div>
                <div className="w-full">
                    <table className="table-fixed w-full">
                        <thead className="border-b-2 border-purple-200 bg-white h-10">
                            <tr align="left" className="">                                
                                <th className="w-12  text-center">
                                    <input type={'checkbox'} className=" "/>
                                </th>
                                <th className="">创建日期</th>
                                <th className="">访问员</th>
                                <th className="">姓名</th>
                                <th className="">身份证号</th>
                                <th className="">地址</th>
                                <th className="">联系方式</th>
                                <th>
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}


const OneList = (data) => {
    let tmpData = processListData(data.data);
    return (
        <>
            <tr className="border-b-2 border-black whitespace-nowrap">        
                <td className="pr-6">{processTime(data.data.submitTime)}</td>
                <td className="pr-6">{data.data.wxUser.name}</td>
                <td className="pr-6">{tmpData.name}</td>
                <td className="pr-6">{tmpData.residentId}</td>            
                <td className="pr-6">{tmpData.phone}</td>
                <td className="pr-0 ">{data.data.institution==="" ? '居家' : data.data.institution}</td>
                <td className="flex space-x-1 mr-6 items-center h-10 font-semibold mx-8 ">
                    <input 
                    onClick={() => {
                    }}
                    type={'checkbox'}/>
                    <div 
                    onClick={() => {
                    }}
                    className="text-blue-600 cursor-pointer">编辑</div>
                    <div 
                    onClick={() => {
                    }}
                    className="text-red-600 cursor-pointer">删除</div>
                    <div className="text-purple-600 cursor-pointer">查看</div>
                </td>
            </tr>
        </>
    )
}

const OverviewContainer = () => {
    return (
        <div className="flex flex-col">
            <TopBar />
            <div className="flex">
                <SideBar />
                <OverviewContent />
            </div>
        </div>
    )
}

export default function FormOverview() {
    return (
        <OverviewContainer/>
    )
}