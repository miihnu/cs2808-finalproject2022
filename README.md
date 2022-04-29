# cs2808-finalproject2022

// MySQL Statement to create the appropriate table:
create table users (
    -> username varchar(16) primary key not null,
    -> password varchar(128) not null,
    -> highscore int,
    -> quote varchar(512));
