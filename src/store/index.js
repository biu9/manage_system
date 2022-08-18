import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from '../store/userSlice'
import FormSlice from './FormSlice'
import RemindSlice from './RemindSlice'
import FormStateSlice from './FormStateSlice'

export default configureStore({
  reducer: {
    queryInfo:userInfoReducer,
    formInfo:FormSlice,
    remindStatus:RemindSlice,
    formState:FormStateSlice,
  },
})
