import { createSlice } from '@reduxjs/toolkit'

const remindSlice = createSlice({
  name: 'remindStatus',
  initialState:{
      "deleteRemind":false,
      "deleteFormId":'',
      "exportRemind":false,
      "exportFormId":[],
  },
  reducers: {
    setDeleteRemindStatus(state, action) {
        //console.log('set delete remind status recv : ',action.payload);
        state.deleteRemind = action.payload.deleteRemindStatus;
        state.deleteFormId = action.payload.deleteFormId;
    },
    setExportRemindStatus(state, action) {
        console.log('set export remind status recv : ',action.payload);
        state.exportRemind = action.payload.exportRemind;
    },
    pushExportFormId(state, action) {
        console.log('push export form id recv : ',action.payload);
        state.exportFormId.push(action.payload.exportFormId);
    },
    popExportFormId(state, action) {
        console.log('pop export form id recv : ',action.payload);
        state.exportFormId.pop();
    }
  },
})

export const { setDeleteRemindStatus,setExportRemindStatus,pushExportFormId,popExportFormId } = remindSlice.actions

export default remindSlice.reducer
