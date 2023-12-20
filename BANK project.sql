USE [bank]
GO

/****** Object:  Table [dbo].[banklogin]    Script Date: 12/13/2023 11:43:35 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[banklogin](
	[usid] [int] IDENTITY(900,10) NOT NULL,
	[Password] [varchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[usid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

======================================
USE [bank]

GO

/****** Object:  Table [dbo].[Customer]    Script Date: 12/13/2023 11:25:45 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Customer](
	[Cid] [int] IDENTITY(300,10) NOT NULL,
	[CFirstname] [varchar](20) NULL,
	[CLastname] [varchar](20) NULL,
	[Phone] [varchar](20) NULL,
	[DOB] [date] NULL,
	[PAN] [varchar](10) NULL,
	[salary] [float] NULL,
	[Userid] [varchar](20) NULL,
	[Password] [varchar](10) NULL,
	[Status] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Cid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Userid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Phone] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[PAN] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


==============================================================================
USE [bank]
GO

/****** Object:  Table [dbo].[Dept]    Script Date: 12/13/2023 11:27:34 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Dept](
	[Deptid] [int] IDENTITY(100,10) NOT NULL,
	[Dname] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[Deptid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


==================================================
USE [bank]
GO

/****** Object:  Table [dbo].[emplogin]    Script Date: 12/13/2023 11:28:40 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[emplogin](
	[id] [int] IDENTITY(10,10) NOT NULL,
	[userid] [varchar](20) NULL,
	[password] [varchar](20) NULL,
	[Eid] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[emplogin]  WITH CHECK ADD FOREIGN KEY([Eid])
REFERENCES [dbo].[Employee] ([Eid])
ON DELETE CASCADE
GO


=======================================================
USE [bank]
GO

/****** Object:  Table [dbo].[Employee]    Script Date: 12/13/2023 11:29:04 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Employee](
	[Eid] [int] IDENTITY(400,10) NOT NULL,
	[EFirstname] [varchar](20) NULL,
	[ELastname] [varchar](20) NULL,
	[Phone] [varchar](10) NULL,
	[PAN] [varchar](10) NULL,
	[Deptid] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Eid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Phone] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[PAN] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_employee_pan] UNIQUE NONCLUSTERED 
(
	[PAN] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Employee]  WITH CHECK ADD FOREIGN KEY([Deptid])
REFERENCES [dbo].[Dept] ([Deptid])
ON DELETE CASCADE
GO


======================================================================
USE [bank]
GO

/****** Object:  Table [dbo].[loan]    Script Date: 12/13/2023 11:29:26 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[loan](
	[lnaccid] [int] IDENTITY(800,10) NOT NULL,
	[Cid] [int] NULL,
	[lnamt] [float] NULL,
	[startdate] [date] NULL,
	[closedate] [date] NULL,
	[rateofintrest] [float] NULL,
	[tenure] [int] NULL,
	[lnstatus] [bit] NULL,
	[intrest] [float] NULL,
	[lnbalance] [float] NULL,
	[emi] [float] NULL,
PRIMARY KEY CLUSTERED 
(
	[lnaccid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[loan]  WITH CHECK ADD FOREIGN KEY([Cid])
REFERENCES [dbo].[Customer] ([Cid])
ON DELETE CASCADE
GO


==============================================================


USE [bank]
GO

/****** Object:  Table [dbo].[loantrans]    Script Date: 12/13/2023 11:29:42 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[loantrans](
	[lnttid] [int] IDENTITY(100,10) NOT NULL,
	[lnaccid] [int] NULL,
	[trandate] [datetime] NULL,
	[lnamt] [float] NULL,
	[lnbalance] [float] NULL,
	[loantransamnt] [float] NULL,
PRIMARY KEY CLUSTERED 
(
	[lnttid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[loantrans]  WITH CHECK ADD FOREIGN KEY([lnaccid])
REFERENCES [dbo].[loan] ([lnaccid])
ON DELETE CASCADE
GO


============================================



USE [bank]
GO

/****** Object:  Table [dbo].[Manager]    Script Date: 12/13/2023 11:30:06 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Manager](
	[Id] [int] IDENTITY(500,10) NOT NULL,
	[MFirstname] [varchar](20) NULL,
	[MLastname] [varchar](20) NULL,
	[Phone] [varchar](12) NULL,
	[PAN] [varchar](10) NULL,
	[Deptid] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Phone] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[PAN] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Manager]  WITH CHECK ADD FOREIGN KEY([Deptid])
REFERENCES [dbo].[Dept] ([Deptid])
ON DELETE CASCADE
GO


===================================================
USE [bank]
GO

/****** Object:  Table [dbo].[savings]    Script Date: 12/13/2023 11:31:38 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[savings](
	[Saccid] [int] IDENTITY(600,10) NOT NULL,
	[Cid] [int] NULL,
	[balanceamt] [float] NULL,
PRIMARY KEY CLUSTERED 
(
	[Saccid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[savings]  WITH CHECK ADD FOREIGN KEY([Cid])
REFERENCES [dbo].[Customer] ([Cid])
ON DELETE CASCADE
GO


===================================
USE [bank]
GO

/****** Object:  Table [dbo].[savingtrans]    Script Date: 12/13/2023 11:32:00 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[savingtrans](
	[stid] [int] IDENTITY(700,10) NOT NULL,
	[saccid] [int] NULL,
	[transdate] [date] NULL,
	[transamt] [int] NULL,
	[transtype] [varchar](5) NULL,
PRIMARY KEY CLUSTERED 
(
	[stid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[savingtrans]  WITH CHECK ADD FOREIGN KEY([saccid])
REFERENCES [dbo].[savings] ([Saccid])
ON DELETE CASCADE
GO


===============================================
USE [bank]
GO

/****** Object:  Table [dbo].[savingtrans]    Script Date: 12/13/2023 11:32:00 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[savingtrans](
	[stid] [int] IDENTITY(700,10) NOT NULL,
	[saccid] [int] NULL,
	[transdate] [date] NULL,
	[transamt] [int] NULL,
	[transtype] [varchar](5) NULL,
PRIMARY KEY CLUSTERED 
(
	[stid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[savingtrans]  WITH CHECK ADD FOREIGN KEY([saccid])
REFERENCES [dbo].[savings] ([Saccid])
ON DELETE CASCADE
GO

==============================================
===============================================
==================================================
==PROCEDURES




USE [bank]
GO

/****** Object:  StoredProcedure [dbo].[addloanacc]    Script Date: 12/13/2023 11:32:55 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

 CREATE procedure [dbo].[addloanacc]
( @cid int ,                      
@lnamount float,
@startdate date ,                    
@closedate date,                                      
@roi float ,                        
@tenure float,  
@lnstatus bit,
@emi float
)
as 
begin
begin try
begin transaction
declare @lnbalance float
declare @intrest float
set @intrest = dbo.roi(@lnamount,@tenure,@roi)
set @lnbalance = @intrest + @lnamount
insert into loan values (@cid,@lnamount,@startdate,@closedate,@roi,@tenure,@lnstatus,@intrest,@lnbalance,@emi)
insert into loantrans values (SCOPE_IDENTITY(),GETDATE(),@lnamount,@lnbalance,0)
commit
return 1
end try
begin catch
rollback transaction
return 0
end catch
end
GO


========================




USE [bank]
GO

/****** Object:  StoredProcedure [dbo].[addsavingacc]    Script Date: 12/13/2023 11:34:09 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[addsavingacc]
( @CFirstname varchar (20),                         -- to refer customer
@CLastname varchar(20),
@Phone varchar(20) ,                    --to login
@DOB date,                                      --to check the age
@PAN varchar(10) ,                        -- to login
@salary float,                                    --to check the criteria for loan
@Userid varchar(10) ,                                 -- to login
@Password varchar(10),                             -- to login
@Status bit)
as 
begin
begin try
begin transaction
insert into Customer values (@CFirstname,@CLastname,@Phone,@DOB,@PAN,@salary,@Userid,@Password,@Status)
insert into savings values (SCOPE_IDENTITY(),0)
commit
return 1
end try
begin catch
rollback
return 0
end catch
end
GO


=================================================
USE [bank]
GO

/****** Object:  StoredProcedure [dbo].[addsavingacc1]    Script Date: 12/13/2023 11:34:40 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

 
 create procedure [dbo].[addsavingacc1]
( @CFirstname varchar (20),                         -- to refer customer
@CLastname varchar(20),
@Phone varchar(20) ,                    --to login
@DOB date,                                      --to check the age
@PAN varchar(10) ,                        -- to login
@salary float,                                    --to check the criteria for loan
@Userid varchar(10) ,                                 -- to login
@Password varchar(10),                             -- to login
@Status bit)
as 
begin
insert into Customer(CFirstname,CLastname,Phone,DOB,PAN,salary,Userid,[Password],[Status]) values (@CFirstname,@CLastname,@Phone,@DOB,@PAN,@salary,@Userid,@Password,@Status)
end
GO


=====================================
USE [bank]
GO

/****** Object:  StoredProcedure [dbo].[delsavacc]    Script Date: 12/13/2023 11:35:01 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[delsavacc](@saccid int)
 as
 begin
 begin try
 begin transaction
 if exists( select 1 from savings where balanceamt =0 and Saccid = @saccid)  
	if exists( select 1 from loan where status = 0 and  cid = (select cid  from savings where saccid = @saccid))
 update Customer set Status = 0 where cid = (select cid  from savings where saccid = @saccid)
 commit
 return 1
 end try
 begin catch
 rollback
 return 0
 end catch
 end
GO


=============================
USE [bank]
GO

/****** Object:  StoredProcedure [dbo].[deposit]    Script Date: 12/13/2023 11:35:25 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[deposit]
 (@savaccid int,@transdate date ,@amount float)
 as
 begin
 begin try
 begin transaction
 update savings set balanceamt = balanceamt + @amount where saccid = @savaccid
 insert into savingtrans values(@savaccid,@transdate,@amount,'cr')
 commit
 return 1
 end try
 begin catch 
 rollback
 return 0
 end catch
 end
GO


======================================
USE [bank]
GO

/****** Object:  StoredProcedure [dbo].[lnamnt]    Script Date: 12/13/2023 11:36:12 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[lnamnt] (@savaccid int,  @lnamnt float output)
as
begin 
set @lnamnt = (select top 1 lnbalance from loantrans  where lnaccid =(select lnaccid from loan where cid = (select cid from savings where saccid = @savaccid))order by trandate desc )
return @lnamnt
end
GO


================================================



USE [bank]
GO

/****** Object:  StoredProcedure [dbo].[loandel]    Script Date: 12/13/2023 11:36:33 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[loandel](@loanaccid int) 
as
begin
begin try
begin transaction
if not exists (select * from loantrans where lnbalance =0 and lnaccid = @loanaccid)
begin
update loan set lnstatus = 0 from loan where lnaccid = @loanaccid
delete from loan where lnstatus = 0 and lnaccid =  @loanaccid
delete from loantrans where lnbalance =0 and lnaccid =  @loanaccid
commit
end
end try
begin catch
rollback transaction
end catch
end
GO


=================================
USE [bank]
GO

/****** Object:  StoredProcedure [dbo].[loanpay]    Script Date: 12/13/2023 11:36:51 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[loanpay](@savaccid int,@loanid int,@transamnt float,@transdate datetime)
as
begin
begin try
begin transaction
declare @lnamt float
set @lnamt = (select lnamt from loan where lnaccid = @loanid)
update loan set lnbalance = lnbalance- @transamnt where lnaccid = @loanid
declare @lnbalance float
set @lnbalance = (select  lnbalance from loan where lnaccid =@loanid )
declare @balanceamt float
set @balanceamt = (select balanceamt from savings where Saccid = @savaccid )
print @lnbalance
update savings set balanceamt = @balanceamt-@transamnt where Saccid = @savaccid
insert into savingtrans values (@savaccid , @transdate , @transamnt,'dr')
declare @lnbalance1 float
set @lnbalance1= (select lnbalance from loan where  lnaccid = @loanid)
declare @loantransamt float
set @loantransamt = @lnbalance1
insert into loantrans values (@loanid,@transdate,@lnamt, @loantransamt,@transamnt)
commit
return 1
end try
begin catch 
rollback
return 0
end catch
end
GO


============================================

USE [bank]
GO

/****** Object:  StoredProcedure [dbo].[loanstatus]    Script Date: 12/13/2023 11:37:12 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[loanstatus](@savaccid int)
as 
begin
begin try
begin transaction
update loan set lnstatus = 0 from loan join savings on  loan.Cid = savings.cid join loantrans on loantrans.lnaccid = loan.lnaccid
where Saccid = @savaccid and loan.lnbalance =0
commit
if(@@ROWCOUNT =1)
begin
return 1
end
end try
begin catch
rollback transaction
return 0
end catch
end
GO


==================================
USE [bank]
GO

/****** Object:  StoredProcedure [dbo].[login]    Script Date: 12/13/2023 11:37:33 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[login]
(@empid int ,@userid varchar(20),@password varchar(20))
as
begin
if exists(select 1 from employee where Eid = @empid )
begin
insert into emplogin values (@userid,@password,@empid)
return 1
end
else
begin 
rollback
return 0
end
end
GO


================================
USE [bank]
GO

/****** Object:  StoredProcedure [dbo].[savingstatus]    Script Date: 12/13/2023 11:37:54 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[savingstatus](@savaccid int)
as 
begin
begin try
begin transaction
update customer set status = 0 from Customer inner join  savings on Customer.Cid = savings.cid
where Saccid = @savaccid
commit
return 1

end try
begin catch
rollback transaction
return 0
end catch
end
GO


==========================
USE [bank]
GO

/****** Object:  StoredProcedure [dbo].[transfer]    Script Date: 12/13/2023 11:38:12 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[transfer](@dsavaccid int, @transdate date,@csavaccid int,@amount float)
as
begin
begin try
begin transaction
update savings set balanceamt = balanceamt - @amount where Saccid = @dsavaccid
update savings set balanceamt = balanceamt + @amount where Saccid = @csavaccid
insert into savingtrans values (@dsavaccid , @transdate , @amount,'dr')
insert into savingtrans values (@csavaccid , @transdate , @amount,'cr')
commit
return 1
end try
begin catch 
rollback transaction
return 0 
end catch
end
GO


===========================


USE [bank]
GO

/****** Object:  StoredProcedure [dbo].[withdraw]    Script Date: 12/13/2023 11:38:38 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[withdraw](@savaccid int,@transdate date ,@amount float)
 as
 begin
 begin try
 begin transaction
 update savings set balanceamt = balanceamt - @amount where saccid = @savaccid
 insert into savingtrans values(@savaccid,@transdate,@amount,'dr')
 commit
 return 1
 end try
 begin catch
 rollback
 return 0
 end catch
 end
GO


=======================================





USE [bank]
GO

/****** Object:  UserDefinedFunction [dbo].[roi]    Script Date: 12/13/2023 11:39:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE function [dbo].[roi](@lnamt float,@tenure int,@rateofintrest float)       ----created fucntion for roi 
returns float
as
begin
declare @intrest float
set @intrest = @lnamt * @tenure * @rateofintrest
return @intrest/100
end
GO


======================================





















