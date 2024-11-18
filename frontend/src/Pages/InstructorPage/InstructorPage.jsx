import React, { useState } from "react";
import { BarChart, GraduationCap, LogOut, UserCircle } from "lucide-react";
import InstructorDashboard from "@/components/Instructor/InstructorDashboard";
import InstructorCourse from "@/components/Instructor/InstructorCourse/InstructorCourse";
import InstructorStudent from "@/components/Instructor/InstructorStudent/InstructorStudent";
import InstructorAssignments from "@/components/Instructor/InstructorAssignments/InstructorAssignments";
import InstructorAssesments from "@/components/Instructor/InstructorAssesments/InstructorAssesments";
import InstructorGrades from "@/components/Instructor/InstructorGrades/InstructorGrades";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";

function InstructorPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const menuItems = [
    {
      Icon: BarChart,
      Label: "Dashboard",
      value: "dashboard",
      Component: <InstructorDashboard />,
    },
    {
      Icon: GraduationCap,
      Label: "Courses",
      value: "courses",
      Component: <InstructorCourse />,
    },
    {
      Icon: UserCircle,
      Label: "Students",
      value: "students",
      Component: <InstructorStudent />,
    },
    {
      Icon: GraduationCap,
      Label: "Assignments",
      value: "assignments",
      Component: <InstructorAssignments />,
    },
    {
      Icon: GraduationCap,
      Label: "Grades",
      value: "grades",
      Component: <InstructorGrades />,
    },
    {
      Icon: BarChart,
      Label: "Assesments",
      value: "assesments",
      Component: <InstructorAssesments />,
    },
    {
      Icon: LogOut,
      Label: "Logout",
      value: "logout",
      Component: null,
    },
  ];

  function handleLogout() {}

  return (
    <div className="flex h-full min-h-screen bg-gray-100">
      <aside className="w-64 shadow-md flex flex-col items-start p-4 bg-white">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <nav>
          {menuItems.map((item) => (
            <Button
              key={item.value}
              className="w-full justify-start mb-4"
              onClick={
                item.value === "logout"
                  ? handleLogout
                  : () => setActiveTab(item.value)
              }
            >
              <item.Icon className="w-6 h-6" />
              <span className="ml-4">{item.Label}</span>
            </Button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 mt-4 ">
            Instructor Dashboard
          </h1>
          <Tabs value={activeTab} onChange={setActiveTab}>
            {menuItems.map(
              (item) =>
                item.Component !== null && (
                  <TabsContent key={item.value} value={item.value}>
                    {item.Component}
                  </TabsContent>
                ),
            )}
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default InstructorPage;
