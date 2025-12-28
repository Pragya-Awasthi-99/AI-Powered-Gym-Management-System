import api from "./api";

export const markAttendance = () => api.post("/attendance/mark");

export const getMyAttendance = () => api.get("/attendance/me");
