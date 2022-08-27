import { createSlice } from '@reduxjs/toolkit'

const formSelectSlice = createSlice({
  name: 'user',
  initialState:{
    "queryCompleted":false,
    "queryUnCompleted":false,
    "queryElder":false,
    "queryCareGiver":false,
    "queryName":null,
    "seniorSearchRes":[]
  },
  reducers: {
    setSelectInfo(state, action) {
        for(const i in action.payload) {
            state[i] = action.payload[i];
        }
    },
    setSeniorSearchRes(state, action) {
        state.seniorSearchRes = action.payload.seniorSearchRes;
    },
    clearSeniorSearchRes(state, action) {
        state.seniorSearchRes = [];
    }
  },
})

export const { setSelectInfo,setSeniorSearchRes,clearSeniorSearchRes } = formSelectSlice.actions

export default formSelectSlice.reducer
