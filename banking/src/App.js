import { Route, BrowserRouter, Routes} from 'react-router-dom';
import Login from './Components/Login';
import AddLoan from './Components/AddLoan';
import DeleteLoan from './Components/DelLoan';
import ReportLoan from './Components/ReportLoan';
import HomeSavings from './Components/HomeSavings';
import HomeLoan from './Components/HomeLoan';
import ReportSavings from './Components/ReportSavings';
import DeleteSavings from './Components/DelSavings';
import AddSavings from './Components/AddSavings';
import PAN from './Components/PAN';
import HomeCustomer from './Components/HomeCustomer';
import CustomerTransfer from './Components/CustomerTransfer';
import LoanPay from './Components/LoanPay';
import ReportCustomer from './Components/ReportCustomer';
import DepositOrWD from './Components/DepositOrWD';
import HomeManager from './Components/HomeManager';
import AddorDelEmp from './Components/AddorDelEmp';
import DeleteEmployee from './Components/DeleteEmployee';
import Logout from './Components/Logout';
import Register from './Components/Register';
import SavingTrans from './Components/SavingTrans';
import LoanTrans from './Components/LoanTrans';
import EmpSavingMaster from './Components/EmpSavingsMaster';
import EmpLoanMaster from './Components/EmpLoanMaster';
import CustomerMaster from './Components/CustomerMaster';
import ManagerMaster from './Components/ManagerMaster';
import EmpSavReports from './Components/EmpSavReports'
import ForgotPassword from './Components/ForgotPassword';
import EmpSavTrans from './Components/EmpSavTrans';
import EmpLoanReports from './Components/EmpLoanReports';
import ManagerReportsCust from './Components/ManagerReportsCust';
import ManagerReportsLoan from './Components/ManagerReportsLoan';
import ManagerReportsSav from './Components/ManagerReportsSav';
const App = () => {
  
  
  function Managerelement({ children }) {
    if (sessionStorage.getItem('layout') === 'Manager') {
      return <>{children}</>;
    } else {
      return <Login></Login> ;
    }
  }
  function Customerelement({ children }) {
    if (sessionStorage.getItem('layout') === 'Customer') {
      return <>{children}</>;
    } else {
      return <Login></Login> ;
    }
  }
  function Savingelement({ children }) {
    if (sessionStorage.getItem('layout') === 'EmployeeSavings') {
      return <>{children}</>;
    } else {
      return <Login></Login> ;
    }
  }
  function Loanelement({ children }) {
    if (sessionStorage.getItem('layout') === 'EmployeeLoan') {
      return <>{children}</>;
    } else {
      return <Login></Login> ;
    }
  }







  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />       
          <Route path="/ForgotPassword" element={<ForgotPassword />} />       
                    
          <Route path="/" element={<Loanelement><EmpLoanMaster /></Loanelement>}>
            <Route path='HomeLoan' index element={<HomeLoan />} />
            <Route path="HomeLoan/AddLoan" element={<AddLoan />} />
            <Route path="HomeLoan/DeleteLoan" element={<DeleteLoan />} />
            <Route path="HomeLoan/EmpLoanReports" element={<EmpLoanReports />} />
            <Route path="HomeLoan/ReportLoan" element={<ReportLoan />} />
            <Route path="/HomeLoan/EmpLoanReports" element={<EmpLoanReports />} />
            <Route path="/HomeLoan/LoanPay" element={<LoanPay />} />
            <Route path="/HomeLoan/LoanTrans" element={<LoanTrans />} />



          </Route>

          <Route path="/" element={<Savingelement><EmpSavingMaster /></Savingelement>}>
            <Route path='HomeSavings' index element={<HomeSavings />} />
            <Route path="HomeSavings/AddSavings" element={<AddSavings/>} />
            <Route path="/HomeSavings/DeleteSavings" element={<DeleteSavings />} />
            <Route path="/HomeSavings/ReportSavings" element={<ReportSavings />} />
            <Route path="/HomeSavings/EmpSavReports" element={<EmpSavReports />} />
            <Route path="/HomeSavings/HomeSavings" element={<HomeSavings />} />
            <Route path="/HomeSavings/DepositOrWD" element={<DepositOrWD />} />
            <Route path="/HomeSavings/SavingTrans" element={<SavingTrans />} />
            <Route path="/HomeSavings/EmpSavTrans" element={<EmpSavTrans />} />
            <Route path ="/HomeSavings/PAN" element={<PAN/>}/>
          </Route>

          <Route path="/" element={<Customerelement><CustomerMaster /></Customerelement>}>
            <Route path='HomeCustomer'index element={<HomeCustomer />} />
            <Route path="HomeCustomer/CustomerTransfer" element={<CustomerTransfer />} />
            <Route path="HomeCustomer/LoanPay" element={<LoanPay />} />
            <Route path="HomeCustomer/ReportCustomer" element={<ReportCustomer />} />
            <Route path="HomeCustomer/ReportSavings" element={<ReportSavings />} />
            <Route path="HomeCustomer/ReportLoan" element={<ReportLoan />} />
            <Route path="HomeCustomer/HomeCustomer" element={<HomeCustomer />} />
            <Route path="HomeCustomer/SavingTrans" element={<SavingTrans />} />
            <Route path="HomeCustomer/LoanTrans" element={<LoanTrans />} />
          </Route>

          <Route path="/" element={<Managerelement><ManagerMaster /></Managerelement>}>
            <Route path='HomeManager' index element={<HomeManager />} />
            <Route path="HomeManager/AddSavings" element={<AddSavings />} />
            <Route path="HomeManager/DeleteSavings" element={<DeleteSavings />} />            
            <Route path="HomeManager/HomeSavings" element={<HomeSavings />} />
            <Route path="HomeManager/HomeLoan" element={<HomeLoan />} />
            <Route path="HomeManager/AddLoan" element={<AddLoan />} />
            <Route path="HomeManager/DeleteLoan" element={<DeleteLoan />} />
            <Route path="HomeManager/EmpSavReports" element={<EmpSavReports />} />
            <Route path="HomeManager/ReportCustomer" element={<ReportCustomer />} />
            <Route path="HomeManager/AddorDelEmp" element={<AddorDelEmp/>}/>
            <Route path="HomeManager/DeleteEmployee" element={<DeleteEmployee/>}/>
            <Route path="HomeManager/ManagerReportsCust" element={<ManagerReportsCust/>}/>
            <Route path="HomeManager/ManagerReportsSav" element={<ManagerReportsSav/>}/>
            <Route path="HomeManager/ManagerReportsLoan" element={<ManagerReportsLoan/>}/>
            <Route path="HomeManager/LoanPay" element={<LoanPay/>}/>            
            <Route path="HomeManager/LoanTrans" element={<LoanTrans/>}/>

          </Route>
            <Route path="/Logout" element={<Logout/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
