import { createSlice } from '@reduxjs/toolkit'

const FormOverviewSlice = createSlice({
  name: 'user',
  initialState:{
      "currentFormType":"",
      "isCompleted":false,
      "overviewForm":[],
      "initData":[],
      "currentMoudleIndex":0,
      "currentFormId":"",
  },
  reducers: {
    setFormType(state, action) {
        state.currentFormType = action.payload;
    },
    setCompleted(state, action) {
        state.isCompleted = action.payload;
    },
    setOverViewForm(state, action) {
        state.overviewForm = action.payload;
    },
    setInitData(state, action) {
        state.initData = action.payload;
    },
    setCurrentMoudleIndex(state, action) {
        state.currentMoudleIndex = action.payload;
    },
    setCurrentFormId(state, action) {
        state.currentFormId = action.payload;
    },
  },
})

export const { setFormType,setCompleted,setOverViewForm,setInitData,setCurrentMoudleIndex,setCurrentFormId } = FormOverviewSlice.actions

export default FormOverviewSlice.reducer
