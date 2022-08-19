import Modal from '@material-ui/core/Modal';
import CommonBtn from './CommonBtn';
import SuccessAlert from './SuccessAlert';
import FailAlert from './FailAlert';
import { setDeleteRemindStatus } from '../store/RemindSlice';
import { useDispatch,useSelector } from 'react-redux';
import { useState } from 'react';

const server = 'https://cyzz.fun/HealthCareAssessment/';

async function deleteForm(deleteFormId) {
    //删除redux中deleteFormId的问卷
    const res = await fetch(server + 'form/delete', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
            id: deleteFormId,
        })
    });
    const resTmp = await res.json();
    console.log('delete res in function : ',resTmp);
    const resCode = resTmp.code;
    if(resCode === 0) {
        return true;
    }
    return false;
}

export default function DeleteRemind(props) {
    const dispatch = useDispatch();
    const deleteRemindStatus = useSelector(state => state.remindState.deleteRemind);
    const deleteFormId = useSelector(state => state.remindState.deleteFormId);
    const [inputValue, setInputValue] = useState('');
    const [successDelete, setSuccessDelete] = useState(false);
    const [deleteFail, setDeleteFail] = useState(false);
    //console.log('deleteRemindStatus : ',deleteRemindStatus);
    return (
        <>
        {successDelete ? <SuccessAlert text="删除成功" /> : null}
        {deleteFail ? <FailAlert text="删除失败" /> : null}
        <Modal open={deleteRemindStatus}>
            <div className="absolute left-1/2 bg-white transform -translate-x-1/2 w-96 top-1/2 -translate-y-1/2 outline-none p-6 space-y-5 rounded-2xl">
                <div className='text-2xl font-semibold'>
                    删除提醒
                </div>
                <div className='flex space-x-6 items-center bg-gray-100 rounded-xl border-2 border-gray-400 p-3'>
                    <div className="bg-remind w-32 h-11 bg-cover"></div>
                    <div className='text-sm text-gray-600 font-semibold'>
                        <p>
                            每一份问卷信息都十分重要，请确保删除的是测试问卷或无效问卷
                            为确保不是误触，请完成下列验证后再操作：
                        </p>
                        <p>
                            在下面文本框中输入“晓暮堂评估后台管理系统”
                        </p>
                    </div>
                </div>
                <div>
                    <input 
                    value={inputValue}
                    onChange={(e)=>{setInputValue(e.target.value)}}
                    className='bg-gray-300 w-full p-3 rounded-xl outline-none'></input>
                </div>
                <div className='flex space-x-6 pt-0 w-full'>
                        <div 
                        className='w-full'
                        onClick={() => {
                            setInputValue('');
                            dispatch(setDeleteRemindStatus({
                                deleteRemindStatus: false,
                            }));
                        }}>
                            <CommonBtn text="取消" selected={false}/>
                        </div>
                        <div onClick={() => {
                            if(inputValue === '晓暮堂评估后台管理系统') {
                                const res = deleteForm(deleteFormId);
                                res.then(res => {
                                    if(res) {
                                        setSuccessDelete(true);
                                        setTimeout(() => {
                                            setSuccessDelete(false);
                                        },1000);
                                    } else {
                                        setDeleteFail(true);
                                    }
                                }).catch(err => {
                                    console.log('err : ',err);
                                });
                            } else {
                                setDeleteFail(true);
                                setTimeout(() => {
                                    setDeleteFail(false);
                                }, 1000);
                            }
                            setInputValue('');
                            dispatch(setDeleteRemindStatus({
                                deleteRemindStatus: false,
                            }));
                        }} className="w-full">
                            <CommonBtn text="确认修改" selected={true}/>
                        </div>
                    </div>
            </div>
        </Modal>
        </>
    )
}