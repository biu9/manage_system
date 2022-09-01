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
      "birthYearRight":false,
      "birthMonthRight":false,
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
    setBirthYearRight(state, action) {
        state.birthYearRight = action.payload;
    },
    setBirthMonthRight(state, action) {
        state.birthMonthRight = action.payload;
    }
  },
})

export const { 
    setFormType,
    setCompleted,
    setOverViewForm,
    setInitData,
    setCurrentMoudleIndex,
    setCurrentFormId,
    setBirthMonthRight,
    setBirthYearRight
} = FormOverviewSlice.actions

export default FormOverviewSlice.reducer
