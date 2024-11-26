import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function SetAssignment() {
  //   // const [prompt, setPrompt] = useState("");
  //   // const [generatedQuestions, setGeneratedQuestions] = useState([]);
  //   // const [loading, setLoading] = useState(false);

  //   // const {} = useMutation({
  //   //   mutationFn: async (promptDetails) => {
  //   //     const response = await fetch(`${apiUrl}/openai`, {
  //   //       method: "POST",
  //   //       credentials: "include",
  //   //       headers: {
  //   //         "Content-Type": "application/json",
  //   //       },
  //   //       body: JSON.stringify(promptDetails),
  //   //     })
  //   //     if (response.ok === false) {
  //   //       const error = await response.json();
  //   //       throw new Error(error.message);
  //   //     }

  //   //     const data = await response.json();
  //   //     return data;
  //   //   },

  //   //   onSuccess: () => {
  //   //     setLoading(false);
  //   //   },
  //   //   onError: (error) => {
  //   //     setLoading(false);
  //   //     toast.error(error.message);
  //   //   }
  //   // })

  function handleRedirectToGenerateAssignment() {
    redirect("/instructor/assignment");
  }
  const redirect = useNavigate();
  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row justify-between items-center p-4">
        <CardTitle className="text-2xl font-bold">Modules Assignment</CardTitle>
        <Button
          className="mt-4 md:mt-0 p-3"
          onClick={handleRedirectToGenerateAssignment}
        >
          Create new Assignment
        </Button>
      </CardHeader>
    </Card>
  );
}

function InstructorAssignments() {
  return (
    <div>
      <h1>Instructor Assignments</h1>
      <SetAssignment />
    </div>
  );
}

export default InstructorAssignments;
