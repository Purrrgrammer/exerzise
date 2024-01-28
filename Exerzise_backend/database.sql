CREATE TABLE Users (
user_id VARCHAR(200) NOT NULL PRIMARY key UNIQUE,
username VARCHAR(200),
password VARCHAR(200),
first_name VARCHAR(200),
last_name VARCHAR(200),
role VARCHAR(200),
detail TEXT,
user_image TEXT,
phone_number VARCHAR(200));


CREATE TABLE Coachtime (
time_id VARCHAR(200) NOT NULL PRIMARY key UNIQUE,
date VARCHAR(200),
time VARCHAR(200),
price VARCHAR(200),
user_id VARCHAR(200) REFERENCES users(user_id)
);


CREATE TABLE Bookings(
activity_id VARCHAR(200) PRIMARY key UNIQUE NOT NULL,
date VARCHAR(200),
time VARCHAR(200),
price VARCHAR(200), 
user_status VARCHAR(200),
coach_status VARCHAR(200),
rating VARCHAR(200),
comment TEXT,
payment text,
user_id VARCHAR(200) REFERENCES users(user_id),
coach_id VARCHAR(200) REFERENCES users(user_id)
);


CREATE TABLE BLOG (
blog_id VARCHAR(200) PRIMARY KEY UNIQUE NOT NULL,
author_id VARCHAR(200) REFERENCES users(user_id),
content TEXT,
likes INT,
create_date VARCHAR(200) ,
update_date VARCHAR(200)
)




