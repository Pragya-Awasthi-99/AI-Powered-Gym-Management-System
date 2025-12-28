import api from "./api";

export const getAssignedUsers = () =>
  api.get("/trainer/users");
