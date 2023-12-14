using BankApplication.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
namespace BankApplication.Controllers
{
    [ApiController]
    public class EmpLoanController : ControllerBase
    {
        bankContext  empl = new bankContext();


        [HttpPost]
        [Route("api/loanaddloanacc")]
        public async Task< ActionResult> Manageraddloanacc(loan loanacc)
        {
            try
            {
                if (loanacc.Cid != null || loanacc.lnamt != null)
                {
                    DateTime startdate = DateTime.Now;
                    DateTime closedate = startdate.AddMonths(loanacc.tenure);

                    int i = await empl.Procedures.addloanaccAsync(loanacc.Cid, loanacc.lnamt, startdate, closedate, loanacc.rateofintrest, loanacc.tenure, true, loanacc.emi);
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


        [HttpDelete]
        [Route("api/emploandelloanacc")]
        public async Task< ActionResult> emploandelloanacc(savings savacc)           // this method is used to login for the manager 
        {
            try
            {
                int i = await empl.Procedures.loanstatusAsync(savacc.Saccid);

                return Ok(i);
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }

        }
        

        [HttpGet]
        [Route("api/empreportloanacc")]
        public ActionResult empreportloanacc(savings savacc)           // this method is used to login for the manager 
        {
            try
            {
                var res = from customer in empl.Customer
                          join loan in empl.loan on customer.Cid equals loan.Cid
                          join saving in empl.savings on customer.Cid equals saving.Cid
                          where saving.Saccid == savacc.Saccid
                          select new { customer, loan, saving };

                return Ok(res.ToList());
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("api/empallloanacc")]
        public ActionResult empallloanacc()           
        {
            try
            {
                var res = from customer in empl.Customer
                          join loan in empl.loan on customer.Cid equals loan.Cid
                          join saving in empl.savings on customer.Cid equals saving.Cid
                          select new { customer, loan, saving };

                return Ok(res.ToList());
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
