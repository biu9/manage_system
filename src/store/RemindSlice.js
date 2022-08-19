import { createSlice } from '@reduxjs/toolkit'

const remindSlice = createSlice({
  name: 'remindStatus',
  initialState:{
      "deleteRemind":false,
      "exportRemind":false,
      "selectedFormId":[],
  },
  reducers: {
    setDeleteRemindStatus(state, action) {
        //console.log('set delete remind status recv : ',action.payload);
        state.deleteRemind = action.payload.deleteRemindStatus;
        //state.exportFormId = action.payload.deleteFormId;
    },
    setExportRemindStatus(state, action) {
        //console.log('set export remind status recv : ',action.payload);
        state.exportRemind = action.payload.exportRemind;
    },
    pushSelectedFormId(state, action) {
        //console.log('push export form id recv : ',action.payload);
        state.selectedFormId.push(action.payload.selectId);
    },
    popSelectedFormId(state, action) {
        //console.log('pop export form id recv : ',action.payload);
        //state.selectedFormId.pop();
        const index = state.selectedFormId.indexOf(action.payload.selectId);
        state.selectedFormId.splice(index,1);
        //console.log('state.selectedFormId.slice(index,1) : ',state.selectedFormId.slice(index,1));
    }
  },
})

export const { setDeleteRemindStatus,setExportRemindStatus,pushSelectedFormId,popSelectedFormId } = remindSlice.actions

export default remindSlice.reducer
