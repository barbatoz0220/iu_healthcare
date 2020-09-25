create schema hms;
use hms;
create table Patient (
	ID int not null auto_increment,
    NAME varchar(100) not null,
    DOCTOR_ID int not null,
    DISEASE_ID int not null,
    ROOM_ID int not null,
    primary key (ID)
);

create table Doctor (
	ID int not null auto_increment,
    NAME varchar(100) not null,
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

alter table Patient
add foreign key (DOCTOR_ID) references Doctor(ID);

alter table Patient
add foreign key (DISEASE_ID) references Disease(ID);

alter table Patient
add foreign key (ROOM_ID) references Room(ID);

insert into Room (NUMBER, TYPE)
values 	(100, "ICU"), 
		(101, "ICU"),
		(102, "ICU"),
        (103, "OT"),
        (104, "OT");

insert into Disease (NAME)
values ("Fever"), ("Sore throat"), ("Headache");

insert into Doctor (NAME)
values ("David"), ("Divine");

insert into Patient (NAME, DOCTOR_ID, DISEASE_ID, ROOM_ID)
values 	("Paul", 1, 1, 1),
		("Pull", 1, 2, 2),
        ("Pool", 1, 3, 3),
        ("Pick", 2, 2, 4),
        ("Peli", 2, 1, 5);

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `PID` int not null
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `accounts` (`id`, `username`, `password`, `email`, `PID`) VALUES (1, 'test', 'test', 'test@test.com', 3);

ALTER TABLE `accounts` ADD PRIMARY KEY (`id`);
ALTER TABLE `accounts` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
alter table `accounts` add foreign key (PID) references Patient(ID);