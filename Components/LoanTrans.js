// import React, { useEffect, useState } from 'react';

// const LoanTransactions = () => {
//   const [loanData, setLoanData] = useState([],[]);
//   const userData = JSON.parse(sessionStorage.getItem('userdata'));

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const url = `https://localhost:7273/api/loantransactions/${userData.savingsid}`;
//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       console.log(data);
//     console.log(data.$values[0]);
     
//    setLoanData(data);
//     // console.log(loanData)
//     } catch (error) {
//       console.error(error);
//       // Add error handling or display an error message to the user
//     }
//   };

//   return (
//     <div>
//       <div className="row">
//         <h4>Statement</h4>
//         <table border="1">
//           <thead>
//             <tr>
//               <th>Loan Account ID</th>
//               <th>Date</th>
//               <th>Amount</th>
//               <th>Remaining Balance</th>
//               <th>Loan Transamount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loanData.map((trans, index) => (
//               <tr key={index}>
//                 <td>{trans.lnaccid}</td>
//                 <td>{trans.lnamt}</td>
//                 <td>{trans.lnbalance}</td>
//                 <td>{trans.loantransamnt}</td>
//                 <td>{trans.trandate}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default LoanTransactions;

//============================================


import React, { useEffect, useState } from 'react';

const LoanTransactions = () => {
  const [loanData, setLoanData] = useState([]);
  const userData = JSON.parse(sessionStorage.getItem('userdata'));
  const qp = new URLSearchParams(window.location.search);
  const [getloanid, setloanid] = useState(qp.get("loanid"));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = `https://localhost:7273/api/loantransactions/${getloanid}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
     console.log(data);
      console.log(data.$values);

       setLoanData(data.$values);
        console.log(loanData)
    } catch (error) {
      console.error(error);
      // Add error handling or display an error message to the user
    }
  };
  const styles = {
    homeContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    formBox: {
      border: '1px solid #ccc',
      padding: '20px',
      borderRadius: '15px',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
      width: '100%',
      marginBottom: '100px',
      marginLeft: '100px',
      marginRight: '100px',
    },
    formBox1: {
      border: '1px solid #ccc',
      borderRadius: '15px',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
      width: '800px',
      padding: '10px',
     
    },
    heading: {
      textShadow: '3px 2px 2px #ecf5fd',
      color: '#333',
      fontSize: '24px',
      fontFamily: '"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", "Arial", "sans-serif"',
    },
    subheading: {
      fontSize: '18px',
      color: '#555',
    },
    label: {
      fontSize: '16px',
      color: '#666',
    },
    button: {
      backgroundColor: 'teal',
      color: '#fff',
      fontFamily: '"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", "Arial", "sans-serif"',
      padding: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '20px',
      width: '200px',
      textDecoration: 'none',
      display: 'inline-block',
      textAlign: 'center',
    },
    status: (isActive) => ({
      fontSize: '16px',
      color: isActive ? 'green' : 'red',
    }),
  };


  return (
    <div>
       <div style={styles.homeContainer}>
        <div style={styles.formBox}>
        <h4 style={styles.heading}>Statement</h4>
            {(loanData).map((trans, index) => (
              <label key={index}>
                 <div style={styles.homeContainer}>
        <div style={styles.formBox1}>
                <label style={styles.subheading}>Loan id: {trans.lnaccid}</label><br />
                <label style={styles.heading}>₹ {trans.lnamt}</label><br />
                <label style={styles.label}>Loan balance : ₹ {trans.lnbalance}</label><br />
                <label style={styles.label}>Loan Transaction Amount : ₹ {trans.loantransamnt} paid</label><br />
                <label style={styles.label}>Transaction Date : {trans.trandate}</label><br />
              
         </div>
         </div>             
         </label>
            ))}
          </div>
          </div>
    </div>
  );
};

export default LoanTransactions;

