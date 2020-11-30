-- create database 
-- drop database HMS;
create database sql12375258;
use sql12375258;

-- create tables
create table if not exists PATIENT (
	ID int not null auto_increment,
    NAME varchar(255) not null,
    GENDER char(6) not null,
    DOB date not null,
    PHONE varchar(255) not null,
    DOCTOR_ID int,
    ACCOUNT_ID int,
    primary key (ID)
);

create table if not exists VISIT (
	ID int not null auto_increment,
    CHECKIN date not null,
    CHECKOUT date,
    PATIENT_ID int not null,
    primary key (ID)
);

create table if not exists DOCTOR (
	ID int not null auto_increment,
    NAME varchar(255) not null,
    GENDER varchar(255) not null,
    DOB date not null,
    PHONE varchar(255) not null,
    ACCOUNT_ID int,
    primary key (ID)
);

create table if not exists ACCOUNT (
	ID int not null auto_increment,
    USERNAME varchar(255) not null,
    PASSWORD varchar(255) not null,
    primary key (ID)
);

create table if not exists DISEASE (
	ID int not null auto_increment,
    NAME varchar(255) not null,
    primary key (ID)
);

create table if not exists ROOM (
	ID int not null auto_increment,
    NUMBER int not null,
    TYPE varchar(255) not null,
    primary key (ID)
);

create table if not exists TREATMENT (
	ID int not null auto_increment,
    NAME varchar(255) not null,
    primary key (ID)
);

create table if not exists VISIT_ROOM (
	ID int not null auto_increment,
    ROOM_ID int not null,
    VISIT_ID int not null,
    primary key (ID)
);

create table if not exists VISIT_DISEASE (
	ID int not null auto_increment,
    DISEASE_ID int not null,
    VISIT_ID int not null,
    primary key (ID)
);

create table if not exists VISIT_TREATMENT (
	ID int not null auto_increment,
    TREATMENT_ID int not null,
    VISIT_ID int not null,
    primary key (ID)
);

-- add foreign keys
alter table PATIENT
add foreign key (ACCOUNT_ID) references ACCOUNT(ID)
on delete cascade;

alter table PATIENT 
add foreign key (DOCTOR_ID) references DOCTOR(ID)
on delete cascade;

alter table VISIT
add foreign key (PATIENT_ID) references PATIENT(ID)
on delete cascade;

alter table DOCTOR
add foreign key (ACCOUNT_ID) references ACCOUNT(ID)
on delete cascade;

alter table VISIT_ROOM
add foreign key (ROOM_ID) references ROOM(ID)
on delete cascade;

alter table VISIT_ROOM
add foreign key (VISIT_ID) references VISIT(ID)
on delete cascade;

alter table VISIT_DISEASE
add foreign key (DISEASE_ID) references DISEASE(ID)
on delete cascade;

alter table VISIT_DISEASE
add foreign key (VISIT_ID) references VISIT(ID)
on delete cascade;

alter table VISIT_TREATMENT
add foreign key (VISIT_ID) references VISIT(ID)
on delete cascade;

alter table VISIT_TREATMENT
add foreign key (TREATMENT_ID) references TREATMENT(ID)
on delete cascade;

-- insert values
insert into DISEASE (NAME)
values	("Flu"),
		("Stomach Aches"),
        ("Heart Disease"),
        ("Asthma");

insert into ROOM (NUMBER, TYPE) 
values	(401, "Operation Theaters"),
		(402, "Operation Theaters"),
        (403, "ICU"),
        (404, "ICU"),
		(405, "Clinic"),
        (406, "Clinic");
        
insert into TREATMENT (NAME) 
values 	("Surgery"),
		("Precision medicine"),
		("Physical therapy"),
        ("Laser");

insert into ACCOUNT (USERNAME, PASSWORD)
values 	("patient1", "8103cfda42d725cd38e8bdf9610ef9a6"),
		("patient2", "patient2"),
		("patient3", "patient3"),
        ("patient4", "patient4"),
        ("patient5", "patient5"),
        ("patient6", "patient6"),
        ("patient7", "patient7"),
        ("patient8", "patient8"),
        ("doctor1", "doctor1"),
        ("doctor2", "doctor2"),
        ("doctor3", "doctor3"),
        ("doctor4", "doctor4");

insert into DOCTOR (NAME, GENDER, DOB, PHONE, ACCOUNT_ID) 
values	("Doctor 1", "male", "1968-02-28", 0915754105, 9),
		("Doctor 2", "female", "1973-07-23", 0915117774, 10),
		("Doctor 3", "male", "1975-05-20", 0909999999, 11),
        ("Doctor 4", "male", "1980-03-01", 0948660917, 12);
        
insert into PATIENT (NAME, GENDER, DOB, PHONE, DOCTOR_ID, ACCOUNT_ID)
values	("patientA", "male", "2000-05-11", 0912345678, 1, 1),
		("patientB", "female", "2000-05-12", 0912456780, 2, 2),
		("patientC", "male", "2000-05-13", 0111245694, 2, 3),
        ("patientD", "female", "2000-05-14", 094546487, 3, 4),
        ("patientE", "male", "2000-05-15", 0456789789, 3, 5),
        ("patientF", "male", "2000-05-16", 0987161456, 3, 6),
        ("patientG", "male", "2000-05-17", 0987456456, 4, 7),
        ("patientH", "male", "2000-05-18", 0546123458, 4, 8);

insert into VISIT (CHECKIN, CHECKOUT, PATIENT_ID) 
values	("2020-05-01", "2020-05-11", 1),
		("2020-05-02", "2020-05-12", 2),
        ("2020-05-03", "2020-05-13", 3),
        ("2020-05-04", "2020-05-14", 4),
        ("2020-05-05", "2020-05-15", 5),
        ("2020-05-06", "2020-05-16", 6),
        ("2020-05-07", "2020-05-17", 7),
		("2020-05-07", "2020-05-17", 8);

insert into VISIT_ROOM (ROOM_ID, VISIT_ID) 
values	(1, 1),
		(2, 2),
        (3, 3),
        (4, 4),
        (5, 5),
        (6, 6),
        (1, 7),
        (2, 8);

insert into VISIT_DISEASE (DISEASE_ID, VISIT_ID)
values	(1, 1),
		(2, 2),
        (3, 3),
        (4, 4),
        (1, 5),
        (2, 6),
        (3, 7),
        (4, 8);

insert into VISIT_TREATMENT (TREATMENT_ID, VISIT_ID)
values	(1, 1),
		(2, 2),
        (3, 3),
        (4, 4),
        (1, 5),
        (2, 6),
        (3, 7),
        (4, 8);
