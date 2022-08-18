import { createSlice } from '@reduxjs/toolkit'

const FormOverviewSlice = createSlice({
  name: 'user',
  initialState:{
      "currentFormType":"",
      "isCompleted":false,
      "overviewForm":[],
      "initData":[],
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
    }
  },
})

export const { setFormType,setCompleted,setOverViewForm,setInitData } = FormOverviewSlice.actions

export default FormOverviewSlice.reducer
