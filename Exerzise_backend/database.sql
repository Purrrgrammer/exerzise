CREATE TABLE Users (user_id VARCHAR(200) NOT NULL PRIMARY key UNIQUE,username VARCHAR(200),password VARCHAR(200),first_name VARCHAR(200),last_name VARCHAR(200),role VARCHAR(200),detail TEXT,user_image TEXT,session VARCHAR(200),phone_number VARCHAR(200));


CREATE TABLE Coachtime (time_id VARCHAR(200) NOT NULL PRIMARY key UNIQUE,date VARCHAR(200),time VARCHAR(200),price VARCHAR(200),endofavailable_time VARCHAR(200),available_time VARCHAR(200),day INT,user_id VARCHAR(200) REFERENCES users(user_id));

CREATE TABLE Bookings(booking_id VARCHAR(200) PRIMARY key UNIQUE NOT NULL,date VARCHAR(200),time VARCHAR(200),price VARCHAR(200), user_status VARCHAR(200),coach_status VARCHAR(200),rating VARCHAR(200),comment TEXT,payment text,session VARCHAR(200),time_from VARCHAR(200),time_to VARCHAR(200),typetime VARCHAR(200),coach_phonenumber VARCHAR(200),user_phonenumber VARCHAR(200),day INT,user_id VARCHAR(200) REFERENCES users(user_id),coach_id VARCHAR(200) REFERENCES users(user_id));

CREATE TABLE Blogs(blog_id VARCHAR(200) PRIMARY KEY UNIQUE NOT NULL,content TEXT,likes INT,create_date VARCHAR(200),update_date VARCHAR(200),author_id VARCHAR(200) REFERENCES users(user_id));




