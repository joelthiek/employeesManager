import React, {createContext } from 'react'
import { api_url } from '../firebase/firebase'

export const EmployeeContext = createContext({})

const EmployeeContextProvider = ({children}) => {
    const [employees,setEmployees] = React.useState([])
    const [employeesError,setEmployeesError] = React.useState("")

    const getEmployees = async() => {
      try {
        const response = await fetch(`${api_url}employees.json`)
        const data = await response.json()

        const emp = Object.entries(data).map(([index,value])=> ({
            id:index,
            ...value
        }))

        setEmployees(emp)
        
      } catch (error) {
         console.log(error)
         setEmployeesError(error.message)
      }
    }
  return (
    <EmployeeContext.Provider value={{employees,getEmployees}}>
      {children}
    </EmployeeContext.Provider>
  )
}

export default EmployeeContextProvider
