


drop table LAWYERCOMPANYADDRESS
/

drop table DEFEND
/

drop table DEFENDANT
/

drop table REPRESENT
/

drop table PROSECUTOR
/

drop table WORKON
/

drop table LAWYERS
/

drop table LAWYERCOMPANYPHONE
/

drop table TESTIFYFOR
/

drop table WITNESS
/

drop table EVIDENCEBELONGINGTO
/

drop table CASEHEARINGS
/

drop table CASEJURY
/

drop table CLOSEDCASE
/

drop table JUDGEDCASES
/

drop table JUDGE
/










CREATE TABLE LawyerCompanyPhone(company VARCHAR2(100) PRIMARY KEY,
	  phone  number(10) NOT NULL);

CREATE TABLE LawyerCompanyAddress(company VARCHAR2(100) PRIMARY KEY,
					office_address VARCHAR2(100),
FOREIGN KEY (company)
REFERENCES LawyerCompanyPhone
ON DELETE CASCADE);


CREATE TABLE  Lawyers(licensenum CHAR(5) PRIMARY KEY,
			name  VARCHAR2(100)  NOT NULL,
company VARCHAR2(100) DEFAULT 'Unemployed',
FOREIGN KEY (company)
REFERENCES LawyerCompanyPhone
ON DELETE CASCADE);


CREATE TABLE Defendant(sin  number(9) PRIMARY KEY, 
   name  VARCHAR2(100) NOT NULL);

CREATE TABLE Prosecutor(sin  number(9) PRIMARY KEY, 
   name  VARCHAR2(100) NOT NULL);

CREATE TABLE Defend(sin  number(9), 
           licensenum CHAR(5),
	offense VARCHAR2(100),
	PRIMARY KEY (sin, licensenum),
	FOREIGN KEY (sin)
REFERENCES Defendant(sin)
 ON DELETE CASCADE,
	FOREIGN KEY (licensenum)
REFERENCES Lawyers
 ON DELETE CASCADE);

CREATE TABLE Represent(sin  number(9), 
           licensenum CHAR(5),
claimed_damages VARCHAR2(100),
PRIMARY KEY (sin, licensenum),
FOREIGN KEY (sin)
REFERENCES Prosecutor(sin)
 ON DELETE CASCADE,
FOREIGN KEY (licensenum)
REFERENCES Lawyers
 ON DELETE CASCADE);








CREATE TABLE   Witness(sin  number(9) PRIMARY KEY,
			relation  VARCHAR2(100) NOT NULL);



CREATE TABLE Judge(licensenum  CHAR(5) PRIMARY KEY,
name  VARCHAR2(100) NOT NULL);

 CREATE TABLE JudgedCases(casenum CHAR(5) PRIMARY KEY ,
title VARCHAR2(100),
start_date DATE,
licensenum CHAR(5),
FOREIGN KEY (licensenum)
REFERENCES Judge
ON DELETE CASCADE);


CREATE TABLE WorkOn(casenum  CHAR(5), 
             licensenum CHAR(5),
PRIMARY KEY (casenum, licensenum),
FOREIGN KEY (casenum)
REFERENCES JudgedCases
 ON DELETE CASCADE,
FOREIGN KEY (licensenum)
REFERENCES Lawyers
 ON DELETE CASCADE);

CREATE TABLE TestifyFor(sin  number(9), 
casenum CHAR(5),
PRIMARY KEY (sin, casenum),
FOREIGN KEY (sin)
REFERENCES Witness(sin)
 ON DELETE CASCADE,
FOREIGN KEY (casenum)
REFERENCES JudgedCases
 ON DELETE CASCADE);

CREATE TABLE EvidenceBelongingTo(object_id  CHAR(5), 
	description VARCHAR2(100),
	casenum CHAR(5),
	PRIMARY KEY (object_id),
	FOREIGN KEY (casenum)
		REFERENCES JudgedCases
		ON DELETE CASCADE
);



CREATE TABLE CaseHearings(hearingnum CHAR(5) ,
location VARCHAR2(100),
hearing_date DATE,
casenum CHAR(5),
PRIMARY KEY(hearingnum, casenum),
FOREIGN KEY (casenum)
REFERENCES JudgedCases
ON DELETE CASCADE);



CREATE TABLE CaseJury(head_juror_sin number(9) PRIMARY KEY,
numpeople number(2),
casenum CHAR(5) UNIQUE,
FOREIGN KEY (casenum)
REFERENCES JudgedCases
 ON DELETE CASCADE);

CREATE TABLE ClosedCase(casenum CHAR(5) PRIMARY KEY,
verdict CHAR(10),
end_date DATE,
FOREIGN KEY (casenum)
REFERENCES JudgedCases
ON DELETE CASCADE);





INSERT
INTO LawyerCompanyPhone(company, phone )
VALUES ('Kent & Smith', 1111111111);

INSERT
INTO LawyerCompanyPhone(company, phone )
VALUES ('Peterson Association', 2222222222);

INSERT
INTO LawyerCompanyPhone(company, phone )
VALUES ('Sam & Associates', 3333333333);

INSERT
INTO LawyerCompanyPhone(company, phone )
VALUES ('Lane & Bond', 4444444444);

INSERT
INTO LawyerCompanyPhone(company, phone )
VALUES ('Sullivan Group', 5555555555);



INSERT
INTO Judge(licensenum, name)
VALUES ('b1', 'Albert Wu');

INSERT
INTO Judge(licensenum, name)
VALUES ('b2', 'Ben Carter');

INSERT
INTO Judge(licensenum, name)
VALUES ('b3', 'Chloe Williams');

INSERT
INTO Judge(licensenum, name)
VALUES ('b4', 'Dora Potter');

INSERT
INTO Judge(licensenum, name)
VALUES ('b5', 'Elenor Denman');




INSERT
INTO LawyerCompanyAddress(company, office_address )
VALUES ('Kent & Smith', '12 Main Street, Van' );

INSERT
INTO LawyerCompanyAddress(company, office_address )
VALUES ('Peterson Association', '13 Main Street, Van' );

INSERT
INTO LawyerCompanyAddress(company, office_address )
VALUES ('Sam & Associates', '14 Main Street, Van' );

INSERT
INTO LawyerCompanyAddress(company, office_address )
VALUES ('Lane & Bond', '15 Main Street, Van' );

INSERT
INTO LawyerCompanyAddress(company, office_address )
VALUES ('Sullivan Group', '16 Main Street, Van' );





INSERT
INTO Lawyers(licensenum, name, company)
VALUES ('11111', 'Scott Owen', 'Kent & Smith');

INSERT
INTO Lawyers(licensenum, name, company)
VALUES ('22222', 'Cindy Low', 'Peterson Association');

INSERT
INTO Lawyers(licensenum, name, company)
VALUES ('33333', 'Jane Gooden', 'Sam & Associates');

INSERT
INTO Lawyers(licensenum, name, company)
VALUES ('44444', 'Larry Joe', 'Lane & Bond');

INSERT
INTO Lawyers(licensenum,name, company)
VALUES ('55555', 'Steve Kid', 'Sullivan Group');






INSERT
INTO Defendant(sin, name)
VALUES (123456789, 'Jordon Johnson');

INSERT
INTO Defendant(sin, name)
VALUES (987654321, 'Rachel Pottinger');

INSERT
INTO Defendant(sin, name)
VALUES (112233445, 'Steve Wolfman');

INSERT
INTO Defendant(sin, name)
VALUES (112233456, 'Geoffrey Tien');

INSERT
INTO Defendant(sin, name)
VALUES (112234567, 'Gregor Kizcales');



INSERT
INTO Prosecutor(sin, name)
VALUES (111111111, 'Adam Ant');

INSERT
INTO Prosecutor(sin, name)
VALUES (222222222, 'Bob Bridge');

INSERT
INTO Prosecutor(sin, name)
VALUES (333333333, 'Cathy Car');

INSERT
INTO Prosecutor(sin, name)
VALUES (444444444, 'Doug Dog');

INSERT
INTO Prosecutor(sin, name)
VALUES (555555555, 'Edward Egg');



INSERT
INTO Defend(sin, licensenum, offense)
VALUES (123456789, '11111', 'Referenced Hitchhikers Guide to the Galaxy one too many times');

INSERT
INTO Defend(sin, licensenum, offense)
VALUES (987654321, '22222' , 'Created too many databases');

INSERT
INTO Defend(sin, licensenum, offense)
VALUES (112233445, '33333' , 'Leaving lego bricks on the ground ');

INSERT
INTO Defend(sin, licensenum, offense)
VALUES (112233456, '44444' , 'Jaywalking');

INSERT
INTO Defend(sin, licensenum, offense)
VALUES (112234567, '55555' , 'Pineapple on pizza');



INSERT
INTO Represent(sin, licensenum, claimed_damages)
VALUES (111111111, '55555' , 'copyright claims');

INSERT
INTO Represent(sin, licensenum, claimed_damages)
VALUES (222222222, '44444' , 'data overflow');

INSERT
INTO Represent(sin, licensenum, claimed_damages)
VALUES (333333333, '33333' , 'unimaginable pain');

INSERT
INTO Represent(sin, licensenum, claimed_damages)
VALUES (444444444, '22222' , 'dented car');

INSERT
INTO Represent(sin, licensenum, claimed_damages)
VALUES (555555555, '11111' , 'unrepairable mental trauma');




INSERT
INTO JudgedCases(casenum, title, start_date, licensenum)
VALUES ('23', 'Johnson VS Ant',DATE '2021-11-21',  'b1');

INSERT
INTO JudgedCases(casenum, title, start_date, licensenum)
VALUES ('7634', 'Pottinger VS Bridge',DATE '2020-12-21',  'b2');

INSERT
INTO JudgedCases(casenum, title, start_date, licensenum)
VALUES ('123', 'Wolfman VS Car',DATE '2019-12-21',  'b3');

INSERT
INTO JudgedCases(casenum, title, start_date, licensenum)
VALUES ('356', 'Tien VS Dog',DATE '2021-12-11',  'b4');

INSERT
INTO JudgedCases(casenum, title, start_date, licensenum)
VALUES ('4490', 'Kizcales VS Egg',DATE '2021-12-26',  'b5');

INSERT
INTO JudgedCases(casenum, title, start_date, licensenum)
VALUES ('1', 'The Cool Case',DATE '2021-10-21',  'b1');

INSERT
INTO JudgedCases(casenum, title, start_date, licensenum)
VALUES ('2', 'The Weird Case',DATE '2021-11-21',  'b2');

INSERT
INTO JudgedCases(casenum, title, start_date, licensenum)
VALUES ('3', 'The Epic Case',DATE '2021-11-11',  'b3');

INSERT
INTO JudgedCases(casenum, title, start_date, licensenum)
VALUES ('4', 'The Quality Case',DATE '2021-2-21',  'b4');

INSERT
INTO JudgedCases(casenum, title, start_date, licensenum)
VALUES ('5', 'The Sad Case',DATE '2021-3-21',  'b5');






INSERT
INTO Witness(sin, relation)
VALUES (205893055, 'Random dude walking on the street');

INSERT
INTO Witness(sin, relation)
VALUES (104859039, 'Unsuspecting TA');

INSERT
INTO Witness(sin, relation)
VALUES (273940683, 'Steve Wolfman (Husband)');

INSERT
INTO Witness(sin, relation)
VALUES (950302740, 'Italian person');

INSERT
INTO Witness(sin, relation)
VALUES (208475950, 'Pizza connoisseur');



INSERT
INTO WorkOn(licensenum, casenum)
VALUES ('11111', '23');

INSERT
INTO WorkOn(licensenum, casenum)
VALUES ('22222', '7634');

INSERT
INTO WorkOn(licensenum, casenum)
VALUES ('33333', '123');

INSERT
INTO WorkOn(licensenum, casenum)
VALUES ('44444', '356');

INSERT
INTO WorkOn(licensenum, casenum)
VALUES ('55555', '4490');

INSERT
INTO WorkOn(licensenum, casenum)
VALUES ('11111', '1');

INSERT
INTO WorkOn(licensenum, casenum)
VALUES ('22222', '2');

INSERT
INTO WorkOn(licensenum, casenum)
VALUES ('33333', '3');

INSERT
INTO WorkOn(licensenum, casenum)
VALUES ('44444', '4');

INSERT
INTO WorkOn(licensenum, casenum)
VALUES ('55555', '5');



INSERT
INTO TestifyFor(sin, casenum)
VALUES (205893055, '1');

INSERT
INTO TestifyFor(sin, casenum)
VALUES (104859039, '23');

INSERT
INTO TestifyFor(sin, casenum)
VALUES (273940683, '4');

INSERT
INTO TestifyFor(sin, casenum)
VALUES (950302740, '7634');

INSERT
INTO TestifyFor(sin, casenum)
VALUES (208475950, '356');



INSERT
INTO EvidenceBelongingTo(object_id, description, casenum)
VALUES ('2331', 'A smol knife', '23');

INSERT
INTO EvidenceBelongingTo(object_id, description, casenum)
VALUES ('2332', 'Towel', '23');

INSERT
INTO EvidenceBelongingTo(object_id, description, casenum)
VALUES ('2441', 'Canvas course page', '7634');

INSERT
INTO EvidenceBelongingTo(object_id, description, casenum)
VALUES ('356', 'Fingerprints on lego bricks', '123');

INSERT
INTO EvidenceBelongingTo(object_id, description, casenum)
VALUES ('2661', 'Pizza', '356');

INSERT
INTO EvidenceBelongingTo(object_id, description, casenum)
VALUES ('2662', 'Open can of pineapples', '356');

INSERT
INTO EvidenceBelongingTo(object_id, description, casenum)
VALUES ('2771', 'Traffic camera footage', '4490');

INSERT
INTO EvidenceBelongingTo(object_id, description, casenum)
VALUES ('fds', 'Footprint', '1');

INSERT
INTO EvidenceBelongingTo(object_id, description, casenum)
VALUES ('gfd', 'Glove', '2');

INSERT
INTO EvidenceBelongingTo(object_id, description, casenum)
VALUES ('jhg', 'Broken mouse', '3');

INSERT
INTO EvidenceBelongingTo(object_id, description, casenum)
VALUES ('ewq', 'Surveillance footage', '4');

INSERT
INTO EvidenceBelongingTo(object_id, description, casenum)
VALUES ('kop', 'Traffic camera footage', '5');




INSERT
INTO CaseHearings(hearingnum, location, hearing_date, casenum)
VALUES ('11', '1 East Ave, Van',DATE '2021-12-21',  '23');

INSERT
INTO CaseHearings(hearingnum, location, hearing_date, casenum)
VALUES ('22', '2 East Ave, Van',DATE '2021-12-21',  '7634');

INSERT
INTO CaseHearings(hearingnum, location, hearing_date, casenum)
VALUES ('33', '3 East Ave, Van',DATE '2021-12-21',  '123');

INSERT
INTO CaseHearings(hearingnum, location, hearing_date, casenum)
VALUES ('44', '4 East Ave, Van',DATE '2021-12-21',  '356');

INSERT
INTO CaseHearings(hearingnum, location, hearing_date, casenum)
VALUES ('55', '5 East Ave, Van',DATE '2021-12-21',  '4490');

INSERT
INTO CaseHearings(hearingnum, location, hearing_date, casenum)
VALUES ('1', '6 East Ave, Van',DATE '2021-12-21',  '1');

INSERT
INTO CaseHearings(hearingnum, location, hearing_date, casenum)
VALUES ('2', '7 East Ave, Van',DATE '2021-12-22',  '2');

INSERT
INTO CaseHearings(hearingnum, location, hearing_date, casenum)
VALUES ('3', '8 East Ave, Van',DATE '2021-12-23',  '3');

INSERT
INTO CaseHearings(hearingnum, location, hearing_date, casenum)
VALUES ('4', '1 East Ave, Van',DATE '2021-12-24',  '4');

INSERT
INTO CaseHearings(hearingnum, location, hearing_date, casenum)
VALUES ('5', '1 East Ave, Van',DATE '2021-12-25',  '5');




INSERT
INTO CaseJury(head_juror_sin, numpeople, casenum)
VALUES (121314156, 12, '1');

INSERT
INTO CaseJury(head_juror_sin, numpeople, casenum)
VALUES (232425267, 14, '23');

INSERT
INTO CaseJury(head_juror_sin, numpeople, casenum)
VALUES (113355779, 12, '7634');

INSERT
INTO CaseJury(head_juror_sin, numpeople, casenum)
VALUES (224466880, 12, '5');

INSERT
INTO CaseJury(head_juror_sin, numpeople, casenum)
VALUES (131517190, 14, '356');



INSERT
INTO ClosedCase(casenum, end_date, verdict)
VALUES ('1', DATE'3022-12-21', 'guilty');

INSERT
INTO ClosedCase(casenum, end_date, verdict)
VALUES ('2',DATE '2122-12-20', 'innocent');

INSERT
INTO ClosedCase(casenum, end_date, verdict)
VALUES ('3',DATE '2031-12-1', 'guilty');

INSERT
INTO ClosedCase(casenum, end_date, verdict)
VALUES ('4',DATE '2023-12-21', 'guilty');

INSERT
INTO ClosedCase(casenum, end_date, verdict)
VALUES ('5',DATE '2024-12-21', 'innocent');



