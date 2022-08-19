import TopBar from "../components/TopBar"
import SideBar from "../components/SideBar"
import FunctionBtn from "../components/FunctionBtn";

import processTime from "../utils/processTime";
import processListData from "../utils/processListData";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setInitData,setFormType } from "../store/FormOverviewSlice";
import useGetCurrentType from "../hooks/useGetCurrentType";
import useGetSelectedForm from "../hooks/useGetSelectedForm";
import { useNavigate } from "react-router";
import { setFormInfo } from "../store/FormContentSlice";

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

const server = "https://cyzz.fun/HealthCareAssessment/";

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
    //const data = useSelector(state => state.formOverview.overviewForm);
    let currentType = useGetCurrentType();
    const data = useGetSelectedForm();
    return (
        <div className="bg-purple-50 w-full p-6 space-y-3 px-16 min-h-screen">
            <div>
                <SimpleBreadcrumbs text={currentType}/>
            </div>
            <div className="flex justify-between">
                <div>
                    <input placeholder="请输入搜索内容" className="ouline-none rounded-lg p-1 border-2 border-purple-200 px-2"/>
                </div>
                <div className="flex space-x-6">
                    <div>
                        <FunctionBtn text="导出表格" type="common"/>
                    </div>
                    <div>
                        <FunctionBtn text="批量删除" type="delete"/>
                    </div>
                </div>
            </div>
            <div>
                <div className="min-h-screen">
                    <table className="table-fixed w-full">
                        <thead className="border-b-2 border-purple-200 bg-white h-10">
                            <tr align="left" className="">                                
                                <th className="w-12  text-center">
                                    <input type={'checkbox'} className=" "/>
                                </th>
                                <th className="">创建日期</th>
                                <th className="">访问员</th>
                                <th className="">姓名</th>
                                <th className="w-48">身份证号</th>
                                <th className="">地址</th>
                                <th className="">联系方式</th>
                                <th>
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item,index) => <OneList key={index} data={item} index={index}/>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

const OneList = (data) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    if(!data.data.wxUser)
        return null;
    let tmpData = processListData(data.data);

    return (
        <tr className=" border-purple-200 border-b-2 h-9">
            <td>
                <input type={'checkbox'} className="w-12  text-center"/>
            </td>
            <td className="pr-2">{processTime(data.data.submitTime).split(' ')[0]}</td>
            <td>{data.data.wxUser.name}</td>
            <td>{tmpData.name}</td>
            <td className="">{tmpData.residentId}</td>
            <td>{data.data.type === 'home' ? '居家' : tmpData.location}</td>
            <td>{tmpData.phone}</td>
            <td>
                <div className="flex space-x-3 text-purple-600 font-semibold">
                    <div className="cursor-pointer" onClick={() => {
                        dispatch(setFormInfo(data.data));
                        data.data.subject ? dispatch(setFormType('elder')) : dispatch(setFormType('assistant'));
                        navigate('/form/' + data.data.id);
                        //console.log('navigate to /form/' + data.data.id);
                    }}>查看</div>
                    <div className="cursor-pointer">编辑</div>
                </div>
            </td>
        </tr>
    )
}

const OverviewContainer = () => {
    return (
        <div className="flex flex-col relative pt-16 pl-64">
            <TopBar />
            <div className="flex">
                <SideBar />
                <OverviewContent />
            </div>
        </div>
    )
}

async function fetchData() {
    let res = await fetch(server + 'form/list', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({
        "isCompleted": null,
        "wxUserId": null,// “self”也可以表示自己
        "assistantId": null,
        "subjectId": null,
        "institution": null,
        "submitTime": null,
        "offset": null,// 不传为从头
        "page_size": null, // 不传为全选
      })
    });
    return await res.json();
  }

export default function FormOverview() {
    const dispatch = useDispatch();
    useEffect(() => {
        (async() => {
            let res = await fetchData();
            dispatch(setInitData(res.data));
        })()
    },[dispatch])
    return (
        <OverviewContainer/>
    )
}