import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { Line } from "rc-progress";

const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseTime, navigate } =
    useContext(AppContext);
  const [progressArray, setProgressArray] = useState([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 1, totalLectures: 5 },
    { lectureCompleted: 3, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 3 },
    { lectureCompleted: 5, totalLectures: 7 },
    { lectureCompleted: 6, totalLectures: 8 },
    { lectureCompleted: 2, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 10 },
    { lectureCompleted: 3, totalLectures: 5 },
    { lectureCompleted: 7, totalLectures: 7 },
    { lectureCompleted: 1, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 2 },
    { lectureCompleted: 5, totalLectures: 5 },
  ]);
  return (
    <div className="md:px-36 px-6 pt-10">
      <h1 className="text-3xl font-semibold text-gray-900">My Enrollments</h1>
      <div className="overflow-x-auto mt-8">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-200 text-gray-900 text-sm">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Course</th>
              <th className="px-6 py-4 text-left font-semibold">Duration</th>
              <th className="px-6 py-4 text-left font-semibold">Completed</th>
              <th className="px-6 py-4 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {enrolledCourses.map((course, index) => (
              <tr key={index} className="hover:bg-gray-100">
                {/* Course Thumbnail and Title */}
                <td className="px-6 py-4 flex items-center gap-4">
                  <img
                    src={course.courseThumbnail}
                    alt="Course Thumbnail"
                    className="w-16 sm:w-20 md:w-24 border"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="font-medium text-gray-800">
                      {course.courseTitle}
                    </p>

                    <Line
                          percent={
                            progressArray[index]
                              ? (progressArray[index].lectureCompleted * 100) /
                                progressArray[index].totalLectures
                              : 0
                          }
                          strokeWidth={2}
                          strokeColor="#2563eb"
                          trailColor="#e5e7eb"
                        />
                  </div>
                </td>

                {/* Course Duration */}
                <td className="px-6 py-4 text-gray-700">
                  {calculateCourseTime(course)}
                </td>

                {/* Completed Lectures */}
                <td className="px-6 py-4 text-gray-700">
                  {progressArray[index] &&
                    `${progressArray[index].lectureCompleted}/${progressArray[index].totalLectures}`}
                  <span className="text-sm">Lectures</span>
                </td>

                {/* Course Status */}
                <td className="px-6 py-4">
                  <button
                    className={`px-4 py-2 rounded-sm text-sm font-semibold items-center text-white ${
                      progressArray[index] &&
                      progressArray[index].lectureCompleted /
                        progressArray[index].totalLectures ===
                        1
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                    onClick={() => navigate("/player/" + course._id)}
                  >
                    {progressArray[index] &&
                    progressArray[index].lectureCompleted /
                      progressArray[index].totalLectures ===
                      1
                      ? "Completed"
                      : "Ongoing"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEnrollments;
