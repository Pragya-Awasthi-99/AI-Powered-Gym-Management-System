export function adaptUserDashboardStats(apiData) {
    return {
      attendance: apiData?.attendance ?? "0%",
      streak: apiData?.streak ?? "0 Days",
      calories: apiData?.calories ?? "0 kcal",
      workouts: apiData?.workouts ?? "0",
    };
  }
  