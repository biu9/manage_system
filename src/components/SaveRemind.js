import Modal from '@material-ui/core/Modal';
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import CommonBtn from './CommonBtn';
import replaceForm from '../utils/replaceForm';
import { setSaveRemindState } from '../store/RemindSlice';
import SuccessAlert from './SuccessAlert';
import FailAlert from './FailAlert';

export default function SaveRemind(props) {
    const [replaceSuccess,setReplaceSuccess] = useState(false);
    const [replaceFail,setReplaceFail] = useState(false);
    const formData = useSelector(state => state.formInfo);
    const currentMoudleIndex = useSelector(state => state.formOverview.currentMoudleIndex);
    const currentFormType = useSelector(state => state.formOverview.currentFormType);
    const [open,setOpen] = useState(true)
    const dispatch = useDispatch();
    return (
        <>
            {replaceSuccess ? <SuccessAlert text="上传成功"/> : null}
            {replaceFail ? <FailAlert text="上传失败"/> : null}
            <Modal open={open}>
                <div className='p-6 absolute left-1/2 top-1/2 bg-white outline-none w-96 -translate-x-1/2 transform -translate-y-1/2 rounded-xl border-2 border-gray-300'>
                    <div className='text-2xl font-bold pb-6'>确认修改提醒</div>
                    <div className='flex flex-col bg-gray-100 p-3 space-y-3 justify-center items-start border-2 border-gray-300 rounded-xl'>
                        <div className='flex items-center space-x-3'>
                            <div className='bg-remind w-6 h-6 bg-cover '></div>
                            <div className="">确保所有信息填写无误后点击上传</div>
                        </div>
                        <div className='flex items-center space-x-3'>
                            <div className='bg-remind w-6 h-6 bg-cover '></div>
                            <div className="">如系统有误请联系后台更改</div>
                        </div>
                    </div>
                    <div className='flex space-x-6 pt-6 w-full'>
                        <div 
                        className='w-full'
                        onClick={() => {
                            dispatch(setSaveRemindState(false));
                        }}>
                            <CommonBtn text="取消" selected={false}/>
                        </div>
                        <div onClick={() => {
                            let res = replaceForm(formData,currentMoudleIndex,currentFormType);
                            res.then(res => {
                                if(res === true) {
                                    setReplaceSuccess(true);
                                    setTimeout(() => {
                                        setReplaceSuccess(false);
                                    },1000)
                                } else {
                                    setReplaceFail(true);
                                    setTimeout(() => {
                                        setReplaceFail(false);
                                    },1000);
                                }
                            });
                            setTimeout(() => {
                                dispatch(setSaveRemindState(false));
                            },1000);
                            setOpen(false);
                        }} className="w-full">
                            <CommonBtn text="上传" selected={true}/>
                        </div>
                    </div>
                </div>
            </Modal>
      </>        
    )
}