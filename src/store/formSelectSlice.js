import { createSlice } from '@reduxjs/toolkit'

const formSelectSlice = createSlice({
  name: 'user',
  initialState:{
    "queryCompleted":false,
    "queryUnCompleted":false,
    "queryElder":false,
    "queryCareGiver":false,
  },
  reducers: {
    setUserInfo(state, action) {
        for(const i in action.payload) {
            state[i] = action.payload[i];
        }
        //state = (action.payload);
    },
  },
})

export const { setUserInfo } = formSelectSlice.actions

export default formSelectSlice.reducer
