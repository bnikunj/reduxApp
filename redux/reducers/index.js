import {  combineReducers } from "redux";
import dataReducer from './dataReducer';
import userDetailReducer from './userDetailReducer';

const reducers = combineReducers({
  auth: dataReducer,
  userDetail: userDetailReducer
})

export default reducers