import Modal from '@material-ui/core/Modal';
import CommonBtn from './CommonBtn';
import SuccessAlert from './SuccessAlert';
import { setChangeInstitutionRemindState } from '../store/RemindSlice';
import { useDispatch,useSelector } from 'react-redux';
import { useState } from 'react';
import { setFormInfo } from '../store/FormContentSlice';

export default function ChangeInstitutionRemind(props) {
    const dispatch = useDispatch();
    const formData = useSelector(state => state.formInfo);    const changeInstitutionRemind = useSelector(state => state.remindState.changeInstitutionRemind);
    const [inputValue, setInputValue] = useState('');
    const [successChange, setSuccessDelete] = useState(false);

    console.log('formData : ',formData);
    return (
        <>
        {successChange ? <SuccessAlert text="修改成功,记得上传" /> : null}
        <Modal open={changeInstitutionRemind}>
            <div className="absolute left-1/2 bg-white transform -translate-x-1/2 w-96 top-1/2 -translate-y-1/2 outline-none p-6 space-y-5 rounded-2xl">
                <div className='text-2xl font-semibold'>
                    修改机构
                </div>
                <div className='flex space-y-3 bg-gray-100 rounded-xl border-2 border-gray-400 p-3 whitespace-nowrap flex-col py-6'>
                    <div className='flex items-center space-x-3'>
                        <div className="bg-remind w-6 h-6 bg-cover"></div>
                        <div className='text-sm text-gray-600 font-semibold'>
                            现在的机构: {formData.institution}
                        </div>   
                    </div>             
                    <div className='w-full'>
                        <input 
                        placeholder='请输入修改后的机构'
                        value={inputValue}
                        onChange={(e)=>{setInputValue(e.target.value)}}
                        className='bg-white w-full p-3 rounded-xl outline-none border-2 border-purple-200'></input>
                    </div>
                </div>

                <div className='flex space-x-6 pt-0 w-full'>
                        <div 
                        className='w-full'
                        onClick={() => {
                            dispatch(setChangeInstitutionRemindState(false));
                        }}>
                            <CommonBtn text="取消" selected={false}/>
                        </div>
                        <div onClick={() => {
                            dispatch(setChangeInstitutionRemindState(false));
                            setSuccessDelete(true);
                            dispatch(setFormInfo({institution:inputValue}));
                            setTimeout(() => {
                                setSuccessDelete(false);
                            }, 2000);
                        }} className="w-full">
                            <CommonBtn text="确认修改" selected={true}/>
                        </div>
                    </div>
            </div>
        </Modal>
        </>
    )
}