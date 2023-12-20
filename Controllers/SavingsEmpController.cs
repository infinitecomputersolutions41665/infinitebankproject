using BankApplication.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace BankApplication.Controllers
{
    [ApiController]
    public class SavingsEmpController : ControllerBase
    {
        bankContext emps = new bankContext();

        [HttpPost]
        [Route("api/firsttimelogin")]
        public async Task<ActionResult> emplogin(emplogin login)
        {
            try
            {
                // Assuming loginAsync is a method that performs login logic asynchronously
                var account = (from t in emps.Employee
                          where t.Eid == login.id
                          select t).FirstOrDefault();

                var cuser = (from t in emps.Customer
                             where t.Userid == login.userid
                             select t).FirstOrDefault();
                if (account != null)
                {
                    if (account.Eid != null)
                    {
                        await emps.Procedures.loginAsync(login.id, login.userid, login.password);
                        account.Eid = login.id;
                        await emps.SaveChangesAsync();
                    }
                }
                if(cuser != null && cuser.Status == true)
                {
                    cuser.Password = login.password;
                     emps.Customer.Update(cuser);
                    int i = emps.SaveChanges();
                    return Ok(i);

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

        [HttpPost]
        [Route("api/forgotpassword")]
        public async Task<ActionResult> forgotpassword(emplogin login)
        {
            try
            {
                var res = (from t in emps.emplogin
                          where t.userid == login.userid
                          select t).FirstOrDefault();
                if (res != null)
                {
                    res.password = login.password;
                    emps.emplogin.Update(res);
                    int i = emps.SaveChanges();

                    return Ok(i);
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
        [HttpPost]
        [Route("api/employeelogin")]
        public ActionResult employeelogin(emplogin login)           // this method is used to login for the manager 
        {
            try
            {
                var empid = "";
                var res = (from log in emps.emplogin
                           where log.password == login.password && log.userid == login.userid
                           select log).FirstOrDefault();
                if (res != null)
                {

                    empid = res.id.ToString();
                    return Ok(empid);
                }

                return Ok(0);
            }
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpPost]
        [Route("api/empaddsav")]
        public async Task<ActionResult> empaddsavingacc(Customer cust )
        {
            try
            {

                cust.savings = new List<savings> { new savings() { balanceamt = 0 } };
                double? balanceAmount = cust.savings.FirstOrDefault()?.balanceamt;

                var passwordLength = 10;  // Adjust the length as needed
                var password = GenerateRandomPassword(passwordLength);
                var res = await emps.Procedures.addsavingaccAsync(cust.CFirstname, cust.CLastname, cust.Phone, cust.DOB, cust.PAN, cust.salary, cust.Userid, password, true, balanceAmount);

                var result =   res;
                return Ok(res);
            }
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }
        private string GenerateRandomPassword(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        [HttpPut]
        [Route("api/empdelsavingacc")]
        public async Task<ActionResult> empdelsavingacc(savings savacc)           // this method is used to login for the manager 
        {
            try
            {
                var res = await emps.Procedures.delsavaccAsync(savacc.Saccid);
                return Ok(res);
            }
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        [Route("api/empreportsavingacc")]
        public ActionResult empreportsavingacc(savings savacc)           // this method is used to login for the manager 
        {
            try
            {
                var res = from customer in emps.Customer
                          join saving in emps.savings on customer.Cid equals saving.Cid
                          where saving.Saccid == savacc.Saccid
                          select new { customer, saving };

                return Ok(res.ToList());
            }
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        [Route("api/empallreportsavingacc")]
        public ActionResult empallreportsavingacc()           // this method is used to login for the manager 
        {
            try
            {
                var res = from customer in emps.Customer
                          join saving in emps.savings on customer.Cid equals saving.Cid
                          select new { customer, saving };


                return Ok(res.ToList());
            }
            catch(Exception e) 
            {
                return BadRequest(e.Message);
            }
        }



        [HttpPost]
        [Route("api/empdeposit")]
        public async Task<ActionResult> empdeposit(savingtrans savtrans)
        {
            try
            {
                var sourceAccount = emps.savings.FirstOrDefault(c => c.Saccid == savtrans.saccid);
                var AccounStatus = emps.Customer.FirstOrDefault(c => c.Cid == sourceAccount.Cid);
                if (sourceAccount != null && AccounStatus.Status == true)
                {
                   
                        DateTime transdate = DateTime.Now;
                        int i = await emps.Procedures.depositAsync(savtrans.saccid, transdate, savtrans.transamt);

                        return Ok(i);
                    
                }
                else
                {
                    return Ok(10);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        [Route("api/empwithdraw")]
        public async Task< ActionResult> empwithdraw(savingtrans savtrans)
        {
            try
            {
                var sourceAccount = emps.savings.FirstOrDefault(c => c.Saccid == savtrans.saccid);
                var AccounStatus = emps.Customer.FirstOrDefault(c=>c.Cid == sourceAccount.Cid);
                if (sourceAccount != null  && AccounStatus.Status == true)
                {
                    if (sourceAccount.balanceamt > savtrans.transamt)
                    {
                        DateTime transdate = DateTime.Now;
                        int i = await emps.Procedures.withdrawAsync(savtrans.saccid, transdate, savtrans.transamt);

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
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
            
        }
    }
}
