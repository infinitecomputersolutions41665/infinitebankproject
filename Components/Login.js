import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const usid = useRef(null);
  const Password = useRef(null);
  const [userType, setUserType] = useState(null);
  const [selectedTab, setSelectedTab] = useState(null);
  const [message, setmessage] = useState(null);
  var jsonData = "";

  const navigate = useNavigate();
  const handleTabClick = (tabType) => {
    setUserType(tabType);
    setSelectedTab(tabType);
  };

  const handleLogin = async () => {
    
    try {
      let url = "";

      switch (userType) {
        case 'Manager':
          url = 'mngrlogin';
          jsonData = {
            "usid": parseInt(usid.current.value),
            "password": Password.current.value
          };
          setSelectedTab("Manager")
          break;

        case 'EmployeeLoan':
        case 'EmployeeSavings':
          url = 'employeelogin';
          jsonData = {
            "userid": usid.current.value,
            "password": Password.current.value
          };
          setSelectedTab("EmployeeLoan")
          break;
          
        case 'Customer':
          url = 'custlogin';
          jsonData = {
            "userid": usid.current.value,
            "password": Password.current.value
          };
          setSelectedTab("Customer")
          break;
        default:
          setmessage('Invalid user type');
          return;
      }

      const response = await fetch(`https://localhost:7273/api/${url}`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData),
      });

      if (response.ok) {
        const userdata = await response.json();
        console.log(userdata.cid);

        if (userdata !== null && userdata !== 0) {
          sessionStorage.setItem('userRole', userType);
          sessionStorage.setItem('usid', usid.current.value);

          switch (userType) {
            case 'Manager':
              navigate('/HomeManager');
              sessionStorage.setItem('layout', 'Manager');
              break;
            case 'EmployeeLoan':
              navigate('/HomeLoan');
              sessionStorage.setItem('layout', 'EmployeeLoan');
              break;
            case 'EmployeeSavings':
              navigate('/HomeSavings');
              sessionStorage.setItem('layout', 'EmployeeSavings');
              break;
            case 'Customer':
              sessionStorage.setItem("userdata", JSON.stringify(userdata))
              navigate(`/HomeCustomer?c=${userdata.cid}`);
              sessionStorage.setItem('layout', 'Customer');
              break;
            default:
              navigate('/Login');
              return;
          }
        } else {
        setmessage("Invalid credentials or user doesnot exist");

        }
      } else {
        
        setmessage('Login failed', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('Login failed. An error occurred.');
    }
  };

  const styles = {
    homeContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    formBox: {
      border: '1px absolute #ccc',
      padding: '20px',
      marginTop: '50px',
      marginBottom: '50px',
      borderRadius: '15px',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
      width: '540px',
    },
    label: {
      textShadow: '3px 2px 2px #ecf5fd',
      color: 'black',
      fontSize: 'larger',
      fontFamily: '"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", "Arial", "sans-serif"',
    },
    tabContainer: {
      display: 'flex',
      marginBottom: '10px',
      width:'425px',
    },
    tab: {
      border: '1px solid black',
      borderRadius: '10px',
      padding: '8px',
      paddingTop: '1px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: userType === selectedTab ? 'teal' : 'red',
       color: 'white',
       textAlign: 'center',
    },

  
    hiddenradio:{
      opacity:0
    },
   
    button: {
      backgroundColor: 'teal', /* Navy Blue Button */
      color: '#fff', /* White Text */
      fontFamily: '"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", "Arial", "sans-serif"',
      padding: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '6px',
      marginBottom:'6px',
      width:'100px',

    },
  };

  return (
    
      <div style={{backgroundImage: `url(login.jpg)` , backgroundPosition: 'center' , backgroundSize:'cover'}}>
      <center>
        <div style={styles.homeContainer}>
          <div style={styles.formBox}>
            <form name="frm1">
              <b>
                <h2>
                  <label style={styles.label}>Login</label>
                </h2>
              </b>
              <div style={styles.tabContainer}>
                <div
                  style={{
                    ...styles.tab,
                    backgroundColor:
                      userType === 'Manager' ? 'red' : 'teal',
                  }}
                  onClick={() => handleTabClick('Manager')}
                >
                  Manager
                </div>

                <div
                  style={{
                    ...styles.tab,
                    backgroundColor:
                      userType === 'EmployeeLoan' ? 'red' : 'teal',
                  }}
                  onClick={() => handleTabClick('EmployeeLoan')}
                >
                  Employee Loan
                </div>

                <div
                  style={{
                    ...styles.tab,
                    backgroundColor:
                      userType === 'EmployeeSavings' ? 'red' : 'teal',
                  }}
                  onClick={() => handleTabClick('EmployeeSavings')}
                >
                  Employee Savings
                </div>

                <div
                  style={{
                    ...styles.tab,
                    backgroundColor:
                      userType === 'Customer' ? 'red' : 'teal',
                  }}
                  onClick={() => handleTabClick('Customer')}
                >
                  Customer
                </div>
              </div>
              <label style={styles.label}>Username &nbsp; </label>&nbsp;&nbsp;
              <input
                type="text"
                ref={usid}
                className="FormControl"
              />
              <br />
              <label style={styles.label}>Password &nbsp; </label>&nbsp;&nbsp;
              <input
                type="password"
                ref={Password}
                className="FormControl"
              />
              <br />
              <input type="button" style={styles.button} onClick={handleLogin} value="Login"  /><br/>
              <Link to={`/Register`} >First time? Click here</Link>
              <br />
              <Link to={`/ForgotPassword`}>Forgot password?</Link>
            </form>
            <label style={styles.label}>{message}</label>
          </div>
        </div>
      </center>
    </div>
  );
};

export default Login;
