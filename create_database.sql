-- create database
drop schema sql12380579;
create database sql12380579;
use sql12380579;

-- create tables
create table if not exists PATIENT (
	ID int not null auto_increment,
    NAME varchar(255) not null,
    GENDER char(6) not null,
    DOB date not null,
    PHONE varchar(255) not null,
    DOCTOR_ID int,
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
    primary key (ID)
);

create table if not exists ACCOUNT (
	ID int not null auto_increment,
    USERNAME varchar(255) not null,
    PASSWORD varchar(255) not null,
    ROLE varchar(255) not null,
    PATIENT_ID int unique,
    DOCTOR_ID int unique,
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

create table if not exists REQUEST (
    ID int not null auto_increment,
    PATIENT_ID int,
    DOCTOR_ID int,
    CONTENT varchar(255),
    primary key (ID)
);

-- add foreign keys
alter table PATIENT 
add foreign key (DOCTOR_ID) references DOCTOR(ID)
on delete cascade;

alter table VISIT
add foreign key (PATIENT_ID) references PATIENT(ID)
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

alter table REQUEST
add foreign key (PATIENT_ID) references PATIENT(ID)
on delete cascade;

alter table REQUEST
add foreign key (DOCTOR_ID) references DOCTOR(ID)
on delete cascade;

alter table ACCOUNT
add foreign key (PATIENT_ID) references PATIENT(ID)
on delete cascade;

alter table ACCOUNT
add foreign key (DOCTOR_ID) references DOCTOR(ID)
on delete cascade;

-- insert values
insert into DISEASE (NAME)
values	("Influenza"),
		("Stomach aches"),
        ("Heart disease"),
        ("Asthma"),
        ("Cancer"),
        ("Scleroderma"),
        ("Celiac disease"),
        ("Lupus"),
        ("COVID-19"),
        ("Syphillis"),
        ("CRE"),
        ("Mumps"),
        ("Chicken pox"),
        ("Leptospirosis"),
        ("MERS"),
        ("Cytisis"),
        ("Pharyngitis"),
        ("Folliculitis"),
        ("Hemorrhoids"),
        ("Osteoporosis");

insert into ROOM (NUMBER, TYPE) 
values	(400, "Operation Theaters"),
		(401, "Operation Theaters"),
        (402, "Operation Theaters"),
        (403, "Operation Theaters"),
		(404, "Operation Theaters"),
        (405, "Operation Theaters"),
        (406, "Operation Theaters"),
        (407, "Operation Theaters"),
        (408, "Operation Theaters"),
        (409, "Operation Theaters"),
        (410, "ICU"),
        (411, "ICU"),
        (412, "ICU"),
        (413, "ICU"),
        (414, "ICU"),
        (415, "ICU"),
        (416, "ICU"),
        (417, "ICU"),
        (418, "ICU"),
        (419, "ICU"),
        (420, "Clinic"),
        (421, "Clinic"),
        (422, "Clinic"),
        (423, "Clinic"),
        (424, "Clinic"),
        (425, "Clinic"),
        (426, "Clinic"),
        (427, "Clinic"),
        (428, "Clinic"),
        (429, "Clinic");
        
insert into TREATMENT (NAME) 
values 	("Surgery"),
		("Precision medicine"),
		("Physical therapy"),
        ("Laser"),
        ("Acupuncture"),
        ("Valence"),
        ("Radiotherapy"),
        ("Hypnotherapy"),
        ("Aromatherapy"),
        ("Acupressure"),
        ("Chiropractic"),
        ("Reflexology"),
        ("Ultrasound"),
        ("Glucosamin"),
        ("Yoga"),
        ("Reiki"),
        ("Podiatry"),
        ("Homeopathy"),
        ("Tumaric"),
        ("Heat therapy");

insert into DOCTOR (NAME, GENDER, DOB, PHONE) 
values	("DoctorA", "male", "1968-02-28", "0828 334 6871"),
		("DoctorB", "female", "1973-07-23", "0828 334 6872"),
		("DoctorC", "male", "1975-05-20", "0828 334 6873"),
        ("DoctorD", "female", "1980-03-01", "0828 334 6874"),
        ("DoctorE", "male", "1980-03-02", "0828 334 6875"),
        ("DoctorF", "female", "1980-03-03", "0828 334 6876"),
        ("DoctorG", "male", "1980-03-04", "0828 334 6877"),
        ("DoctorH", "female", "1980-03-05", "0828 334 6878"),
        ("DoctorI", "male", "1980-03-06", "0828 334 6879"),
        ("DoctorJ", "female", "1980-03-07", "0828 334 6870"),
        ("Quyn Wiley", "male", "1979-04-22", "01 92 86 29 37"),
        ("Neville Wise", "male", "1954-07-14", "05 78 11 36 70"),
        ("Dalton Bernard", "male", "1909-07-04", "09 08 09 59 51"),
        ("Marah Morris", "male", "1951-12-01", "08 04 99 38 97"),
        ("Quincy Sellers", "male", "1986-08-29", "08 62 49 34 31"),
        ("Amber Brock", "male", "1990-05-04", "02 26 95 03 71"),
        ("Jin Keller", "male", "2008-11-05", "06 85 94 20 40"),
        ("Nerea Summers", "male", "1912-10-31", "08 09 90 13 35"),
        ("Hillary Maldonado", "male", "1996-10-24", "02 63 89 43 13"),
        ("Patricia Luna", "male", "2004-06-28", "02 41 30 28 26"),
        ("Bert Dickson", "male", "1963-04-15", "08 08 05 96 29"),
        ("Zahir Kennedy", "male", "1950-01-28", "02 86 61 28 86"),
        ("Slade Shannon", "male", "2000-08-23", "07 15 66 12 35"),
        ("Armando Elliott", "male", "1991-06-03", "03 62 19 79 47"),
        ("Ivor Bruce", "male", "1967-07-07", "05 62 35 35 86"),
        ("Xaviera Nguyen", "male", "1978-06-10", "05 91 23 60 45"),
        ("Quamar Haley", "male", "1953-10-16", "03 22 35 40 95"),
        ("Yasir Blackburn", "male", "1970-09-26", "03 41 70 74 13"),
        ("Irma Randolph", "male", "1943-12-30", "08 65 14 62 44"),
        ("Aurelia Dillard", "male", "2008-12-29", "01 95 40 52 00"),
        ("Sophia Burris", "male", "1995-08-10", "05 92 62 36 80"),
        ("Isaac Rose", "male", "1965-07-30", "06 10 67 57 18"),
        ("Yoko Walton", "male", "1924-03-21", "04 42 21 14 28"),
        ("Holly Williams", "male", "1932-12-01", "06 18 83 47 47"),
        ("Ima Huff", "male", "2007-02-03", "04 10 51 75 85"),
        ("Cameron Stafford", "male", "1998-06-02", "01 49 67 46 43"),
        ("Uriah Colon", "male", "1947-02-14", "02 25 68 08 93"),
        ("Ivor Montgomery", "male", "1935-04-24", "06 84 93 21 22"),
        ("Janna Jackson", "male", "1930-01-27", "08 20 26 09 94"),
        ("Tad Foreman", "male", "1935-02-16", "08 46 93 26 35"),
        ("Portia Bolton", "male", "2008-09-18", "07 78 96 77 97"),
        ("Madonna Casey", "male", "1905-05-04", "07 53 45 23 65"),
        ("Althea Foley", "male", "1990-07-02", "03 79 83 55 35"),
        ("Sylvia Guerrero", "male", "2004-10-29", "03 11 20 86 04"),
        ("Callie Kelly", "male", "1980-05-11", "09 43 17 90 81"),
        ("Cameron Salinas", "male", "1967-04-18", "08 94 12 02 24"),
        ("Lois Beasley", "male", "1966-07-21", "07 41 33 98 75"),
        ("Buffy Christensen", "male", "1917-09-29", "09 54 36 35 21"),
        ("Jelani Warren", "male", "1960-07-13", "05 37 93 54 44"),
        ("Astra Kelly", "male", "1975-09-13", "04 94 38 72 12"),
        ("Demetrius Clark", "male", "1959-10-19", "06 90 43 64 27"),
        ("Marsden Salas", "male", "1921-09-10", "04 80 51 02 27"),
        ("Katelyn Ballard", "male", "1948-11-25", "08 18 98 49 24"),
        ("Arden Gonzales", "male", "2005-04-11", "02 28 31 50 04"),
        ("Penelope Love", "male", "1947-11-29", "09 90 29 02 99"),
        ("Amela Bennett", "male", "1971-10-10", "02 62 77 12 10"),
        ("Robin Clemons", "male", "1971-02-26", "03 04 61 45 34"),
        ("Hashim Bell", "male", "1926-03-26", "02 39 13 52 02"),
        ("Knox Brock", "male", "1973-10-24", "03 55 93 21 46"),
        ("Gavin Pacheco", "male", "1980-09-19", "04 41 41 18 3");

        
insert into PATIENT (NAME, GENDER, DOB, PHONE, DOCTOR_ID)
values	("patientA", "male", "2000-05-11", "0912345678", 1),
		("patientB", "female", "2000-05-12", "0912456780", 2),
		("patientC", "male", "2000-05-13", "0111245694", 3),
        ("patientD", "female", "2000-05-14", "094546487", 4),
        ("patientE", "male", "2000-05-15", "0456789789", 5),
        ("patientF", "male", "2000-05-16", "0987161456", 6),
        ("patientG", "male", "2000-05-17", "0987456456", 7),
        ("patientI", "male", "2000-05-18", "0546123458", 8),
        ("patientJ", "male", "2000-05-19", "0546123458", 9),
        ("patientK", "male", "2000-05-20", "0546123458", 10),
        ("Quyn Wiley", "male", "1979-04-22", "01 92 86 29 37", 1),
        ("Neville Wise", "male", "1954-07-14", "05 78 11 36 70", 2),
        ("Dalton Bernard", "male", "1909-07-04", "09 08 09 59 51", 3),
        ("Marah Morris", "male", "1951-12-01", "08 04 99 38 97", 4),
        ("Quincy Sellers", "male", "1986-08-29", "08 62 49 34 31", 5),
        ("Amber Brock", "male", "1990-05-04", "02 26 95 03 71", 6),
        ("Jin Keller", "male", "2008-11-05", "06 85 94 20 40", 7),
        ("Nerea Summers", "male", "1912-10-31", "08 09 90 13 35", 8),
        ("Hillary Maldonado", "male", "1996-10-24", "02 63 89 43 13", 9),
        ("Patricia Luna", "male", "2004-06-28", "02 41 30 28 26", 10),
        ("Bert Dickson", "male", "1963-04-15", "08 08 05 96 29", 1),
        ("Zahir Kennedy", "male", "1950-01-28", "02 86 61 28 86", 2),
        ("Slade Shannon", "male", "2000-08-23", "07 15 66 12 35", 3),
        ("Armando Elliott", "male", "1991-06-03", "03 62 19 79 47", 4),
        ("Ivor Bruce", "male", "1967-07-07", "05 62 35 35 86", 5),
        ("Xaviera Nguyen", "male", "1978-06-10", "05 91 23 60 45", 6),
        ("Quamar Haley", "male", "1953-10-16", "03 22 35 40 95", 7),
        ("Yasir Blackburn", "male", "1970-09-26", "03 41 70 74 13", 8),
        ("Irma Randolph", "male", "1943-12-30", "08 65 14 62 44", 9),
        ("Aurelia Dillard", "male", "2008-12-29", "01 95 40 52 00", 10),
        ("Sophia Burris", "male", "1995-08-10", "05 92 62 36 80", 1),
        ("Isaac Rose", "male", "1965-07-30", "06 10 67 57 18", 2),
        ("Yoko Walton", "male", "1924-03-21", "04 42 21 14 28", 3),
        ("Holly Williams", "male", "1932-12-01", "06 18 83 47 47", 4),
        ("Ima Huff", "male", "2007-02-03", "04 10 51 75 85", 5),
        ("Cameron Stafford", "male", "1998-06-02", "01 49 67 46 43", 6),
        ("Uriah Colon", "male", "1947-02-14", "02 25 68 08 93", 7),
        ("Ivor Montgomery", "male", "1935-04-24", "06 84 93 21 22", 8),
        ("Janna Jackson", "male", "1930-01-27", "08 20 26 09 94", 9),
        ("Tad Foreman", "male", "1935-02-16", "08 46 93 26 35", 10),
        ("Portia Bolton", "male", "2008-09-18", "07 78 96 77 97", 1),
        ("Madonna Casey", "male", "1905-05-04", "07 53 45 23 65", 2),
        ("Althea Foley", "male", "1990-07-02", "03 79 83 55 35", 3),
        ("Sylvia Guerrero", "male", "2004-10-29", "03 11 20 86 04", 4),
        ("Callie Kelly", "male", "1980-05-11", "09 43 17 90 81", 5),
        ("Cameron Salinas", "male", "1967-04-18", "08 94 12 02 24", 6),
        ("Lois Beasley", "male", "1966-07-21", "07 41 33 98 75", 7),
        ("Buffy Christensen", "male", "1917-09-29", "09 54 36 35 21", 8),
        ("Jelani Warren", "male", "1960-07-13", "05 37 93 54 44", 9),
        ("Astra Kelly", "male", "1975-09-13", "04 94 38 72 12", 10),
        ("Demetrius Clark", "male", "1959-10-19", "06 90 43 64 27", 1),
        ("Marsden Salas", "male", "1921-09-10", "04 80 51 02 27", 2),
        ("Katelyn Ballard", "male", "1948-11-25", "08 18 98 49 24", 3),
        ("Arden Gonzales", "male", "2005-04-11", "02 28 31 50 04", 4),
        ("Penelope Love", "male", "1947-11-29", "09 90 29 02 99", 5),
        ("Amela Bennett", "male", "1971-10-10", "02 62 77 12 10", 6),
        ("Robin Clemons", "male", "1971-02-26", "03 04 61 45 34", 7),
        ("Hashim Bell", "male", "1926-03-26", "02 39 13 52 02", 8),
        ("Knox Brock", "male", "1973-10-24", "03 55 93 21 46", 9),
        ("Gavin Pacheco", "male", "1980-09-19", "04 41 41 18 3", 10);
        
        

insert into ACCOUNT (USERNAME, PASSWORD, ROLE, PATIENT_ID, DOCTOR_ID)
values 	
        ("patient1", "8103cfda42d725cd38e8bdf9610ef9a6", "patient", 1, NULL),
		("patient2", "3d47080f1445cd844c3390b15c835ffa", "patient", 2, NULL),
		("patient3", "03ede2bfbf54e1352444d524f782ae74", "patient", 3, NULL),
        ("patient4", "9bac701f330431c4de52e835b8ebf661", "patient", 4, NULL),
        ("patient5", "ec151e9561bbc6ba4f8540a3c4809649", "patient", 5, NULL),
        ("patient6", "8b1f58ddb0e7e78aadd0935755ed5d29", "patient", 6, NULL),
        ("patient7", "19c44a8fe7fa92e76dbb6dc8b7c47fa4", "patient", 7, NULL),
        ("patient8", "f9804cd7de27965fc4661413e37dd1d4", "patient", 8, NULL),
        ("patient9", "1a9ec31e5f15f9fbe25ef46d6848b5c3", "patient", 9, NULL),
        ("patient10", "e0f4a27f4b70924553e4b5f91fb90831", "patient", 10, NULL),
        ("doctor1", "45f678b147fdf275c35b60bac2360984", "doctor", NULL, 1),
        ("doctor2", "3b02a6fdd669efe9083cc84d15e5699b", "doctor", NULL, 2),
        ("doctor3", "c5771df124ed6073ae4e2d09b2b20ac0", "doctor", NULL, 3),
        ("doctor4", "d9dd5a031723455173d4336914b17f2b", "doctor", NULL, 4),
        ("doctor5", "83b8e9d7a4fa853010993f6dd6ff55a9", "doctor", NULL, 5),
        ("doctor6", "892eb7c3d25846caee80d4f37746b6b4", "doctor", NULL, 6),
        ("doctor7", "ca9c3082cf0586332e55fa8bde3719f1", "doctor", NULL, 7),
        ("doctor8", "ecef1f4d730a0b2678679c040bddee73", "doctor", NULL, 8),
        ("doctor9", "275ad067100e925d3adeea3873654a53", "doctor", NULL, 9),
        ("doctor10", "a70dfd781bcf5ff759341d3155c52158", "doctor", NULL, 10),
        ("tdtri", "85e9d19ab4b4c88cbd3db849f1268828", "admin", NULL, NULL),
        ("phnanh", "ee4c34240639c2705024067ec2718f45", "admin", NULL, NULL),
        ("dnmhuy", "c05ddc2512a5cc718e434194e74e1b4a", "admin", NULL, NULL);

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
