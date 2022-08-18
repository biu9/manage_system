import { createSlice } from '@reduxjs/toolkit'

const FormOverviewSlice = createSlice({
  name: 'user',
  initialState:{
      "currentFormType":"",
      "isCompleted":false,
      "overviewForm":[]
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
    }
  },
})

export const { setFormType,setCompleted,setOverViewForm } = FormOverviewSlice.actions

export default FormOverviewSlice.reducer
