import { createSlice } from '@reduxjs/toolkit'

const formContentSlice = createSlice({
  name: 'form',
  initialState:{},
  reducers: {
    setFormInfo(state, action) {
      console.log('set form info recv : ',action.payload);
      for(const i in action.payload) {
        state[i] = action.payload[i];
      }
    },
    setSingleFormInfo(state, action) {
      //console.log('set single form info recv : ',action.payload);
      if(state.assistant != null && action.payload.dataType !== 'default') {
        if(action.payload.dataType === 'location') {
          state.institution = action.payload.value;
        } else {
          state.assistant[action.payload.dataType] = action.payload.value;
        }
      } else if(state.subject != null && action.payload.dataType !== 'default') {
        if(action.payload.dataType !== 'location' || state.type !== 'home') {
          if(state.type === 'institution' && action.payload.dataType === 'location') {
            //修改机构老人的institution
            state.institution = action.payload.value;
          } else {
            state.subject[action.payload.dataType] = action.payload.value; 
          }
        } else if(action.payload.locationIndex !== '0') {
          state.subject.location[parseInt(action.payload.locationIndex)] = action.payload.value;
        } else {
          let tmpArr = action.payload.value.split(',');
          tmpArr.forEach((item,index) => {
            state.subject.location[index] = item;
          })
        }
      }
    },
    setAnswerSheet(state,action) {
      //console.log('set answer sheet recv : ',action.payload);
      state.answerSheet[parseInt(action.payload.id)].answer = action.payload.answer;
    },
    setAnswerSheetFill(state,action) {
      //console.log('set answer sheet fill recv : ',action.payload);
      state.answerSheet[parseInt(action.payload.id)].remark = action.payload.remark;
    }
  },
})

export const { setFormInfo,setSingleFormInfo,setAnswerSheet,setAnswerSheetFill } = formContentSlice.actions

export default formContentSlice.reducer
