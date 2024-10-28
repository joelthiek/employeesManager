import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { api_url } from "../../utils/firebase/firebase"
import axios  from "axios"

export const employeesActions = createAsyncThunk("employees/getEmployees", async()=>{
    try {
        const response = await axios.get(`${api_url}employees.json`)
        const data = response.data
        
        const employees = Object.entries(data).map(([index,value])=>({
            id:index,
            ...value
        }))

        return employees
    } catch (error) {
        console.log(error)
        throw new Error(error.response ? error.response.message : "Failed to fetch employees")
    }
})


const userSliceReducer = createSlice({
    name:"employees",
    initialState:{
        employees:[],
        loading:false,
        error :null
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(employeesActions.pending, (state)=> {
            state.loading = true,
            state.error = null,
            state.employees = []
        })

        .addCase(employeesActions.fulfilled, (state,action)=>{
            state.employees = action.payload,
            state.loading = false,
            state.error = null
        })

        .addCase(employeesActions.rejected, (state,action)=>{
            state.error = action.error.message,
            state.loading = false
        })
    }
})

export default userSliceReducer.reducer