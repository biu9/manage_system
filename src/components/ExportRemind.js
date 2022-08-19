import Modal from '@material-ui/core/Modal';
import CommonBtn from './CommonBtn';
import { useSelector,useDispatch } from 'react-redux';
import { setExportRemindStatus } from '../store/RemindSlice';

const server = 'https://cyzz.fun/HealthCareAssessment/';

async function exportExcel(formId,type) {
    const res = await fetch(server+'form/export', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
            ids:formId,
            type:type
        })
    });
    const resTmp = await res.text();
    let blob = new Blob([resTmp],{type:'application/csv'});
    downFile(blob,'导出.txt');
    console.log('export response : ',resTmp);
}

function downFile(blob, fileName) {
    if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, fileName);
    } else {
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(link.href);
    }
}


export default function ExportRemind() {
    const dispatch = useDispatch();
    const exportRemindStatus = useSelector(state => state.remindState.exportRemind);
    const formId = useSelector(state => state.remindState.selectedFormId);
    const queryElder = useSelector(state => state.queryInfo.queryElder);
    const exportType = queryElder === true ? 'elder' : 'assistant';
    return (
        <Modal open={exportRemindStatus}>
                <div className='p-6 absolute left-1/2 top-1/2 bg-white outline-none w-96 -translate-x-1/2 transform -translate-y-1/2 rounded-xl border-2 border-gray-300'>
                    <div className='text-2xl font-bold pb-6'>导出提醒</div>
                    <div className='flex flex-col bg-gray-100 p-3 space-y-3 justify-center items-start border-2 border-gray-300 rounded-xl'>
                        <div className='flex items-center space-x-3'>
                            <div className='bg-remind w-6 h-6 bg-cover '></div>
                            <div className="font-semibold">确定要导出已选择的问卷结果</div>
                        </div>
                    </div>
                    <div className='flex space-x-6 pt-6 w-full'>
                        <div 
                        className='w-full'
                        onClick={() => {
                            dispatch(setExportRemindStatus({
                                exportRemind:false
                            }));
                        }}>
                            <CommonBtn text="取消" selected={false}/>
                        </div>
                        <div onClick={() => {
                            dispatch(setExportRemindStatus({
                                exportRemind:false
                            }));
                            console.log('export form id : ',formId);
                            exportExcel(formId,exportType);
                        }} className="w-full">
                            <CommonBtn text="确认导出" selected={true}/>
                        </div>
                    </div>
                </div>
        </Modal>
    )
}