import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "react-query";
import apiUrl from "@/lib/apiUrl";
import { useNavigate } from "react-router-dom";

function InstructorCourse() {
  const { data, isLoading, isError } = useQuery({
    queryKey: "courses",
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/get-all-courses`, {
        credentials: "include",
      });

      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      console.log(data);
      return data;
    },
  });

  const redirect = useNavigate();

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center mt-10">Error loading courses.</div>;
  }

  return (
    <Card className="shadow-lg rounded-lg">
      <CardHeader className="flex flex-col md:flex-row justify-between items-center p-6">
        <CardTitle className="text-2xl font-bold">All Courses</CardTitle>
        <Button
          className="mt-4 md:mt-0 p-3"
          onClick={() => {
            redirect("/instructor/courses/new");
          }}
        >
          Create new Course
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        <div className="overflow-x-auto">
          <Table className="table-auto w-full">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="p-4 text-left font-semibold">
                  Course Name
                </TableHead>
                <TableHead className="p-4 text-left font-semibold">
                  Revenue
                </TableHead>
                <TableHead className="p-4 text-left font-semibold">
                  Level
                </TableHead>
                <TableHead className="p-4 text-left font-semibold">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.courses.map((course) => (
                <TableRow key={course.id} className="border-b">
                  <TableCell className="p-4 font-medium">
                    {course.title}
                  </TableCell>
                  <TableCell className="p-4">{course.pricing}</TableCell>
                  <TableCell className="p-4">{course.level}</TableCell>
                  <TableCell className="p-4 flex space-x-3">
                    <Button className="p-3 bg-green-500">Edit</Button>
                    <Button className="p-2 bg-red-600">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}



export default InstructorCourse;
