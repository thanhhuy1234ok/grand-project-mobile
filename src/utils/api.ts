import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "./axios.customize";

export const LoginAPI = (username: string, password: string) => {
  const urlBackend = "/api/v1/auth/login";
  return axios.post<IBackendRes<IUserLogin>>(urlBackend, {
    username,
    password,
  });
};
export const getAccountAPI = () => {
  const urlBackend = "/api/v1/auth/account";
  return axios.get<IBackendRes<IFetchAccount>>(urlBackend);
};

export const getScheduleTimeTableTeacherAPI = () => {
  const urlBackend = "/api/v1/schedule/time-table";
  return axios.get<IBackendRes<ISchedule[]>>(urlBackend);
};
export const getScheduleTimeTableStudentAPI = () => {
  const urlBackend = "/api/v1/schedule/time-table-student";
  return axios.get<IBackendRes<ISchedule[]>>(urlBackend);
};

export const detailUserAPI = (id: number) => {
  const urlBackend = `/api/v1/users/${id}`;
  return axios.get<IBackendRes<IUserTable>>(urlBackend);
};

export const scanAttendanceStudentAPI = (qrData: any) => {
  const urlBackend = "/api/v1/attendance/scan";
  return axios.post<IBackendRes<IScanAttendance>>(urlBackend, { qrData });
};


export const resendCodeAPI = (email: any) => {
  const urlBackend = "/api/v1/auth/retry-password";
  return axios.post<IBackendRes<string>>(urlBackend, {
    email,
  });
};

export const callForgotPassword = (data: IForgotPassword,email:string) => {
  const urlBackend = "/api/v1/auth/forgot-password";
  return axios.post<IBackendRes<string>>(urlBackend, {
    ...data,
    email,
  });
};

export const callChangePassword = (data: IChangePassword) => {
  const urlBackend = "/api/v1/auth/change-password";
  return axios.post<IBackendRes<IChangePassword>>(urlBackend, {
    ...data,
  });
}


export const printAsyncStorage = () => {
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys!, (error, stores) => {
      let asyncStorage: any = {};
      stores?.map((result, i, store) => {
        asyncStorage[store[i][0]] = store[i][1];
      });
      console.log(JSON.stringify(asyncStorage, null, 2));
    });
  });
};

export const showAllListScoreStudentAPI = () => {
  const urlBackend = "/api/v1/semester/score-student";
  return axios.get<IBackendRes<IScoreSemester[]>>(urlBackend);
};

