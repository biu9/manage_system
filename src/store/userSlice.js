import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
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

export const { setUserInfo } = userSlice.actions

export default userSlice.reducer
