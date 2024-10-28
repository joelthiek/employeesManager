import {configureStore} from "@reduxjs/toolkit"
import employeessReducer from "../redux/slices/employeesSlice"

const store = configureStore({
    reducer:{
      employeesReducer: employeessReducer
    }
})

export default store