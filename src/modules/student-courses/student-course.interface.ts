import { ICourse } from '../course/course.interface';
import { IUser } from '../user/user.interface';

export interface StudentCourse {
  id: number;
  student_id: number;
  course_id: number;
  enrolled_at: string;

  student?: IUser;
  course?: ICourse;
}
