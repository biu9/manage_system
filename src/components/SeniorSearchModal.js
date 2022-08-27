import Modal from '@material-ui/core/Modal';
import { useSelector,useDispatch } from 'react-redux';
import { setOpenSeniorSearchModal } from '../store/RemindSlice';
import { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CommonBtn from './CommonBtn';
import seniorSearch from '../utils/seniorSearch';
import { setSeniorSearchRes } from '../store/formSelectSlice';
import FailAlert from './FailAlert';
import SuccessAlert from './SuccessAlert';

const UnSelectedOption = (props) => {
    return (
        <div className='flex items-center space-x-1 cursor-pointer'>
            <div className='border-2 w-4 h-4 rounded-full border-black'>
            </div>
            <div>{props.text}</div>
        </div>
    )
}

const SelectedOption = (props) => {
    return (
        <div className='flex items-center space-x-1 cursor-pointer'>
            <div className='bg-uploadSuccess w-5 h-5 bg-cover'></div>
            <div className='text-purple-600'>{props.text}</div>
        </div>
    )
}

const SeniorSearchModalBody = () => {
    const [currentSelectOption,setCurrentSelectOption] = useState({
        and:false,
        or:false,
    });
    const [selectionOptionDetail,setSelectionOptionDetail] = useState({
        type:"筛选类型",
        limit:"筛选条件",
        content:"",
    });
    const [selectOptions,setSelectOptions] = useState([
        {
            type:"筛选类型",
            limit:"筛选条件",
            content:"",
        }
    ]);
    const dispatch = useDispatch();
    const [anchorEl2, setAnchorEl2] = useState(null);
    const limitArr = ['包含关键词','不包含关键词'];
    const [searchFail,setSearchFail] = useState(false);
    const [searchSuccess,setSearchSuccess] = useState(false);
    return (
        <div>
            {searchFail ? <FailAlert text="搜索失败"/> : null}
            {searchSuccess ? <SuccessAlert text="搜索成功"/> : null}
            <div className='text-2xl font-bold pb-6'>
                高级筛选
            </div>
            <div className='flex justify-between'>
                <div className='flex space-x-3'>
                    <div>条件间的关系</div>
                    <div onClick={() => {
                        setCurrentSelectOption({
                            or:false,
                            and:true,
                        })
                    }}>
                        {currentSelectOption.and ? <SelectedOption text='与' /> : <UnSelectedOption text='与' />}
                    </div>
                    <div onClick={() => {
                        setCurrentSelectOption({
                            or:true,
                            and:false,
                        })
                    }}>
                        {currentSelectOption.or ? <SelectedOption text='或' /> : <UnSelectedOption text='或' />}
                    </div>
                </div>
                <div 
                onClick={() => {
                    setSelectionOptionDetail({
                        type:"筛选类型",
                        limit:"筛选条件",
                        content:"",
                    });
                    setSelectOptions([...selectOptions,selectionOptionDetail]);
                    //console.log(selectOptions);
                }}
                className='flex items-center space-x-1 cursor-pointer'>
                    <div className='bg-add w-5 h-5 bg-cover'></div>
                    <div>新增条件</div>
                </div>
            </div>
            <div className='flex flex-col space-y-3 pt-6'>
                {selectOptions.map((item,index) => {
                    //console.log('外层的index ',index);
                    return (
                        <div className='flex space-x-4 items-center'>
                            <div>
                                <input 
                                onBlur={(e) => {
                                    let tmp = selectOptions;
                                    tmp[index].type = e.target.value;
                                    setSelectOptions(tmp);
                                }}
                                className='outline-none border-2 border-purple-500 px-3 p-1 rounded-lg w-24'
                                placeholder='筛选题号'></input>
                            </div>
                            <div>
                                <div 
                                onClick={(e) => {
                                    setAnchorEl2(e.currentTarget);
                                }}
                                className='border-2 border-purple-500 rounded-lg p-1 px-3 cursor-pointer w-36 flex items-center space-x-1'>
                                    <div>{selectOptions[index].limit}</div>
                                    <div className='bg-seniorSelectIcon w-4 h-4 bg-cover '></div>
                                </div>
                                <Menu
                                anchorEl={anchorEl2}
                                open={Boolean(anchorEl2)}
                                keepMounted>
                                    {limitArr.map((item) => {
                                        return (
                                            <MenuItem onClick={() => {
                                                let tmp = selectOptions;
                                                tmp[index].limit = item;
                                                setSelectOptions(tmp);
                                                setAnchorEl2(null);
                                            }}>
                                                {item}
                                            </MenuItem>
                                        )
                                    })}
                                </Menu>
                            </div>
                            <div>
                                <input 
                                onBlur={(e) => {
                                    let tmp = selectOptions;
                                    tmp[index].content = e.target.value;
                                    setSelectOptions(tmp);
                                }}
                                placeholder='' className='border-2 border-purple-500 rounded-lg p-1 w-72 outline-none px-3'></input>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='flex justify-between space-x-6 pt-12'>
                <div 
                onClick={() => {
                    dispatch(setOpenSeniorSearchModal(false));                    
                }}
                className='w-full cursor-pointer'>
                    <CommonBtn text='取消' selected={false}/>
                </div>
                <div 
                onClick={() => {                    
                    seniorSearch(selectOptions,currentSelectOption).then(res => {
                        //console.log('search res : ',res);
                        if(res !== false) {
                            dispatch(setSeniorSearchRes({
                                seniorSearchRes:res
                            }));
                            setSearchSuccess(true);
                            setTimeout(() => {
                                setSearchSuccess(false);                            
                                dispatch(setOpenSeniorSearchModal(false));
                            },1000);
                        } else {
                            setSearchFail(true);
                            setTimeout(() => {
                                setSearchFail(false);
                                dispatch(setOpenSeniorSearchModal(false));  
                            },1000);
                        }
                    });
                }}
                className='w-full cursor-pointer'>
                    <CommonBtn text='确定' selected={true}/>
                </div>
            </div>
        </div>
    )
}

export default function SeniorSearchModal(props) {
    const openSeniorSearchModal = useSelector(state => state.remindState.openSeniorSearchModal);
    //const dispatch = useDispatch();
    return (
        <div>
            <Modal open={openSeniorSearchModal}>
                <div className='bg-white outline-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg p-6 w-min-96 space-y-6 flex flex-col'>
                    <SeniorSearchModalBody/>
                </div>
            </Modal>
        </div>
    )
}