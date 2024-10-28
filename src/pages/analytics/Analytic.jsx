import React, { useEffect, useState } from "react"
import { AgCharts } from "ag-charts-react"
import { Box, Button } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { employeesActions } from "../../redux/slices/employeesSlice"
import SalaryAnalytic from "../../components/salaryAnalytic/SalaryAnalytic"
import { useNavigate } from "react-router-dom"

const Analytic = () => {
  const { employees } = useSelector((state) => state.employeesReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const countEmpByDep = employees.reduce((acc, emp) => {
    const dept = emp.department
    acc[dept] = (acc[dept] || 0) + 1
    return acc
  }, [])

  let softwareDevCount = countEmpByDep["Software Engineer"] || 0
  let managerCount = countEmpByDep["Manager"] || 0
  let humanResourceCount = countEmpByDep["Human Resource"] || 0
  let financialManagerCount = countEmpByDep["Financial Manager"]
  let cloudEngineerCount = countEmpByDep["Cloud Engineer"] || 0
  let productManagerCount = countEmpByDep["Product Manager"] || 0

  useEffect(() => {
    dispatch(employeesActions())
  }, [])

  const [options, setOptions] = useState({
    title: { text: "Count of Employees by Department" },
    subtitle: { text: "Tracking the number of employees by Department wise" },
    data: [
      {
        department: "Software Engineer",
        NoOfEmployees: softwareDevCount,
      },
      { department: "Manager", avgTemp: 6.3, NoOfEmployees: managerCount },
      {
        department: "Human Resources",
        NoOfEmployees: humanResourceCount,
      },
      {
        department: "Financial Manager",
        NoOfEmployees: financialManagerCount,
      },
      {
        department: "Cloud Engineer",
        NoOfEmployees: cloudEngineerCount,
      },
      {
        department: "Product Manager",
        NoOfEmployees: productManagerCount,
      },
    ],
    series: [
      {
        type: "bar",
        xKey: "department",
        yKey: "NoOfEmployees",
        yName: "NoOfEmployees",
      },
      {
        type: "line",
        xKey: "department",
      },
    ],
    axes: [
      {
        type: "category",
        position: "bottom",
      },
      {
        type: "number",
        position: "left",
        keys: ["NoOfEmployees"],
        label: {
          formatter: (params) => {
            return parseFloat(params.value).toLocaleString()
          },
        },
      },
      {
        type: "number",
        position: "right",
        label: {
          formatter: (params) => {
            return params.value + " °C"
          },
        },
      },
    ],
    legend: {
      position: "right",
    },
  })

  return (
    <Box mt={10}>
        <Button size="sm" onClick={()=> navigate(-1)}>Back</Button>
      <Box>
        <AgCharts options={options} style={{ height: "400px" }} />
      </Box>
      <Box mt={10}>
        <SalaryAnalytic employees={employees}/>
      </Box>
    </Box>
  )
}

export default Analytic
