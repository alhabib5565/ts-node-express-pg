CREATE TABLE IF NOT EXISTS student_courses (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    enrolled_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_student_courses_student_id_users FOREIGN KEY (student_id) REFERENCES users (id) ON DELETE SET NULL,
    CONSTRAINT fk_student_courses_course_id_courses FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE SET NULL,
    CONSTRAINT unique_student_course UNIQUE (student_id, course_id)
);