CREATE TABLE users(
    id serial not null primary key,
    first_name text,
    last_name text,
    email text 
);
CREATE TABLE catagories (
    id serial not null primary key,
    expenses text not null
    
);

INSERT INTO catagories (expenses) VALUES ('food');
INSERT INTO catagories (expenses) VALUES ('toiletries');
INSERT INTO catagories (expenses) VALUES ('travel');
INSERT INTO catagories (expenses) VALUES ('communication');


create table expenses (
    id serial not null primary key,
    users_id INTEGER ,
    catagories_id INTEGER,
    amount INTEGER ,
    dates date ,
    FOREIGN KEY (users_id) REFERENCES users (id),
    FOREIGN KEY (catagories_id) REFERENCES catagories (id)
);

INSERT INTO users (first_name,last_name,email) VALUES ('YANGA','SIQIKI','YANGASIQIKI@GMAIL.COM')
