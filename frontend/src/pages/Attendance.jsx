import { useState, useEffect } from "react";
import { markAttendance, getMyAttendance } from "../services/attendance";

const Attendance = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [marking, setMarking] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch attendance list on component mount
  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getMyAttendance();
      setAttendanceList(response.data.attendance || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch attendance records"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAttendance = async () => {
    setMarking(true);
    setError("");
    setSuccess("");
    try {
      const response = await markAttendance();
      setSuccess(response.data.message || "Attendance marked successfully!");
      // Refresh the attendance list
      await fetchAttendance();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to mark attendance"
      );
    } finally {
      setMarking(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Check if today's attendance is already marked
  const isTodayMarked = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return attendanceList.some((record) => {
      const recordDate = new Date(record.date);
      recordDate.setHours(0, 0, 0, 0);
      return recordDate.getTime() === today.getTime();
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Attendance
            </h1>
            <p className="text-gray-600">
              Track your gym attendance and view your history
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-400 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-green-700">{success}</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 text-red-400 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Mark Attendance Button */}
          <div className="mb-8">
            <button
              onClick={handleMarkAttendance}
              disabled={marking || isTodayMarked()}
              className={`w-full sm:w-auto px-8 py-3 rounded-lg font-semibold text-white transition duration-150 ease-in-out transform ${
                isTodayMarked()
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              } ${marking ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {marking ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Marking...
                </span>
              ) : isTodayMarked() ? (
                "Attendance Already Marked for Today"
              ) : (
                "Mark Attendance"
              )}
            </button>
          </div>

          {/* Attendance List */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Attendance History
            </h2>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <svg
                  className="animate-spin h-8 w-8 text-purple-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            ) : attendanceList.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
                <p className="text-gray-500 text-lg">
                  No attendance records found
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Mark your attendance to see your history here
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {attendanceList.map((record, index) => {
                  const isToday = (() => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const recordDate = new Date(record.date);
                    recordDate.setHours(0, 0, 0, 0);
                    return recordDate.getTime() === today.getTime();
                  })();

                  return (
                    <div
                      key={record.id || index}
                      className={`flex items-center justify-between p-4 rounded-lg border-2 transition duration-150 ${
                        isToday
                          ? "bg-purple-50 border-purple-300 shadow-md"
                          : "bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                            isToday
                              ? "bg-purple-600 text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-lg font-medium text-gray-900">
                            {formatDate(record.date)}
                          </p>
                          {isToday && (
                            <p className="text-sm text-purple-600 font-medium">
                              Today
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Stats */}
          {attendanceList.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Statistics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-600">
                      {attendanceList.length}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Total Attendance
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">
                      {attendanceList.filter((record) => {
                        const recordDate = new Date(record.date);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        recordDate.setHours(0, 0, 0, 0);
                        return (
                          recordDate.getTime() >=
                          today.getTime() - 7 * 24 * 60 * 60 * 1000
                        );
                      }).length}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">This Week</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">
                      {attendanceList.filter((record) => {
                        const recordDate = new Date(record.date);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        recordDate.setHours(0, 0, 0, 0);
                        return (
                          recordDate.getTime() >=
                          today.getTime() - 30 * 24 * 60 * 60 * 1000
                        );
                      }).length}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">This Month</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;

