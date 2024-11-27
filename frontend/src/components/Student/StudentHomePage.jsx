import React from "react";
import { useNavigate } from "react-router-dom";

function StudentHomePage() {
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      title: "Web Development Bootcamp",
      instructor: "Jane Doe",
      price: "$200",
      image: "https://images.unsplash.com/photo-1622838320004-4b3b3b3b3b3b",
    },
    {
      id: 2,
      title: "Introduction to Data Science",
      instructor: "John Smith",
      price: "$150",
      image: "https://images.unsplash.com/photo-1617191516005-fd8e2f103e6d",
    },
    {
      id: 3,
      title: "Advanced UI/UX Design",
      instructor: "Alice Johnson",
      price: "$180",
      image: "https://images.unsplash.com/photo-1610986605341-df4488c344fb",
    },
    // Add more courses as needed
  ];

  const handleCardClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        All Courses Available
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course.id}
              onClick={() => handleCardClick(course.id)}
              className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg cursor-pointer transition"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {course.title}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  Created By:{" "}
                  <span className="font-medium text-gray-700">
                    {course.instructor}
                  </span>
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {course.price}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center">
            <h1 className="font-extrabold text-4xl">No Courses Found</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentHomePage;
