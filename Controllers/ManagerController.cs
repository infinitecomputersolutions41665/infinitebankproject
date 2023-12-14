using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BankApplication.Models;
using System.Runtime.InteropServices;
using Azure.Messaging;
using System.Numerics;
using System;

namespace BankApplication.Controllers
{

    [ApiController]
    public class ManagerController : ControllerBase
    {
        bankContext mngr = new bankContext();

        [HttpPost]
        [Route("api/mngrlogin")]
        public ActionResult Managerlogin(banklogin login)           // this method is used to login for the manager 
        {
            try
            {
                var mangerid = "";
                var res = mngr.banklogin.Where(u => u.usid == login.usid && u.Password == login.Password).SingleOrDefault();

                if (res != null)
                {
                    mangerid = res.usid.ToString();
                    return Ok(mangerid);
                }

                return NotFound(0);
            }
            catch (Exception ex)
            {
                
                return BadRequest(ex.Message);
            }
        }

    

    [HttpPost]
        [Route("api/addsavingacc")]
        public ActionResult Manageraddsavingacc(Customer cust)
        {
            try
            {

                cust.savings = new List<savings> { new savings() { balanceamt = 0 } };
                var re = (from t in cust.savings
                          select t).FirstOrDefault();
                double? balanacamount = re.balanceamt;

                var res = mngr.Procedures.addsavingaccAsync(cust.CFirstname, cust.CLastname, cust.Phone, cust.DOB, cust.PAN, cust.salary, cust.Userid, cust.Password, true, balanacamount);


                return Ok(res.Result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }


        [HttpPut]
        [Route("api/delsavingacc")]
        public async Task< ActionResult > Managerdelsavingacc(savings savacc)           
        {
            try
            {

                int i = await mngr.Procedures.delsavaccAsync(savacc.Saccid);

                return Ok(i);
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
             }
        }

        [HttpGet]
        [Route("api/managerallreportsavingacc")]
        public ActionResult Managerallreportsavingacc()           // this method is used to login for the manager 
        {
            try
            {
                var res = from customer in mngr.savings
                          select customer;
                return Ok(res.ToList());
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/manageraddloanacc")]
        public async Task<ActionResult> Manageraddloanacc(loan loanacc)           
        {
            try
            {

                var res = from id in mngr.savings
                          where id.Cid == loanacc.Cid
                          select id;
                if (loanacc.Cid != null && loanacc.lnamt != null && res.Count()>0)
                {
                    DateTime startdate = DateTime.Now;
                DateTime closedate = startdate.AddMonths(loanacc.tenure);
                int i = await mngr.Procedures.addloanaccAsync(loanacc.Cid, loanacc.lnamt, startdate, closedate, 10, loanacc.tenure, true, loanacc.emi);
                return Ok(i);
                }
                else
                {

                    return Ok(0);
                }
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
   
        [HttpPut]
        [Route("api/managerdelloanacc")]
        public async Task<ActionResult> Managerdelloanacc(savings savacc)           // this method is used to login for the manager 
        {
            try
            {

               
                int i = await mngr.Procedures.loanstatusAsync(savacc.Saccid);
                return Ok(i);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
           
        }


        [HttpGet]
        [Route("api/managerallcustomeracc")]
        public ActionResult managerallcustomeracc()           // this method is used to login for the manager 
        {
            try
            {
                var res = from cust in mngr.Customer
                          select cust;

                return Ok(res.ToList());
            }
            catch(Exception e) 
            {
                return BadRequest(e.Message);
            }
        }                                            //  i need to change the procedure from delsavacc to saving status now chnage



        [HttpGet]
        [Route("api/managerallloanacc")]
        public ActionResult Managerallreportloanacc()            
        {
            try
            {
                var res = from customer in mngr.loan
                          select customer;

                return Ok(res.ToList());
            }
            catch( Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        
        [HttpPost]
        [Route("api/manageraddemp")]
        public ActionResult manageraddemp(Employee emp)
        {
            try
            {

                Employee newEmployee = new Employee
                {
                    EFirstname = emp.EFirstname,
                    ELastname = emp.ELastname,
                    Phone = emp.Phone,
                    PAN = emp.PAN,
                    Deptid = emp.Deptid
                };
                mngr.Employee.Add(newEmployee);
                int i = mngr.SaveChanges();
                return Ok(i);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpDelete]
        [Route("api/managerdelemp")]
        public ActionResult managerdelemp(Employee emp)
        {
            try
            {
                int i = 0;
                Employee removeemp = (mngr.Employee.Where(c=>c.Eid==emp.Eid)).FirstOrDefault();
                //  Employee remp = mngr.Employee.Find(emp.EFirstname+emp.ELastname);
                if (removeemp != null)
                {
                    mngr.Employee.Remove(removeemp);
                    
                    i = mngr.SaveChanges();
                }


                return Ok(i);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpGet]
        [Route("api/manageralllemp")]
        public ActionResult Managerallemp()           // this method is used to login for the manager 
        {
            try
            {
                var res = from emp in mngr.Employee
                          join Dept in mngr.Dept on emp.Deptid equals Dept.Deptid
                          select new { emp, emp.Dept.Dname };
                return Ok(res.ToList());
            }
            catch(Exception e) {
                return BadRequest(e.Message);
            }
        }






















    }
}
