create database AirlineReservation
USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[flightDetails]    Script Date: 8/20/2020 12:18:55 AM ******/
USE [AirlineReservation]
GO

/****** Object:  Table [dbo].[tbl_AircraftDetails]    Script Date: 8/20/2020 9:02:57 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[tbl_AircraftDetails](
	[Airplane_no] [varchar](40) NOT NULL,
	[Capacity] [int] NOT NULL,
	[CabinType] [char](10) NOT NULL,
	[Column_no] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Airplane_no] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

USE [AirlineReservation]
GO

/****** Object:  Table [dbo].[tbl_Airports]    Script Date: 8/20/2020 9:03:11 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[tbl_Airports](
	[IATA_code] [varchar](3) NOT NULL,
	[ICAO_code] [varchar](4) NULL,
	[airport_name] [varchar](49) NOT NULL,
	[city_name] [varchar](14) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IATA_code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

USE [AirlineReservation]
GO

/****** Object:  Table [dbo].[tbl_FlightDetails]    Script Date: 8/20/2020 9:03:24 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ARITHABORT ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[tbl_FlightDetails](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Prefix] [varchar](20) NULL,
	[FlightId]  AS ([Prefix]+right(CONVERT([varchar](20),[Id]),(20))) PERSISTED NOT NULL,
	[TravelDays] [varchar](10) NOT NULL,
	[DeparturePoint] [nvarchar](50) NOT NULL,
	[ArrivalPoint] [nvarchar](50) NOT NULL,
	[CabinType] [char](10) NULL,
	[EconomyClassFair] [nvarchar](10) NULL,
	[BusinessClassFair] [nvarchar](10) NULL,
	[FirstClassFair] [nvarchar](10) NULL,
	[FlightStatus] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[FlightId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[tbl_FlightDetails] ADD  DEFAULT ('F') FOR [Prefix]
GO

USE [AirlineReservation]
GO

/****** Object:  Table [dbo].[tblAdmin]    Script Date: 8/20/2020 9:03:41 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ARITHABORT ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[tblAdmin](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[PreFix] [varchar](20) NULL,
	[AdminID]  AS ([PreFix]+right(CONVERT([varchar](20),[Id]),(20))) PERSISTED NOT NULL,
	[Title] [varchar](10) NOT NULL,
	[FirstName] [nvarchar](30) NOT NULL,
	[LastName] [nvarchar](30) NULL,
	[PhoneNo] [nvarchar](10) NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
	[Passwords] [nvarchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[AdminID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[tblAdmin] ADD  DEFAULT ('A') FOR [PreFix]
GO

USE [AirlineReservation]
GO

/****** Object:  Table [dbo].[tblBookings]    Script Date: 8/20/2020 9:03:58 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ARITHABORT ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[tblBookings](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[prefix] [varchar](20) NOT NULL,
	[UserID] [varchar](40) NOT NULL,
	[BID]  AS ([prefix]+right(CONVERT([varchar](20),[ID]),(20))) PERSISTED NOT NULL,
	[Booking_Date] [datetime] NOT NULL,
	[Booking Status] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[BID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[tblBookings] ADD  DEFAULT ('B') FOR [prefix]
GO

ALTER TABLE [dbo].[tblBookings] ADD  DEFAULT (getdate()) FOR [Booking_Date]
GO

ALTER TABLE [dbo].[tblBookings] ADD  DEFAULT ('Pending') FOR [Booking Status]
GO

ALTER TABLE [dbo].[tblBookings]  WITH CHECK ADD FOREIGN KEY([UserID])
REFERENCES [dbo].[tblUser] ([UserID])
GO
USE [AirlineReservation]
GO

/****** Object:  Table [dbo].[tblpassenger_table]    Script Date: 8/20/2020 9:04:16 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ARITHABORT ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[tblpassenger_table](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Prefix] [varchar](20) NOT NULL,
	[PassengerID]  AS ([prefix]+right(CONVERT([varchar](20),[ID]),(20))) PERSISTED NOT NULL,
	[TicketID] [varchar](40) NOT NULL,
	[PName] [varchar](30) NOT NULL,
	[Gender] [varchar](10) NOT NULL,
	[SeatID] [varchar](10) NULL,
	[Age] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[PassengerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[tblpassenger_table] ADD  DEFAULT ('PS') FOR [Prefix]
GO

ALTER TABLE [dbo].[tblpassenger_table]  WITH CHECK ADD FOREIGN KEY([TicketID])
REFERENCES [dbo].[tblTicket_table] ([TicketID])
GO

USE [AirlineReservation]
GO

/****** Object:  Table [dbo].[tblPayments]    Script Date: 8/20/2020 9:04:31 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ARITHABORT ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[tblPayments](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[prefix] [varchar](20) NOT NULL,
	[Payment_ID]  AS ([prefix]+right(CONVERT([varchar](20),[ID]),(20))) PERSISTED NOT NULL,
	[Payment Amount] [varchar](50) NOT NULL,
	[Payment Status] [varchar](20) NOT NULL,
	[Payment date] [datetime] NULL,
	[Bid] [varchar](40) NULL,
PRIMARY KEY CLUSTERED 
(
	[Payment_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[tblPayments] ADD  DEFAULT ('P') FOR [prefix]
GO

ALTER TABLE [dbo].[tblPayments]  WITH CHECK ADD  CONSTRAINT [pk_Bid] FOREIGN KEY([Bid])
REFERENCES [dbo].[tblBookings] ([BID])
GO

ALTER TABLE [dbo].[tblPayments] CHECK CONSTRAINT [pk_Bid]
GO

USE [AirlineReservation]
GO

/****** Object:  Table [dbo].[tblSeats]    Script Date: 8/20/2020 9:04:43 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[tblSeats](
	[SeatID] [varchar](10) NOT NULL,
	[Airplane_No] [varchar](40) NOT NULL,
	[SeatType] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[SeatID] ASC,
	[Airplane_No] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[tblSeats]  WITH CHECK ADD FOREIGN KEY([Airplane_No])
REFERENCES [dbo].[tbl_AircraftDetails] ([Airplane_no])
GO

USE [AirlineReservation]
GO

/****** Object:  Table [dbo].[tblSeats]    Script Date: 8/20/2020 9:04:51 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[tblSeats](
	[SeatID] [varchar](10) NOT NULL,
	[Airplane_No] [varchar](40) NOT NULL,
	[SeatType] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[SeatID] ASC,
	[Airplane_No] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[tblSeats]  WITH CHECK ADD FOREIGN KEY([Airplane_No])
REFERENCES [dbo].[tbl_AircraftDetails] ([Airplane_no])
GO

USE [AirlineReservation]
GO

/****** Object:  Table [dbo].[tblTicket_table]    Script Date: 8/20/2020 9:05:26 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ARITHABORT ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[tblTicket_table](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Prefix] [varchar](20) NOT NULL,
	[TicketID]  AS ([prefix]+right(CONVERT([varchar](20),[ID]),(20))) PERSISTED NOT NULL,
	[BID] [varchar](40) NOT NULL,
	[TripID] [varchar](40) NOT NULL,
	[TicketStatus] [nvarchar](15) NULL,
PRIMARY KEY CLUSTERED 
(
	[TicketID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[tblTicket_table] ADD  DEFAULT ('T') FOR [Prefix]
GO

ALTER TABLE [dbo].[tblTicket_table] ADD  CONSTRAINT [ticketstat]  DEFAULT ('confirmed') FOR [TicketStatus]
GO

ALTER TABLE [dbo].[tblTicket_table]  WITH CHECK ADD FOREIGN KEY([TripID])
REFERENCES [dbo].[tblTrips] ([TripID])
GO

ALTER TABLE [dbo].[tblTicket_table]  WITH CHECK ADD FOREIGN KEY([BID])
REFERENCES [dbo].[tblBookings] ([BID])
GO

ALTER TABLE [dbo].[tblTicket_table]  WITH CHECK ADD FOREIGN KEY([BID])
REFERENCES [dbo].[tblBookings] ([BID])
GO


USE [AirlineReservation]
GO

/****** Object:  Table [dbo].[tblTrips]    Script Date: 8/20/2020 9:05:55 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ARITHABORT ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[tblTrips](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[prefix] [varchar](20) NOT NULL,
	[TripID]  AS ([prefix]+right(CONVERT([varchar](20),[ID]),(20))) PERSISTED NOT NULL,
	[FlightID] [varchar](40) NOT NULL,
	[Airplane_No] [varchar](40) NOT NULL,
	[TripDate] [date] NOT NULL,
	[Departure_Time] [time](7) NOT NULL,
	[Arrival_Time] [time](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[TripID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[tblTrips] ADD  DEFAULT ('TR') FOR [prefix]
GO

ALTER TABLE [dbo].[tblTrips]  WITH CHECK ADD FOREIGN KEY([Airplane_No])
REFERENCES [dbo].[tbl_AircraftDetails] ([Airplane_no])
GO

ALTER TABLE [dbo].[tblTrips]  WITH CHECK ADD FOREIGN KEY([FlightID])
REFERENCES [dbo].[tbl_FlightDetails] ([FlightId])
GO

USE [AirlineReservation]
GO

/****** Object:  Table [dbo].[tblUser]    Script Date: 8/20/2020 9:06:18 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ARITHABORT ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[tblUser](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[PreFix] [varchar](20) NULL,
	[UserID]  AS ([PreFix]+right(CONVERT([varchar](20),[Id]),(20))) PERSISTED NOT NULL,
	[Title] [varchar](20) NULL,
	[FirstName] [nvarchar](30) NOT NULL,
	[LastName] [nvarchar](30) NULL,
	[DOB] [date] NOT NULL,
	[PhoneNo] [nvarchar](10) NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](20) NOT NULL,
	[Security] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[tblUser] ADD  DEFAULT ('U') FOR [PreFix]
GO



--------Stored Procedures
USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[addTrip]    Script Date: 8/20/2020 9:07:38 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[addTrip](@FlightID varchar(40), @Airplane_No varchar(40), @TripDate date, @DepTime time, @Arrival_Time time)
as
	Insert into tblTrips(FlightID, Airplane_No, TripDate,Departure_Time, Arrival_Time) values (@FlightID, @Airplane_No, @TripDate, @DepTime, @Arrival_Time)

GO


USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[allTrips]    Script Date: 8/20/2020 9:08:03 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[allTrips]
as
	Select TripID from tblTrips

GO

USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[alterTrip]    Script Date: 8/20/2020 9:08:16 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


create proc [dbo].[alterTrip](@TripID nvarchar(40), @Airplane_No nvarchar(40), @DeptTime time, @ArrivalTime time)
as
	update tblTrips set Airplane_No = @Airplane_No, Arrival_Time = @ArrivalTime, Departure_Time = @DeptTime where tripID = @TripID 
GO
USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[createTrip]    Script Date: 8/20/2020 9:08:31 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[createTrip](@TripID nvarchar(40), @Airplane_No nvarchar(40), @DeptTime time, @ArrivalTime time)
as
	update tblTrips set Airplane_No = @Airplane_No, Arrival_Time = @ArrivalTime, Departure_Time = @DeptTime where tripID = @TripID 

GO
USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[flightDetails]    Script Date: 8/20/2020 9:08:44 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[flightDetails]
as
	Select FlightId, DeparturePoint, ArrivalPoint, TravelDays from tbl_FlightDetails

GO
------views
USE [AirlineReservation]
GO

/****** Object:  View [dbo].[searchView]    Script Date: 8/20/2020 9:09:41 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create view [dbo].[searchView] as select vc.passsengerCount as availableCount, tr.TripID from tblTrips tr full outer join view_count vc on vc.TripID = tr.TripID
			
GO

USE [AirlineReservation]
GO

/****** Object:  View [dbo].[view_count]    Script Date: 8/20/2020 9:09:53 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


		create view [dbo].[view_count]
		as
		select tplane.capacity - Count(*) as passsengerCount, tr.TripID from tbl_FlightDetails tf inner join tblTrips tr on tf.FlightId = tr.FlightID
			inner join tblTicket_table tt on tt.TripID = tr.TripId
			inner join tbl_AircraftDetails tplane on tplane.airplane_no = tr.Airplane_No
			inner join tblpassenger_table tp on tp.TicketID = tt.TicketID 
			inner join tblPayments p on p.Bid=tt.BID
			where tp.SeatID != 'Null' and p.[Payment Status]='Confirmed'  
			group by tr.TripID, tplane.capacity
GO

USE [AirlineReservation]
GO

/****** Object:  View [dbo].[view_newReal]    Script Date: 8/20/2020 9:10:06 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create view 
			[dbo].[view_newReal]
			as
			select TripID,
			case
			when availableCount is null then (Select top 1 ta.capacity from tblTrips tr inner join tbl_AircraftDetails ta on tr.airplane_no = ta.airplane_no)
			else availableCount
			end as newCount
			from searchView

GO

USE [AirlineReservation]
GO

/****** Object:  View [dbo].[view_real]    Script Date: 8/20/2020 9:10:14 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create view [dbo].[view_real]
	as
	select TripID,
			case
			when availableCount is null then 60
			else availableCount
			end as newCount
			from searchView
GO



USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[locations]    Script Date: 8/20/2020 9:11:59 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[locations]
as
	Select city_name from tbl_Airports

GO


USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[passengerInfo]    Script Date: 8/20/2020 9:12:17 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[passengerInfo]
as
	Select SeatID from tblpassenger_table
GO


USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[planeInfo]    Script Date: 8/20/2020 9:12:33 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[planeInfo](@planeID varchar(40))
as
	Select Airplane_no, Capacity, Column_no from tbl_AircraftDetails where Airplane_no = @planeID
GO


USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[planes]    Script Date: 8/20/2020 9:12:41 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[planes]
as
	Select Airplane_no from tbl_AircraftDetails

GO


USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[planeSeatInfo]    Script Date: 8/20/2020 9:12:53 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[planeSeatInfo](@tripId varchar(40))
as
	Select tp.SeatID from tblTrips tr inner join tblTicket_table ti on tr.TripID = ti.TripID 
	inner join tblpassenger_table tp on ti.ticketid = tp.ticketid where tr.tripId = @tripId order by tp.seatid
GO


USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[planeSeats]    Script Date: 8/20/2020 9:13:07 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[planeSeats](@Plane_no varchar(40))
as
	Select SeatID, SeatType from tblSeats where Airplane_No = @Plane_no order by SeatID
GO


USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[proc_AddFlight]    Script Date: 8/20/2020 9:14:37 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[proc_AddFlight](@td varchar(10),@dp nvarchar(50),@ap nvarchar(50),@cabin char(10),@ef nvarchar(10),@bf nvarchar(10),@ff nvarchar(10),@status varchar(20))
as
insert into tbl_FlightDetails(TravelDays,DeparturePoint,ArrivalPoint,CabinType,EconomyClassFair,BusinessClassFair,FirstClassFair,FlightStatus)
values(@td,@dp,@ap,@cabin,@ef,@bf,@ff,@status)
GO
USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[proc_AdminLogin]    Script Date: 8/20/2020 9:14:58 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[proc_AdminLogin]
as
select Email,Passwords,AdminID from tblAdmin
GO

USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[proc_Booking]    Script Date: 8/20/2020 9:15:18 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[proc_Booking](@userID varchar(40))
as
Begin 
	insert into tblBookings(UserID) values(@userID)
End
GO

USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[proc_DetailsConfirmation]    Script Date: 8/20/2020 9:15:27 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[proc_DetailsConfirmation](@mBID varchar(40))
as
Select f.FlightId,f.DeparturePoint,f.ArrivalPoint,tr.Departure_Time,tr.Arrival_Time,pt.SeatID,pt.PName,pt.Gender,pt.Age
 from tblpassenger_table pt inner join tblTicket_table tk on pt.TicketID=tk.TicketID inner join
 tblTrips tr on tk.TripID=tr.TripID inner join tbl_FlightDetails f on f.FlightId=tr.FlightID where tk.BID=@mBID
GO
USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[proc_DetailsConfirmation1]    Script Date: 8/20/2020 9:15:40 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[proc_DetailsConfirmation1](@mBID varchar(40))
as
Select f.FlightId,f.DeparturePoint,f.ArrivalPoint,tr.Departure_Time,tr.Arrival_Time,pt.SeatID,pt.PName,pt.Gender,pt.Age
 from tblpassenger_table pt inner join tblTicket_table tk on pt.TicketID=tk.TicketID inner join
 tblTrips tr on tk.TripID=tr.TripID inner join tbl_FlightDetails f on f.FlightId=tr.FlightID where tk.BID=@mBID
GO
USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[proc_displaypassengers]    Script Date: 8/20/2020 9:15:50 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[proc_displaypassengers](@uid varchar(40))
AS
Select distinct tblpassenger_table.Pname, tblpassenger_table.Gender, tblpassenger_table.Age
From tblpassenger_table 
Inner join tblTicket_table on tblTicket_table.TicketID=tblpassenger_table.TicketID
Inner join tblBookings on tblBookings.BID=tblTicket_table.BID
Where tblBookings.UserID=@uid
GO
USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[proc_EditFlight]    Script Date: 8/20/2020 9:16:05 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[proc_EditFlight](@fid varchar(40),@status varchar(20))
as
update tbl_FlightDetails
set FlightStatus=@status
where FlightId=@fid
GO
USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[proc_FlightSelect]    Script Date: 8/20/2020 9:16:14 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[proc_FlightSelect](@from nvarchar(50),@to nvarchar(50),@deptdate date,@returndate date,@PassengerCount int)
as
	
	Begin
		select aircraft.Airplane_no ,tt.TripID ,tt.Departure_Time,tt.Arrival_Time,fd.EconomyClassFair,fd.BusinessClassFair,fd.FirstClassFair
		from tbl_FlightDetails fd Inner Join tblTrips tt 
		on fd.FlightId = tt.FlightId
		Inner Join tbl_AircraftDetails aircraft on aircraft.Airplane_no=tt.Airplane_No
		where fd.DeparturePoint=@from AND fd.ArrivalPoint=@to  AND  tt.TripDate=@deptdate
		AND 
		@PassengerCount<=(
					select aircraft.Capacity-Count(pass.PassengerID) as [PassCount]
					from tbl_AircraftDetails aircraft Inner Join tblTrips trips on aircraft.Airplane_no=trips.Airplane_No
					Inner Join tblTicket_table tr on trips.TripID=tr.TripID Inner Join tblpassenger_table pass
					on tr.TicketID =pass.TicketID 
					where fd.DeparturePoint=@from AND fd.ArrivalPoint=@to  AND  tt.TripDate=@deptdate
					group by aircraft.Capacity

				)		
		End
GO

USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[proc_FlightSelect1]    Script Date: 8/20/2020 9:16:24 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[proc_FlightSelect1](@from nvarchar(50),@to nvarchar(50),@deptdate date,@returndate date,@PassengerCount int)
as
	
	Begin
		select aircraft.Airplane_no ,tt.TripID ,tt.Departure_Time,tt.Arrival_Time,fd.EconomyClassFair,fd.BusinessClassFair,fd.FirstClassFair
		from tbl_FlightDetails fd Inner Join tblTrips tt 
		on fd.FlightId = tt.FlightId
		Inner Join tbl_AircraftDetails aircraft on aircraft.Airplane_no=tt.Airplane_No
		where fd.DeparturePoint=@from AND fd.ArrivalPoint=@to  AND  tt.TripDate=@deptdate AND fd.FlightStatus= 'Active'
		AND 
		@PassengerCount<=(
					select aircraft.Capacity-Count(pass.PassengerID) as [PassCount]
					from tbl_AircraftDetails aircraft Inner Join tblTrips trips on aircraft.Airplane_no=trips.Airplane_No
					Inner Join tblTicket_table tr on trips.TripID=tr.TripID Inner Join tblpassenger_table pass
					on tr.TicketID =pass.TicketID 
					where fd.DeparturePoint=@from AND fd.ArrivalPoint=@to  AND  tt.TripDate=@deptdate 
					group by aircraft.Capacity

				)		
		End
GO

USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[proc_GetBookings]    Script Date: 8/20/2020 9:16:31 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[proc_GetBookings](@userID varchar(40))
as
Begin
	select TOP 1 UserID ,BID,Booking_Date,[Booking Status] from tblBookings where UserID=@userID order by Booking_Date desc 
End
GO
USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[proc_getpayment]    Script Date: 8/20/2020 9:16:42 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[proc_getpayment]
as
select*from tblPayments
GO
USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[proc_getTicket]    Script Date: 8/20/2020 9:16:50 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure  [dbo].[proc_getTicket](@bid varchar(40))
as
select * from tblTicket_table where BID=@bid
GO
USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[proc_getUserByEmail]    Script Date: 8/20/2020 9:16:58 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[proc_getUserByEmail](@email nvarchar(50),@sec varchar(20))
as
select UserID,Email,Security from tblUser where Email=@email and Security=@sec
GO
USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[proc_getUserIDbyEmail]    Script Date: 8/20/2020 9:17:14 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[proc_getUserIDbyEmail](@email nvarchar(50))
as
select  UserID from tblUser where Email=@email
GO

USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[proc_insertpassengers]    Script Date: 8/20/2020 9:18:04 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[proc_insertpassengers](@TicketID varchar(40),@Pname varchar(30), @Gender varchar(10),@SeatID varchar(10), @Age int)
AS 
insert into tblpassenger_table(TicketID,PName, Gender, SeatID, Age) 
values (@TicketID, @Pname, @Gender,@SeatID, @Age)
GO

USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[proc_payment]    Script Date: 8/20/2020 9:18:27 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[proc_payment] (@amount varchar(50),@status varchar(20),@bid varchar(40))
as
insert into tblPayments([Payment Amount],[Payment Status],[Payment date],Bid) values(@amount,@status,GETDATE(),@bid)
GO

USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[proc_ShowFlight]    Script Date: 8/20/2020 9:18:37 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

Create procedure [dbo].[proc_ShowFlight]
as
select FlightId,TravelDays,DeparturePoint,ArrivalPoint,CabinType,EconomyClassFair,BusinessClassFair,FirstClassFair,FlightStatus from tbl_FlightDetails
GO
USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[proc_TicketBook]    Script Date: 8/20/2020 9:18:52 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[proc_TicketBook](@BID varchar(40),@TripID varchar(40))
as
Begin
	insert into tblTicket_table(BID,TripID) values(@BID,@TripID)
End
GO

USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[proc_updateUser]    Script Date: 8/20/2020 9:19:06 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[proc_updateUser](@email nvarchar(50),@sec varchar(20))
as
update tblUser
set Security=@sec where Email=@email
GO

USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[proc_updateUser1]    Script Date: 8/20/2020 9:19:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[proc_updateUser1](@email nvarchar(50),@pass varchar(20))
as
update tblUser
set Security=@pass where Email=@email
GO

USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[proc_updateUser2]    Script Date: 8/20/2020 9:19:25 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[proc_updateUser2](@email nvarchar(50),@pass varchar(20))
as
update tblUser
set Password=@pass where Email=@email
GO

USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[proc_UserDetails]    Script Date: 8/20/2020 9:19:43 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[proc_UserDetails]
as
select*from tblUser
GO


USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[proc_UserDetails1]    Script Date: 8/20/2020 9:20:14 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[proc_UserDetails1]
as
select*from tblUser
GO

USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[proc_UserLogin]    Script Date: 8/20/2020 9:20:23 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[proc_UserLogin]
as
select Email,Password from tblUser
GO

USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[proc_UserRegisteration]    Script Date: 8/20/2020 9:20:43 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[proc_UserRegisteration](@t varchar(20),@f varchar(60),@l varchar(60),@dob date,@phone nvarchar(10),@email nvarchar(50),@pass nvarchar(20))
as
insert into tblUser(Title,FirstName,LastName,DOB,PhoneNo,Email,Password) values(@t,@f,@l,@dob,@phone,@email,@pass)
GO

USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[proc_UserRegisteration1]    Script Date: 8/20/2020 9:20:56 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[proc_UserRegisteration1](@t varchar(20),@f varchar(60),@l varchar(60),@dob date
,@phone nvarchar(10),@email nvarchar(50),@pass nvarchar(20),@sec varchar(20))
as
insert into tblUser(Title,FirstName,LastName,DOB,PhoneNo,Email,Password,Security) values(@t,@f,@l,@dob,@phone,@email,@pass,@sec)
GO

USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[SeatPrice]    Script Date: 8/20/2020 9:21:19 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[SeatPrice](@TripID varchar(40))
as
	Select BusinessClassFair, EconomyClassFair, FirstClassFair  from tbl_FlightDetails where FlightId = (Select FlightId from tblTrips where TripID = @TripID)

GO

USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[sp_cancelSeat]    Script Date: 8/20/2020 9:21:37 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[sp_cancelSeat](@tid varchar(30))
as
update tblpassenger_table set SeatID='Null'
from
tblpassenger_table p
Inner Join tblTicket_table t
on t.TicketID=p.TicketID
Where t.TicketID = @tid
GO

USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[sp_cancelTicket]    Script Date: 8/20/2020 9:21:45 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[sp_cancelTicket](@uid varchar(40))
as
Select b.BID, t.TicketID, b.Booking_Date, tr.TripDate, tr.Airplane_No, f.DeparturePoint, tr.Departure_Time, 
 f.ArrivalPoint, tr.Arrival_Time, p.[Payment Amount] as PaymentAmount, t.TicketStatus
from [tblBookings] b
Inner Join [tblTicket_table] t
on b.BID = t.BID
Inner Join [tblPayments] p
on p.Bid=b.BID
Inner Join [tblpassenger_table] ps
on ps.TicketID =t.TicketID
Inner Join [tblTrips] tr
on t.TripID=tr.TripID
Inner join [tbl_FlightDetails] f
on tr.FlightID=f.FlightId 
Where b.UserID= @uid AND tr.TripDate>GETDATE()
order by  b.BID desc
GO

USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[sp_cancelticketStatus]    Script Date: 8/20/2020 9:22:04 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[sp_cancelticketStatus](@tid varchar(30))
as
update tblTicket_table Set TicketStatus='Cancelled'
where TicketID=@tid
GO

USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[sp_downloadticket]    Script Date: 8/20/2020 9:22:32 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[sp_downloadticket](@bid varchar(40))
as
Select b.BID, b.[Booking Status] as BookingStatus ,b.Booking_Date, tr.TripDate, tr.Airplane_No, f.DeparturePoint, tr.Departure_Time,  
f.ArrivalPoint, tr.Arrival_Time, p.[Payment Amount] as PaymentAmount,p.[Payment Status] as PaymentStatus, ps.PName, ps.Gender, ps.Age
from [tblBookings] b
Inner Join [tblTicket_table] t
on b.BID = t.BID
Inner Join [tblPayments] p
on p.Bid=b.BID
Inner Join [tblpassenger_table] ps
on ps.TicketID =t.TicketID
Inner Join [tblTrips] tr
on t.TripID=tr.TripID
Inner join [tbl_FlightDetails] f
on tr.FlightID=f.FlightId 
Where b.BID=@bid
GO

USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[sp_viewBooking]    Script Date: 8/20/2020 9:22:49 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[sp_viewBooking](@uid varchar(40))
as
Select b.BID, b.Booking_Date, tr.TripDate, tr.Airplane_No, f.DeparturePoint, tr.Departure_Time,  f.ArrivalPoint, tr.Arrival_Time,
 p.[Payment Amount] as PaymentAmount, ps.PName, ps.Gender, ps.Age
from [tblBookings] b
Inner Join [tblTicket_table] t
on b.BID = t.BID
Inner Join [tblPayments] p
on p.Bid=b.BID
Inner Join [tblpassenger_table] ps
on ps.TicketID =t.TicketID
Inner Join [tblTrips] tr
on t.TripID=tr.TripID
Inner join [tbl_FlightDetails] f
on tr.FlightID=f.FlightId 
Where b.UserID= @uid
order by  b.Booking_Date desc
GO

USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[time]    Script Date: 8/20/2020 9:23:04 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[time](@Flight varchar(40))
as
	Select top 1 Departure_Time, Arrival_Time from tblTrips where FlightID = @Flight order by TripDate

GO

USE [AirlineReservation]
GO

/****** Object:  StoredProcedure [dbo].[TripByID]    Script Date: 8/20/2020 9:23:19 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[TripByID](@TripID varchar(40))
as
	Select TripID, FlightID, Airplane_No, TripDate, Departure_Time, Arrival_Time from tblTrips where tripID = @TripID

GO































