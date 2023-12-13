import { Route, BrowserRouter, Routes } from 'react-router-dom';
import EmployeeLoanMaster from './Components/EmpLoanMaster';
import Login from './Components/Login';
import AddLoan from './Components/AddLoan';
import DeleteLoan from './Components/DelLoan';
import ReportLoan from './Components/ReportLoan';
import HomeSavings from './Components/HomeSavings';
import EmployeeSavingsMaster from './Components/EmpSavingsMaster';
import HomeLoan from './Components/HomeLoan';
import ReportSavings from './Components/ReportSavings';
import CustomerMaster from './Components/CustomerMaster';
import DeleteSavings from './Components/DelSavings';
import AddSavings from './Components/AddSavings';
import PAN from './Components/PAN';
import HomeCustomer from './Components/HomeCustomer';
import CustomerTransfer from './Components/CustomerTransfer';
import LoanPay from './Components/LoanPay';
import ReportCustomer from './Components/ReportCustomer';
import DepositOrWD from './Components/DepositOrWD';
import HomeManager from './Components/HomeManager';
import ManagerMaster from './Components/ManagerMaster';
import AddorDelEmp from './Components/AddorDelEmp';
import DeleteEmployee from './Components/DeleteEmployee';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />

          <Route path="/" element={<EmployeeLoanMaster />}>
            <Route index element={<HomeLoan />} />
            <Route path="/HomeLoan" element={<HomeLoan />} />
            <Route path="/AddLoan" element={<AddLoan />} />
            <Route path="/DeleteLoan" element={<DeleteLoan />} />
            <Route path="/ReportLoan" element={<ReportLoan />} />
          </Route>

          <Route path="/" element={<EmployeeSavingsMaster />}>
            <Route index element={<HomeSavings />} />
            <Route path="/PAN" element={<PAN />} />
            <Route path="/DeleteSavings" element={<DeleteSavings />} />
            <Route path="/ReportSavings" element={<ReportSavings />} />
            <Route path="/HomeSavings" element={<HomeSavings />} />
            <Route path="/DepositOrWD" element={<DepositOrWD />} />
          </Route>

          <Route path="/" element={<CustomerMaster />}>
            <Route index element={<HomeCustomer />} />
            <Route path="/CustomerTransfer" element={<CustomerTransfer />} />
            <Route path="/LoanPay" element={<LoanPay />} />
            <Route path="/ReportCustomer" element={<ReportCustomer />} />
            <Route path="/ReportSavings" element={<ReportSavings />} />
            <Route path="/ReportLoan" element={<ReportLoan />} />
            <Route path="/HomeCustomer" element={<HomeCustomer />} />
          </Route>

          <Route path="/" element={<ManagerMaster />}>
            <Route index element={<HomeManager />} />
            {/* <Route path="/AddSavings" element={<AddSavings />} />
            <Route path="/DeleteSavings" element={<DeleteSavings />} />
            <Route path="/ReportSavings" element={<ReportSavings />} />
            <Route path="/HomeSavings" element={<HomeSavings />} />
            <Route path="/DepositOrWD" element={<DepositOrWD />} />
            <Route path="/HomeLoan" element={<HomeLoan />} />
            <Route path="/AddLoan" element={<AddLoan />} />
            <Route path="/DeleteLoan" element={<DeleteLoan />} />
            <Route path="/ReportLoan" element={<ReportLoan />} />
            <Route path="/ReportCustomer" element={<ReportCustomer />} /> */}
            <Route path="/AddorDelEmp" element={<AddorDelEmp/>}/>
            <Route path="/DeleteEmployee" element={<DeleteEmployee/>}/>
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
