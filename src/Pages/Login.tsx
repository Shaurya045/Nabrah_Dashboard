import type React from "react";

import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";
import { Label } from "../Components/ui/label";
// import { toast } from 'react-toastify';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated } = useAuth();
  //   const navigate = useNavigate();
  //   const { toast } = useToast();

  //   useEffect(() => {
  //     if (isAuthenticated) {
  //       navigate("/dashboard");
  //     }
  //   }, [isAuthenticated, navigate]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      await login(username, password);
      //   toast({
      //     title: "Success",
      //     description: "You have been logged in successfully.",
      //   });
    } catch (error) {
      console.error("Error logging in:", error);
      //   toast({
      //     variant: "destructive",
      //     title: "Error",
      //     description: "Invalid email or password. Please try again.",
      //   });
    } finally {
      setIsLoading(false);
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9fb7fc] to-[#e8e7ff]">
      <div className="absolute top-5 left-5 ">
        <img src={"/DARKLOGO.png"} alt="Logo" className="h-12 w-auto" />
      </div>

      <div className="flex flex-col items-center justify-center h-screen px-6 py-12 max-w-7xl mx-auto">
        <div className="w-full md:w-1/2 max-w-md">
          <div className="bg-[#1e2a3b] rounded-3xl p-8 shadow-xl">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Sign In</h2>
              <p className="text-gray-300 text-sm">
                Enter your credentials to access your account
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">
                  Email
                </Label>
                <Input
                  id="username"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  name="username"
                  required
                  className="bg-[#2a3548] border-0 text-white placeholder:text-gray-400 focus-visible:ring-[#4361ee]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    disabled={isLoading}
                    name="password"
                    required
                    className="bg-[#2a3548] border-0 text-white placeholder:text-gray-400 focus-visible:ring-[#4361ee]"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">Toggle password visibility</span>
                  </Button>
                </div>
              </div>

              <Button
                disabled={isLoading}
                className="w-full bg-[#4361ee] hover:bg-[#3a56d4] text-white py-6 rounded-xl"
              >
                {isLoading && (
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                )}
                Sign In
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#1e2a3b] px-2 text-gray-400">Or</span>
              </div>
            </div>

            <p className="text-center text-sm text-gray-300">
              <Link
                to="/signup"
                className="text-[#4361ee] hover:text-[#6c8cff] underline underline-offset-4"
              >
                Don&apos;t have an account? Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
