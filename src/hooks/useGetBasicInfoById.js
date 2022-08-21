import { useSelector } from "react-redux";

export default function useGetBasicInfoById(id) {
    const initData = useSelector(state => state.formOverview.initData);
    //console.log('init data : ',initData);
    let res = {};
    initData.forEach(item => {
        if(item.id === id) {
            res = item;
        }
    });
    console.log('res of basic info : ',res);
    return res;
}