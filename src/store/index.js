import { configureStore } from '@reduxjs/toolkit'
import formSelectSlice from './formSelectSlice'
import formContentSlice from './FormContentSlice'
import RemindSlice from './RemindSlice'
import  FormOverviewSlice from './FormOverviewSlice'

export default configureStore({
  reducer: {
    queryInfo:formSelectSlice,
    formInfo:formContentSlice,
    remindState:RemindSlice,
    formOverview:FormOverviewSlice,
  },
})
