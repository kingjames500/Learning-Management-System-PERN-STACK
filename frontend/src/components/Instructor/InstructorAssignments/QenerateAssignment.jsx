import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button"; // shadcn Button
import { Input } from "@/components/ui/input"; // shadcn Input
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // shadcn Card
import { useMutation } from "react-query";
import { toast } from "sonner";
import apiUrl from "@/lib/apiUrl";
import { InstructorContext } from "@/components/Context/Instructor/InstructorContext";

const GenerateAssignmentCard = () => {
  const { questionsGenerated, setQuestionsGenerated } =
    useContext(InstructorContext);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const mutation = useMutation({
    mutationFn: async (promptDetails) => {
      const response = await fetch(`${apiUrl}/openai`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(promptDetails),
      });
      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      setLoading(false);
      console.log("Raw AI Response:", data.generatedText);

      // Directly update state with raw AI response for testing
      setQuestionsGenerated((prevQuestions) => [
        ...prevQuestions,
        { question: data.generatedText },
      ]);

      // Log the updated state
      console.log("Updated Questions Generated:", [
        ...questionsGenerated,
        { question: data.generatedText },
      ]);
    },
    onError: (error) => {
      setLoading(false);
      toast.error(error.message);
    },
  });

  const generateQuestions = () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt for AI!");
      return;
    }
    setLoading(true);
    mutation.mutate({ prompt });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-gray-100">
      <Card className="w-full max-w-md bg-white shadow-lg border border-gray-200 mt-8">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold text-gray-800">
            Generate Assignment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <Input
            type="text"
            placeholder="Enter a topic or prompt for questions"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
            disabled={mutation.isLoading}
            onClick={generateQuestions}
          >
            {mutation.isLoading
              ? "Generating Questions..."
              : "Generate Questions"}
          </Button>
        </CardContent>
      </Card>

      {/* Render Questions List */}
      {questionsGenerated.length > 0 && (
        <Card className="w-full max-w-2xl bg-white shadow-lg border border-gray-200 mt-8">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold text-gray-800">
              Generated Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            {questionsGenerated.map((q, index) => (
              <div key={index} className="border p-4 rounded-md shadow-sm">
                <p className="font-bold">Question {index + 1}:</p>
                <p>{q.question}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GenerateAssignmentCard;
