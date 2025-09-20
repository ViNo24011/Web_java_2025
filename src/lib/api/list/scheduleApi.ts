import { apiClient } from "../config";

const getAllSchedule = (params: any) => {
  return apiClient.get("/schedule", params);
};

export { getAllSchedule };
