import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { Line } from "rc-progress";

const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseTime, navigate } = useContext(AppContext);
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
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">My Learning Journey</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden">
              <img
                src={course.courseThumbnail}
                alt="Course"
                className="w-full h-48 object-cover"
              />
              
              <div className="p-4">
                <h3 className="font-medium text-lg mb-2">{course.courseTitle}</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>
                        {progressArray[index] &&
                          `${progressArray[index].lectureCompleted}/${progressArray[index].totalLectures} Lectures`}
                      </span>
                    </div>
                    <Line
                      percent={
                        progressArray[index]
                          ? (progressArray[index].lectureCompleted * 100) /
                            progressArray[index].totalLectures
                          : 0
                      }
                      strokeWidth={2}
                      strokeColor="#3b82f6"
                      trailColor="#e5e7eb"
                      className="rounded-full"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {calculateCourseTime(course)}
                    </span>
                    <button
                      onClick={() => navigate("/player/" + course._id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium text-white ${
                        progressArray[index]?.lectureCompleted === progressArray[index]?.totalLectures
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                    >
                      {progressArray[index]?.lectureCompleted === progressArray[index]?.totalLectures
                        ? "Review"
                        : "Resume"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyEnrollments;