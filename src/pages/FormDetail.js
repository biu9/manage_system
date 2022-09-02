import SideBar from "../components/SideBar"
import TopBar from "../components/TopBar"
//import { useParams } from "react-router"
import { useState,useEffect } from "react";
import useGetCurrentType from "../hooks/useGetCurrentType";
import FunctionBtn from "../components/FunctionBtn";
import processListData from "../utils/processListData";
import { useDispatch, useSelector } from "react-redux";
import CommonInput from "../components/CommonInput";
import QA from "../components/QA";
import QAFill from "../components/QA_fill";
import processTime from "../utils/processTime";
//import replaceForm from "../utils/replaceForm";
import SuccessAlert from "../components/SuccessAlert";
import useGetSelectedForm from "../hooks/useGetSelectedForm";
import useGetBasicInfoById from "../hooks/useGetBasicInfoById";
//import saveRemind from "../components/SaveRemind";
import useJudgeResidentId from "../hooks/useJudgeResidentId";

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { setFormInfo } from "../store/FormContentSlice";
import SelectBtn from "../components/SelectBtn";
import { setCurrentFormId, setCurrentMoudleIndex,setBirthMonthRight,setBirthYearRight,setGenderRight } from "../store/FormOverviewSlice";
import { setDeleteRemindStatus,setSaveRemindState } from "../store/RemindSlice";
import SaveRemind from "../components/SaveRemind";
import { popAllFormId,pushSelectedFormId } from "../store/RemindSlice";
import DeleteRemind from "../components/DeleteRemind";

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
    const dispatch = useDispatch();
    return (
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/static/HealthCareAssessment/manage/">
            <div className="bg-home w-6 h-6 bg-cover"></div>
        </Link>
        <div 
        className="cursor-pointer"
        onClick={() => {
            window.history.back();
            dispatch(popAllFormId());
        }}>
            {currentType}
        </div>
        <Typography color="textPrimary">{props.text}</Typography>
      </Breadcrumbs>
    );
  }


const FormDetailContainer = (props) => {
    //console.log('prsop in container : ',props);
    return (
        <div className="flex flex-col relative pt-16 pl-64">
            <TopBar />
            <div className="flex">
                <SideBar />
                <FormContent id={props.id}/>
            </div>
        </div>
    )
}

const FormContent = () => {
    const dispatch = useDispatch();
    const currentView = useSelector(state => state.remindState.currentView);
    const saveRemindState = useSelector(state => state.remindState.saveRemind);
    const [saveSuccess,setSaveSuccess] = useState(false);
    return (
        <div className="bg-purple-50 min-h-screen w-full p-6 space-y-3 px-16">
            {saveRemindState ? <SaveRemind/> : null}
            {saveSuccess ? <SuccessAlert text="保存成功"/> : null}
            <DeleteRemind/>
            <div>
                <SimpleBreadcrumbs text={currentView+"视图"}/>
            </div>
            <div className="flex justify-between">
                <div className="flex items-center">
                    <input 
                    placeholder="请输入搜索内容" 
                    className="ouline-none rounded-l-lg p-1 border-2 border-purple-200 px-2 h-full outline-none"/>
                    <div className="bg-purple-200 h-full w-10 rounded-r-lg p-2 flex">
                        <div className="bg-search w-5 h-3/4 bg-cover justify-center items-center relative top-0.5 cursor-pointer"></div>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <div onClick={() => {
                        if(currentView === '编辑') {
                            setSaveSuccess(true);
                            setTimeout(() => {
                                setSaveSuccess(false);
                            },1000);
                        }
                    }}>
                        <FunctionBtn text="保存" type="export" />
                    </div>
                    <div onClick={() => {
                        if(currentView === '编辑') {
                            dispatch(setSaveRemindState(true));                    
                        }
                    }}>
                        <FunctionBtn text="上传" type="export"/>
                    </div>
                    <div onClick={() => {
                        dispatch(setDeleteRemindStatus({
                            deleteRemindStatus: true,
                        }));
                    }}>
                        <FunctionBtn text="删除" type="delete"/>
                    </div>
                </div>
            </div>
            <div className="flex justify-between">
                <div>
                    <FormDetailLeft/>
                </div>
                <div>
                    <FormDetailMid/>
                </div>
                <div>
                    <FormDetailRight/>
                </div>
            </div>
        </div>
    )
}

const UnSelectedLeftList = (props) => {
    return (
    <div className="border-2 border-purple-200 rounded-lg flex justify-between items-center text-sm p-3 cursor-pointer">
        <div className="flex flex-col items-start space-y-3">
            <div>{props.data.name}</div>
            <div>{props.data.residentId}</div>
        </div>
        <div className="flex flex-col items-end space-y-3">
            <div>{props.institution || "居家"}</div>
            <div>{processTime(props.time).split(' ')[0]}</div>
        </div>
    </div>
    )
}

const SelectedLeftList = (props) => {
    return (
    <div className="bg-purple-600 text-white  border-2 border-purple-200 rounded-lg h-20 flex justify-between items-center text-sm p-3 cursor-pointer">
        <div className="flex flex-col items-start space-y-3">
            <div>{props.data.name}</div>
            <div>{props.data.residentId}</div>
        </div>
        <div className="flex flex-col items-end space-y-3">
            <div>{props.institution || "居家"}</div>
            <div>{processTime(props.time).split(' ')[0]}</div>
        </div>
    </div>
    )
}

const LeftList = (props) => {
    return (
        <div>
            {props.selected ? <SelectedLeftList {...props}/> : <UnSelectedLeftList {...props}/>}
        </div>
    )
}

const LeftHeaderDraft = () => {
    return (
        <div className="p-3">
            <div className="text-2xl font-semibold py-1">草稿箱</div>
            <div className="text-gray-400 font-semibold text-sm">包含未完成上传的评估对象</div>
        </div>
    )
}

const LeftHeaderFinished = () => {
    return (
        <div className="p-3">
            <div className="text-2xl font-semibold py-1">已完成</div>
            <div className="text-gray-400 font-semibold text-sm">包含完成上传的评估对象</div>
        </div>
    )
}

const FormDetailLeft = () => {
    const data = useGetSelectedForm();
    const dispatch = useDispatch();
    const currentFormId = useSelector(state => state.remindState.selectedFormId[0]);
    const selectParams = useSelector(state => state.queryInfo);
    return (
        <div className="min-w-80  bg-white rounded-lg border-2 border-purple-200 p-3 flex flex-col space-y-3">
            {selectParams.queryCompleted ? <LeftHeaderFinished/> : <LeftHeaderDraft/>}
            {data.map(item => {
                const tmpData = processListData(item);
                if(item.id === currentFormId) 
                    return (
                        <div>
                            <LeftList data={tmpData} institution={item.institution} time={item.submitTime} selected={true}/>
                        </div>
                    )
                else 
                    return (
                        <div onClick={() => {
                            dispatch(setCurrentFormId(item.id));
                        }}>
                            <LeftList data={tmpData} institution={item.institution} time={item.submitTime} selected={false}/>
                        </div>
                    )
            })}
        </div>
    )
}

const FormDetailMid = () => {
    const currentFormType = useSelector(state => state.formOverview.currentFormType);
    let modules = ['基本信息','A.个人信息','B.家庭信息','C1.工作信息1','C2.工作信息2','D.健康信息','E.老年人信息'];
    if(currentFormType === 'elder')
        modules = ['基本信息','A.个人信息','B.身体功能能力评论','C.认知能力评估','D.感知觉和沟通能力评估','E.居家护理需求','F.医疗与养老服务情况调查','居家照料者信息'];
    const currentMoudleIndex = useSelector(state => state.formOverview.currentMoudleIndex);
    const dispatch = useDispatch();
    return (
        <div className="bg-white flex flex-col space-y-3 p-6 rounded-xl border-2 border-purple-200 w-80">
            <div className="text-2xl font-semibold py-3">调查模块</div>
            {modules.map((item,index) => {
                if(index === currentMoudleIndex)
                    return (
                        <div>
                            <SelectBtn selected={true} text={item}/>
                        </div>
                    )
                else 
                    return (
                        <div onClick={() => {
                            dispatch(setCurrentMoudleIndex(index));
                        }}>
                            <SelectBtn selected={false} text={item}/>
                        </div>
                    )
            })}
        </div>
    )
}

const FormDetailRight = (props) => {
    const currentFormType = useSelector(state => state.formOverview.currentFormType);
    let formArray = ['basicInfo.json','new-caring-questions1.json','new-caring-questions2.json','new-caring-questions3-1.json','new-caring-questions3-2.json','new-caring-questions4.json','new-caring-questions5.json'];
    if(currentFormType === 'elder')
        formArray = ['basicInfo.json','newqnnA.json','newqnnB.json','newqnnC.json','newqnnD.json','newqnnE.json','newqnnF.json','newqnnG.json'];
    const currentMoudleIndex = useSelector(state => state.formOverview.currentMoudleIndex);
    const selectState = [false,true,false,false,false,false];
    selectState.fill(false);
    if(currentMoudleIndex !== -1)
        selectState[currentMoudleIndex] = true;
    return (
        <div className="bg-white p-6 rounded-xl border-2 border-purple-200">
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
        <div className="w-80 whitespace-normal">
            <div className="text-2xl font-semibold py-3">{staticForm.title}</div>
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
      <div className="flex flex-col space-y-6 w-80">
        <div className="text-2xl font-semibold py-3">基本信息</div>
        <CommonInput iconType="name" text={tmpData.name}/>
        <CommonInput iconType="residentId" text={tmpData.residentId}/>
        {
          basicInfo.type === 'home' ? 
          <CommonInput iconType="location" text={tmpData.location.slice(0,3).toString()} locationIndex='0'/>
          : <CommonInput iconType="location" text={basicInfo.institution}/>
        }
        {      
        basicInfo.type === 'home' ? 
        <div className="flex w-80 space-x-6">
          <CommonInput iconType="location" text={tmpData.location[3].toString()} locationIndex='3'/>
          <CommonInput iconType="location" text={tmpData.location[4].toString()} locationIndex='4'/>
        </div> : null
        }
        <CommonInput iconType="phone" text={tmpData.phone}/>
      </div>
    )
}

export default function FormDetail() {
    //const {id} = useParams();
    const id = useSelector(state => state.formOverview.currentFormId);
    //console.log('currentFormId : ',id);
    const dispatch = useDispatch();
    dispatch(popAllFormId());
    const basicInfo =  useGetBasicInfoById(id);
    dispatch(pushSelectedFormId({
        selectId:id
    }));
    dispatch(setCurrentMoudleIndex(-1));
    useEffect(() => {
        (async() => {
            let res = await getDetailById(id);
            //console.log('======= current basic info =======',basicInfo);
            dispatch(setFormInfo(basicInfo));
            dispatch(
                setFormInfo({
                    answerSheet:res.data.answerSheet
                })
            )
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch, id]);
    dispatch(setBirthMonthRight(false));
    dispatch(setBirthYearRight(false));
    dispatch(setGenderRight(false)); 
    useJudgeResidentId();
    return (
        <div className="">
            <FormDetailContainer id={id}/>
        </div>
    )
}