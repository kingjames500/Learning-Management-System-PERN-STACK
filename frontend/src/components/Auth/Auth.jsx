import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useMutation } from "react-query";
import apiUrl from "../../lib/apiUrl.js";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import userDetailsStore from "@/Store/userStoreDetails.js";
import { AuthContext } from "../Context/authContext/authContext.jsx";

function Register() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate, isLoading } = useMutation({
    mutationFn: async (registerUserData) => {
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerUserData),
      });

      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    },

    onError: (error) => {
      toast.error(error.message, {
        duration: 3000,
      });
    },

    onSuccess: () => {
      toast.success("Account created successfully", {
        duration: 3000,
        description: "You have successfully created an account",
      });
    },
  });

  function handleRegisterUser(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password mismatch", {
        duration: 1000,
      });
      return;
    }

    const registerUser = {
      email,
      firstName,
      lastName,
      username,
      password,
      role: "student",
    };

    mutate(registerUser);
  }
  return (
    <Card className="p-6 mb-6 shadow-lg rounded-lg bg-white w-[500px]">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-indigo-700">
          Register
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          Create a new account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-indigo-600">Email</Label>
            <Input
              className="text-gray-900 placeholder-gray-400 border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Username Input */}
          <div className="space-y-1">
            <Label className="text-indigo-600">Username</Label>
            <Input
              className="text-gray-900 placeholder-gray-400 border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        {/* First Name and Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-indigo-600">First Name</Label>
            <Input
              className="text-gray-900 placeholder-gray-400 border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-indigo-600">Last Name</Label>
            <Input
              className="text-gray-900 placeholder-gray-400 border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        {/* Password and Confirm Password */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-indigo-600">Password</Label>
            <Input
              className="text-gray-900 placeholder-gray-400 border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-indigo-600">Confirm Password</Label>
            <Input
              className="text-gray-900 placeholder-gray-400 border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Button
          className="px-6 py-2 text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700"
          disabled={isLoading}
          onClick={handleRegisterUser}
        >
          {isLoading ? "Registering User..." : "Register"}
        </Button>
      </CardFooter>
    </Card>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useContext(AuthContext);
  const setUser = userDetailsStore((state) => state.setUser);
  const redirect = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (loginUserData) => {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginUserData),
      });

      if (response.ok === false) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      setAuth({
        authenticate: true,
        user: data.user,
        role: data.user.role,
      });
      setUser({ ...data.user, role: undefined });
      toast.success("Login successful");

      setTimeout(() => {
        if (data.user.role === "instructor") {
          redirect("/instructor-homepage");
        } else if (data.user.role === "student") {
          redirect("/student-homepage");
        } else {
          redirect("/home");
        }
      }, 1000);
    },
    onError: (error) => {
      toast.error(error.message, {
        duration: 3000,
      });
    },
  });

  function handleLoginUser(event) {
    event.preventDefault();
    const loginUser = {
      email,
      password,
    };

    mutate(loginUser);
  }

  return (
    <Card className="p-6 mb-6 shadow-lg rounded-lg bg-white w-[500px]">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-indigo-700">
          Login
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          Sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-1">
          <Label className="text-indigo-600">Email</Label>
          <Input
            className="text-gray-900 placeholder-gray-400 border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-indigo-600">Password</Label>
          <Input
            className="text-gray-900 placeholder-gray-400 border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          className="px-6 py-2 text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700"
          disabled={isLoading}
          onClick={handleLoginUser}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
}

function Auth() {
  return (
    <Tabs defaultValue="register" className="w-[500px] mx-auto mt-10">
      <TabsList className="flex space-x-2">
        <TabsTrigger
          value="register"
          className="flex-1 px-4 py-2 text-center text-sm font-medium text-indigo-600 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Register
        </TabsTrigger>
        <TabsTrigger
          value="login"
          className="flex-1 px-4 py-2 text-center text-sm font-medium text-indigo-600 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </TabsTrigger>
      </TabsList>
      <TabsContent value="register">
        <Register />
      </TabsContent>
      <TabsContent value="login">
        <Login />
      </TabsContent>
    </Tabs>
  );
}

export default Auth;
