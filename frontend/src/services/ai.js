import api from "./api";

export const getDashboardInsight = () =>
  api.get("/ai/dashboard-insight");
