CREATE TABLE IF NOT EXISTS persons (
    person_id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('STUDENT', 'TEACHER')),
    password VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subjects (
    subject_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS classes (
    class_id SERIAL PRIMARY KEY,
    subject_id INT NOT NULL,
    teacher_id INT NOT NULL,
    academic_year INT NOT NULL,
    shift VARCHAR(50) NOT NULL CHECK (shift IN ('MORNING', 'AFTERNOON' , 'EVENING')),
    description VARCHAR(255) NOT NULL,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),
    FOREIGN KEY (teacher_id) REFERENCES persons(person_id)
);

CREATE TABLE IF NOT EXISTS enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    class_id INT NOT NULL,
    enrollment_date DATE NOT NULL,
    FOREIGN KEY (student_id) REFERENCES persons(person_id),
    FOREIGN KEY (class_id) REFERENCES classes(class_id)
);

CREATE TABLE IF NOT EXISTS grades (
    grade_id SERIAL PRIMARY KEY,
    enrollment_id INT NOT NULL,
    first_gradle DOUBLE PRECISION,
    second_gradle DOUBLE PRECISION,
    recuperation_gradle DOUBLE PRECISION,
    evaluation_date DATE NOT NULL,
    FOREIGN KEY (enrollment_id) REFERENCES enrollments(enrollment_id)
);

INSERT INTO PERSONS (full_name, first_name, last_name, username, email, role, password, birth_date)
VALUES ('Artur Silva', 'Artur', 'Silva', 'turzando', 'artur@gmail.com', 'STUDENT', '123', '2001-07-04');


INSERT INTO PERSONS (full_name, first_name, last_name, username, email, role, password, birth_date)
VALUES ('Tony Silva', 'Tony', 'Silva', 'tony2ponto0', 'tony@gmail.com', 'TEACHER', '123', '2001-07-04');
