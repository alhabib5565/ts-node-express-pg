import pool from '../../config/database';

const createStudentCourse = (student_id: string, course_id: number) => {
  const query = `
        INSERT INTO student_courses (student_id, course_id)
        VALUES ($1, $2)
        RETURNING *
    `;
  return pool.query(query, [student_id, course_id]);
};

export const studentCoursesRepository = { createStudentCourse };
