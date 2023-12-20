using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BankApplication.Models;
using Microsoft.EntityFrameworkCore;

namespace BankApplication.Controllers
{
    [ApiController]
    public class CustomerController : ControllerBase
    {
        bankContext customers = new bankContext();


        [HttpPost]
        [Route("api/custlogin")]
        public ActionResult custlogin(Customer login)
        {
            try
            {

                var customer = customers.Customer.SingleOrDefault(cid => cid.Userid == login.Userid && cid.Password == login.Password);

                if (customer != null)
                {
                    if (customer.Status == true)
                    {
                        // Declare the variable for savingsid
                        int? savingid = null;

                        // Retrieve savings information
                        var savingsAccount = customers.savings?.Where(c => c.Cid == customer.Cid).FirstOrDefault();

                        // Check if savingsAccount is not null and set savingsid
                        if (savingsAccount != null)
                        {
                            savingid = savingsAccount.Saccid;
                        }
                       
                        var customerdata = new
                        {
                            cid = customer.Cid,
                            fname = customer.CFirstname,
                            lname = customer.CLastname,
                            age = CalculateAge(customer.DOB),
                            phone = customer.Phone,
                            salarypay = customer.salary,
                            status = customer.Status,
                            pan = customer.PAN,
                            userid = customer.Userid,
                            savingsid = savingid,
                        };
                        return Ok(customerdata);
                    }

                    return Ok(1);
                }
                else
                {
                    return Ok(0);
                }
                }
                catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        private int CalculateAge(DateTime dob)
        {
            return DateTime.Now.Year - dob.Year;
        }

        [HttpPost]
        [Route("api/transfer/{dsavccid}")]
        public async Task<ActionResult> Transfer( savingtrans trans, int dsavccid)
        {
            try
            {
                var sourceAccount = customers.savings.FirstOrDefault(c => c.Saccid == dsavccid);                
                var accountstatus = customers.customer.FirstOrDefault(c=>c.cid == sourceAccount.Cid);
                var endAccount = customers.savings.FirstOrDefault(c => c.Saccid ==trans.saccid );
                var Endaccountstatus = customers.customer.FirstOrDefault(c=>c.cid == endAccount.Cid);

                if (sourceAccount != null && trans.saccid!=null && accountstatus == true  && Endaccountstatus == true  )
                {
                    if (sourceAccount.balanceamt > trans.transamt)
                    {
                        DateTime transDate = DateTime.Now;
                        int result = await customers.Procedures.transferAsync(dsavccid, transDate, trans.saccid, trans.transamt);

                        return Ok(result);
                    }
                    else
                    {
                        return Ok(0);
                    }
                }
                else
                {
                    return Ok(10); // Indicates insufficient funds or invalid source account
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    


    [HttpGet]
        [Route("api/custamnt/{cid}")]

        public ActionResult custamnt(int cid)           
        {
            try
            {
                var res = from trans in customers.savings
                          where trans.Cid == cid
                          select trans.balanceamt;

                return Ok(res);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("api/custreport/{cid}")]

        public ActionResult custreport(int cid)           // this method is used to login for the manager 
        {
            try
            {
                var res = from trans in customers.Customer
                          where trans.Cid == cid
                          select trans;

                return Ok(res.ToList());
            }
            catch(Exception ex) 
            { 
            return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        [Route("api/custallreport")]

        public ActionResult custallreport()           // this method is used to login for the manager 
        {
            try
            {
                var res = from trans in customers.Customer
                          select trans;

                return Ok(res.ToList());
            }
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        [Route("api/loantransactions/{loanid}")]

        public ActionResult loantransactions(int loanid)
        {
            try
            {    
               var res = customers.loantrans.Where(c=>c.lnaccid == loanid).ToList();    
                return Ok(res.ToList());
            }
            catch(Exception ex) 
            { 
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        [Route("api/savingtransactions/{saccid}")]
        public ActionResult savingtransactions(int saccid)
        {
            try
            {
                var res = from trans in customers.savingtrans
                          where trans.saccid == saccid
                          select trans;

                return Ok(res.ToList());
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        [Route("api/loanamnt/{cid}")]

        public async Task<ActionResult> loanamnt(int cid)           // this method is used to login for the manager 
        {
            try
            {
                var totalLoanBalance = await customers.loan.Where(t => t.Cid == cid).SumAsync(t => t.lnbalance);

                return Ok(totalLoanBalance);
            }
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        [Route("api/loanactiveamt/{savccid}")]

        public ActionResult loanactiveamt(int savccid)
        {
            try
            {
                var res = from customer in customers.Customer
                          join loan in customers.loan on customer.Cid equals loan.Cid
                          join saving in customers.savings on customer.Cid equals saving.Cid
                          where saving.Saccid == savccid
                          select new { loan.lnbalance };

                return Ok(res);
            }
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("api/loanreport/{savccid}")]

        public ActionResult loanreport(int savccid)
        {
            try
            {
                var res = from customer in customers.Customer
                          join loan in customers.loan on customer.Cid equals loan.Cid
                          join saving in customers.savings on customer.Cid equals saving.Cid
                          where saving.Saccid == savccid
                          select new { customer, loan, saving };

                return Ok(res.ToList());
            }
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpPost]
        [Route("api/loanpay/{loanid}")]
        public async Task<ActionResult> loanpay([FromBody]savingtrans trans, int loanid)
        {
            try
            {

                var res = customers.savings.FirstOrDefault(c => c.Saccid == trans.saccid);
                var res1 = customers.loan.FirstOrDefault(c => c.Cid == res.Cid && c.lnaccid == loanid);
                var accountstatus = customers.Customer.FirstOrDefault(c=>c.Cid == res.Cid);
                var loanstatus = customers.loan.FirstOrDefault(c => c.Cid == res.Cid && c.lnaccid == loanid);

                if (res != null && accountstatus.Status== true && loanstatus.lnstatus == true)
                {
                    if (res1.lnbalance > trans.transamt)
                    {
                        if (res.balanceamt > trans.transamt)
                        {
                            DateTime transdate = DateTime.Now;

                            // Assuming your loanpayAsync method returns a Task<int> or similar
                            int i = await customers.Procedures.loanpayAsync(trans.saccid, loanid, trans.transamt, transdate);

                            // Access the result using the Result property
                            return Ok(i);
                        }
                        else
                        {
                            return Ok(0);
                        }
                    }
                    else
                    {
                        return Ok(10);
                    }
                   
                }
                else
                {
                    return Ok(2);
                }
            }
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
    
   
}

        [HttpPost]
        [Route("api/custaddloan")]
        public async Task<ActionResult> custaddloan(int savaccid, loan loanacc)
        {
            try
            {

                DateTime startdate = DateTime.Now;
                DateTime closedate = startdate.AddMonths(loanacc.tenure);
                int i = await customers.Procedures.addloanaccAsync(savaccid, loanacc.lnamt, startdate, closedate, loanacc.rateofintrest, loanacc.tenure, true , loanacc.emi);

                return Ok(i);
            }
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost]
        [Route("api/pancheck")]
        public ActionResult pancheck(string pan)           // this method is used to login for the manager 
        {
            try
            {
                var res = from c in customers.Customer
                          join m in customers.Manager on c.PAN equals m.PAN
                          join e in customers.Employee on c.PAN equals e.PAN
                          where c.PAN == pan || m.PAN == pan || e.PAN == pan
                          select new { Customer = c.PAN, Manager = m.PAN, Employee = e.PAN };
                int i = res.Count();


                return Ok(i);
            }
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        [Route("api/EMI/{loanid}")]
        public ActionResult emi(int loanid)           // this method is used to login for the manager 
        {
            try
            {
                var res = (from t in customers.loan
                          where t.lnaccid == loanid
                          select t).FirstOrDefault();
               


                return Ok(res.emi);
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
