import React from "react";

function StudentHomePage() {
  return (
    <div>
      <div>
        <h1>Welcome to the Student Home Page</h1>
        <p>This is where you can find all your course materials and updates.</p>
      </div>

      <div>
        <h2>Your Courses</h2>
        <ul>
          <li>Course 1: Introduction to Programming</li>
          <li>Course 2: Data Structures and Algorithms</li>
          <li>Course 3: Web Development</li>
          <li>Course 4: Database Management</li>
        </ul>
      </div>
      <div>
        <h2>Upcoming Assignments</h2>
        <ul>
          <li>Assignment 1: Due on 10/10/2023</li>
          <li>Assignment 2: Due on 10/17/2023</li>
          <li>Assignment 3: Due on 10/24/2023</li>
        </ul>
      </div>
      <div>
        <h2>Recent Announcements</h2>
        <ul>
          <li>Announcement 1: New course materials available</li>
          <li>Announcement 2: Midterm exam schedule released</li>
          <li>Announcement 3: Guest lecture on 10/15/2023</li>
        </ul>
      </div>
    </div>
  );
}

export default StudentHomePage;
