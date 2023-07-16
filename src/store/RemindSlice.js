import { createSlice } from '@reduxjs/toolkit'

const remindSlice = createSlice({
  name: 'remindStatus',
  initialState:{
      "deleteRemind":false,
      "exportRemind":false,
      "saveRemind":false,
      "selectedFormId":[],
      "currentView":"",
      "openSeniorSearchModal":false,
      "changeInstitutionRemind":false
  },
  reducers: {
    setDeleteRemindStatus(state, action) {
        state.deleteRemind = action.payload.deleteRemindStatus;
    },
    setExportRemindStatus(state, action) {
        state.exportRemind = action.payload.exportRemind;
    },
    pushSelectedFormId(state, action) {
        state.selectedFormId.push(action.payload.selectId);
    },
    popSelectedFormId(state, action) {
        const index = state.selectedFormId.indexOf(action.payload.selectId);
        state.selectedFormId.splice(index,1);
    },
    setAllFormId(state,action) {
        //console.log('receive in set all form id : ',action.payload);
        state.selectedFormId = action.payload.selectIds;
    },
    popAllFormId(state,action) {
        state.selectedFormId = [];
    },
    setCurrentView(state,action) {
        state.currentView = action.payload;
    },
    setSaveRemindState(state,action) {
        //console.log('receive : ',action.payload);
        state.saveRemind = action.payload;
    },
    setOpenSeniorSearchModal(state,action) {
        state.openSeniorSearchModal = action.payload;
    },
    setChangeInstitutionRemindState(state,action) {
        state.changeInstitutionRemind = action.payload;
    }
  },
})

export const { 
    setDeleteRemindStatus,
    setExportRemindStatus,
    pushSelectedFormId,
    popSelectedFormId,
    setAllFormId,
    popAllFormId,
    setCurrentView,
    setSaveRemindState,
    setOpenSeniorSearchModal,
    setChangeInstitutionRemindState
} = remindSlice.actions

export default remindSlice.reducer
