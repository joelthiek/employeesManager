import React, { useState } from "react"
import { AgCharts } from "ag-charts-react"
import { Box } from "@chakra-ui/react"
import { useSelector } from "react-redux"

const SalaryAnalytic = ({employees}) => {


  const countEmpByDep = employees.reduce((acc, emp) => {
    const dept = emp.department
    acc[dept] = (acc[dept] || 0) + Number(emp.salary)
    return acc
  }, [])

React.useEffect(()=> {
  console.log("refetch")
},[])
  let softwareDevCount = countEmpByDep["Software Engineer"] || 0
  let managerCount = countEmpByDep["Manager"] || 0
  let humanResourceCount = countEmpByDep["Human Resource"] || 0
  let financialManagerCount = countEmpByDep["Financial Manager"]
  let cloudEngineerCount = countEmpByDep["Cloud Engineer"] || 0
  let productManagerCount = countEmpByDep["Product Manager"] || 0

  function getData() {
    return [
      {
        quarter: "Software Engineer",
        salary: softwareDevCount,
      },
      {
        quarter: "Manager",
        salary: managerCount,
      },
      {
        quarter: "Human Resource",
        salary: humanResourceCount,
      },
      {
        quarter: "Financial Manager",
        salary: financialManagerCount,
      },
      {
        quarter: "Cloud Engineer",
        salary: cloudEngineerCount,
      },
      {
        quarter: "Product Manager",
        salary: productManagerCount,
      },
    ]
  }
  const [options, setOptions] = useState({
    title: {
      text: "Annual Salary Expenditure by Department",
    },
    data: getData(),
    series: [
      {
        type: "line",
        xKey: "quarter",
        yKey: "Salary",
      },
      {
        type: "line",
        xKey: "quarter",
        yKey: "salary",
      },
    ],
  })

  return (
    <Box>
      <AgCharts options={options} style={{ height: "400px" }} />;
    </Box>
  )
}

export default SalaryAnalytic
