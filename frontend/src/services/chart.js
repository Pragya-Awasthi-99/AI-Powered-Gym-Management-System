import axios from "../utils/axios"; // axios instance

export const getUserChartData = async () => {
  return axios.get("/dashboard/charts");
};
