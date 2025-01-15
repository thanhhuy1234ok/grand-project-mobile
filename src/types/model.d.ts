export {};

declare global {
  export interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }

  interface IUserLogin {
    access_token: string;
    user: IUser;
  }
  interface IUser {
    id: string | number;
    email: string;
    name: string;
    avatar: string;
    role?: {
      id: string | number;
      name: string;
    };
  }

  interface IFetchAccount {
    user: IUser;
  }

  interface ISchedule {
    id: number;
    daysOfWeek: IDayOfWeek[];
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    room: IRoom;
    subject: ISubject;
    teacher: IUser;
    class: IClass;
    semester: ISemester;
  }

  interface ISubject {
    id?: number | string;
    name?: string;
    code: string;
    credits: number;
    type: string;
    schedules: ISchedule;
  }

  interface IDayOfWeek {
    id: number;
    name: string;
  }

  interface ICohort {
    id?: number | string;
    startYear?: number;
    endYear?: number;
  }

  interface IMajor {
    id?: number | string;
    name?: string;
    code: string;
  }

  interface IRoom {
    id?: number | string;
    name?: string;
    capacity?: number;
  }

  interface IClass {
    id?: number | string;
    name?: string;
    maxCapacity: number;
    students: IUserTable[];
  }

  interface ISemester {
    id?: number | string;
    name?: string;
    startDate: Date;
    endDate: Date;
    isMainSemester: boolean;
    minCredits?: number;
    maxCredits?: number;
    status: number;
    cohort?: ICohort;
  }
  interface IUserTable {
    id: string | number;
    name: string;
    email: string;
    date_of_birth: Date;
    gender: string;
    phone: string;
    address: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    role: IRole;
    major: IMajor;
    class: IClass;
    yearOfAdmission?: ICohort;
    scores: IScore[];
  }

  interface IScore {
    id: number;
    attendanceScore: float;
    midtermScore: float;
    finalScore: float;
    subject?: ISubject;
    semesters: ISemester;
  }

  interface IScoreSemester {
    id: number | string;
    semesterName: string;
    scores: IScore[];
  }

  interface IScanAttendance {
    qrData: IQRData;
    studentId: number;
  }

  interface IQRData {
    scheduleId: string;
    date: string;
  }

    interface IForgotPassword {
      code: string;
      password: string;
      confirmPassword: string;
    }
  interface IChangePassword {
    code: string;
    oldPassword?: string;
    password?: string;
    confirmPassword?: string;
  }

  interface IVerifyPageProps {
    oldPassword: string;
    password: string;
    confirmPassword: string;
  }

  interface IScore {
    id: number;
    attendanceScore: float;
    midtermScore: float;
    finalScore: float;
    subject?: ISubject;
    semesters: ISemester;
  }
  interface IScoreSemester {
      id: number | string;
      semesterName: string;
      scores: IScore[];
  }
}
