create schema hms;
use hms;
create table Patient (
	ID int not null auto_increment,
    NAME varchar(100) not null,
    DOCTOR_ID int not null,
    DISEASE_ID int not null,
    ROOM_ID int not null,
    accid int(11),
    primary key (ID)
   
);

create table Doctor (
	ID int not null auto_increment,
    NAME varchar(100) not null,
	accid int(11),
    primary key (ID)
);

create table Disease (
	ID int not null auto_increment,
    NAME varchar(100),
    primary key (ID)
);

create table Room (
	ID int not null auto_increment,
    NUMBER int not null,
    TYPE varchar(100) not null,
    primary key (ID)
);

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `Role` varchar(255) NOT NULL,
  primary key (id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

alter table Patient
add foreign key (accid) references accounts(id);

alter table Doctor
add foreign key (accid) references accounts(id);

alter table Patient
add foreign key (DOCTOR_ID) references Doctor(ID);

alter table Patient
add foreign key (DISEASE_ID) references Disease(ID);

alter table Patient
add foreign key (ROOM_ID) references Room(ID);

INSERT INTO `accounts` (`id`, `username`, `password`, `Role`) VALUES (1, 'test', 'test', 'Patient');
INSERT INTO `accounts` (`id`, `username`, `password`, `Role`) VALUES (2, 'test2', 'test2', 'Doctor');

insert into Room (NUMBER, TYPE)
values 	(100, "ICU"), 
		(101, "ICU"),
		(102, "ICU"),
        (103, "OT"),
        (104, "OT");

insert into Disease (NAME)
values ("Fever"), ("Sore throat"), ("Headache");

insert into Doctor (NAME)
values ("David");

insert into Doctor(NAME, accid)
values ("Beckham", 2);

insert into Patient (NAME, DOCTOR_ID, DISEASE_ID, ROOM_ID, accid)
values 	("Paul", 1, 1, 1, 1);

insert into Patient (NAME, DOCTOR_ID, DISEASE_ID, ROOM_ID)
values  ("Pull", 1, 2, 2),
        ("Pool", 1, 3, 3),
        ("Pick", 2, 2, 4),
        ("Peli", 2, 1, 5);

