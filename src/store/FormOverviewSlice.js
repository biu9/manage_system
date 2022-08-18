import { createSlice } from '@reduxjs/toolkit'

const FormOverviewSlice = createSlice({
  name: 'user',
  initialState:{
      "currentFormType":"",
      "isCompleted":false,
  },
  reducers: {
    setFormType(state, action) {
        state.currentFormType = action.payload;
    },
    setCompleted(state, action) {
        state.isCompleted = action.payload;
    }
  },
})

export const { setFormType,setCompleted } = FormOverviewSlice.actions

export default FormOverviewSlice.reducer
