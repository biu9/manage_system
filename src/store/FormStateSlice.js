import { createSlice } from '@reduxjs/toolkit'

const FormStateSlice = createSlice({
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

export const { setFormType,setCompleted } = FormStateSlice.actions

export default FormStateSlice.reducer
