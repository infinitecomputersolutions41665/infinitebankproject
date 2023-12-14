import React, { useEffect, useRef, useState } from 'react';


const ReportEmp = () => {
  const [employeeData, setEmployeeData] = useState([]);
    const empid = useRef('');
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = 'https://localhost:7273/api/manageralllemp'
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.$values);
      setEmployeeData(data.$values);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='row'>
      <h1>Employee Data</h1>
      <table border="1">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>PAN</th>
            <th>Deptid</th>
            <th>Dept Name</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((employee, index) => (
            <tr key={index}>
              <td>{employee.emp.eFirstname}</td>
              <td>{employee.emp.eLastname}</td>
              <td>{employee.emp.phone}</td>
              <td>{employee.emp.pan}</td>
              <td>{employee.emp.deptid}</td>
              <td>{employee.dname}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
      <center>
       
      </center>
    </div>
  );
};

export default ReportEmp;