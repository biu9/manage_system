import SideBar from "../components/SideBar"
import TopBar from "../components/TopBar"
import { useParams } from "react-router"
import { useState,useEffect } from "react";
import useGetCurrentType from "../hooks/useGetCurrentType";
import FunctionBtn from "../components/FunctionBtn";
import processListData from "../utils/processListData";
import { useDispatch, useSelector } from "react-redux";
import CommonInput from "../components/CommonInput";
import QA from "../components/QA";
import QAFill from "../components/QA_fill";

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { setFormInfo } from "../store/FormContentSlice";

const server = "https://cyzz.fun/HealthCareAssessment/";

async function getDetailById(id) {
    let res = await fetch(server + 'form/get', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
            "id": id
        })
    });
    //console.log('fetch by id res : ',res);
    return await res.json();
}

function SimpleBreadcrumbs(props) {
    const currentType = useGetCurrentType();
    return (
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
            首页
        </Link>
        <Link color="inherit" href="/">
            {currentType}
        </Link>
        <Typography color="textPrimary">{props.text}</Typography>
      </Breadcrumbs>
    );
  }


const FormDetailContainer = (props) => {
    //console.log('prsop in container : ',props);
    return (
        <div className="flex flex-col">
            <TopBar />
            <div className="flex">
                <SideBar />
                <FormContent id={props.id}/>
            </div>
        </div>
    )
}

const FormContent = () => {
    const formData = useSelector(state => state.formInfo);
    return (
        <div className="bg-purple-50 min-h-screen w-full p-6 space-y-3 px-16">
            <div>
                <SimpleBreadcrumbs text='1'/>
            </div>
            <div className="flex justify-between">
                <div>
                    <input placeholder="请输入搜索内容" className="ouline-none rounded-lg p-1 border-2 border-purple-200 px-2"/>
                </div>
                <div className="flex space-x-3">
                    <div>
                        <FunctionBtn text="保存" type="common"/>
                    </div>
                    <div onClick={() => {
                        console.log('要上传的form info : ',formData);
                    }}>
                        <FunctionBtn text="上传" type="common"/>
                    </div>
                    <div>
                        <FunctionBtn text="删除" type="delete"/>
                    </div>
                </div>
            </div>
            <div className="flex">
                <div>123</div>
                <div>234</div>
                <div>
                    <FormDetailRight/>
                </div>
            </div>
        </div>
    )
}

const FormDetailRight = (props) => {
    const formArray = ['basicInfo.json','newqnnA.json','newqnnB.json','newqnnC.json','newqnnD.json','newqnnE.json','newqnnF.json','newqnnG.json'];
    const [selectState, setSelectState] = useState([false,true,false,false,false,false]);
    const modules = ['基本信息','个人信息','家庭信息','工作信息','工作信息','健康信息','老年人信息'];
    return (
        <div>
            {selectState.map((item,index) => {
            if(item === true && index !== 0)
                return (
                <div key={index} className="flex justify-center">
                    <CommonFormContent moduleName={formArray[index]}/>
                </div>
                )
            else if(item === true && index === 0)
                return (
                    <div>
                        <BasicFormInfo/>
                    </div>
                )
                else 
                    return null;
            })}
        </div>
    )
}

const CommonFormContent = (props) => {
    const staticForm = require('../static/lib/'+props.moduleName);
    const answerSheet = useSelector(state => state.formInfo.answerSheet);
    return (
        <div className="w-96 whitespace-normal">
        { 
            getTotal(staticForm,answerSheet)
        }
        </div>
    )
}

function getTotal(questionModule,answerSheet) {
    let res = [];
    //console.log("questionModule in getTotal : ",questionModule);
    //console.log("answerSheet in getTotal : ",answerSheet);
    if(questionModule.questions) {
        questionModule.questions.forEach(item => {
            if(item.questions) {
                res.push(getTotal(item,answerSheet));
            } else {
                if (item.title !== '总分') {
                    let answer = '未填';
                    let choices = [];
                    //console.log('item : ',item);
                    if(item.type === 'multiple') {
                        if(answerSheet[item.id].answer[0]-1 >= 0 && answerSheet[item.id].answer[0]-1 < item.choices.length) {
                        //answer = item.choices[answerSheet[item.id].answer.toString()-1].id;
                            answer = answerSheet[item.id].answer;
                        //console.log("answer : ",answer);
                        }
                        else
                            answer = '未填';
                        choices = item.choices;
                        if(answerSheet[item.id].disabled !== true)
                            res.push(<QA title={item.title} id={item.id} answer={answer} choices={choices}/>);
                    } else if(item.type === 'fill') {
                        answer = answerSheet[item.id].remark;
                        //console.log('answer : ',answer);
                        if(answerSheet[item.id].disabled !== true)
                        res.push(<QAFill title={item.title} id={item.id} answer={answer} choices={choices}/>);
                    }              
                    //console.log('answer in answerSheet : ',answerSheet[item.id]);
                }
            }
        });
    }
    return res;
}

const BasicFormInfo = () => {
    const basicInfo = useSelector(state => state.formInfo);
    //console.log('basic info : ',basicInfo);
    let tmpData = processListData(basicInfo);
    //console.log('tmpData : ',tmpData);
    return (
      <div className="flex flex-col space-y-6 w-96">
        <CommonInput iconType="name" text={tmpData.name}/>
        <CommonInput iconType="residentId" text={tmpData.residentId}/>
        {
          basicInfo.type === 'home' ? 
          <CommonInput iconType="location" text={tmpData.location.slice(0,3).toString()} locationIndex='0'/>
          : <CommonInput iconType="location" text={basicInfo.institution}/>
        }
        {      
        basicInfo.type === 'home' ? 
        <div className="flex w-96 space-x-6">
          <CommonInput iconType="location" text={tmpData.location[3].toString()} locationIndex='3'/>
          <CommonInput iconType="location" text={tmpData.location[4].toString()} locationIndex='4'/>
        </div> : null
        }
        <CommonInput iconType="phone" text={tmpData.phone}/>
      </div>
    )
}

export default function FormDetail() {
    const id = useParams().id;
    const [detail,setDetail] = useState({});
    const dispatch = useDispatch();
    useEffect(() => {
        (async() => {
            let res = await getDetailById(id);
            setDetail(res.data);
            dispatch(
                setFormInfo({
                    answerSheet:res.data.answerSheet
                })
            )
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id]);
    //console.log('data in form detail',detail);
    return (
        <div>
            <FormDetailContainer id={id}/>
        </div>
    )
}