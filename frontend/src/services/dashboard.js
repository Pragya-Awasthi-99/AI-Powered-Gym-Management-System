import api from "./api";

export const getUserDashboardStats = () =>
  api.get("/dashboard/user");

export const getTrainerDashboardStats = () =>
    api.get("/dashboard/trainer");
  
  export const getAdminDashboardStats = () =>
    api.get("/dashboard/admin");
  