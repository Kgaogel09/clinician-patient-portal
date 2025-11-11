"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import googleIcon from "../../../public/google.svg";
import Image from 'next/image';
import { useRouter } from "next/navigation";

import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

type AuthMode = "login" | "signup" | "reset";
interface FormState {
  email: string;
  password: string;
  displayName: string;
}

export default function Login() {
  const router = useRouter();
  const [tab, setTab] = useState<AuthMode>("signup");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user, signInWithEmail, signUpWithEmail, resetPassword } = useAuth();
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
    displayName: ""
  });

  useEffect(() => {
    setFormState({ email: "", password: "", displayName: "" });
    setError(null);
    setMessage(null);
  }, [tab]);

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user, router]);

  const resetMessages = useCallback(() => {
    setError(null);
    setMessage(null);
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setIsLoading(true);
    resetMessages();

    try {
      const googleProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError("Failed to sign in with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [resetMessages]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setMessage(null);

      setIsLoading(true);

      try {
        if (tab === "login") {
          if (!formState.email || !formState.password) throw new Error("Email and password are required");
          await signInWithEmail(formState.email, formState.password);
        } else if (tab === "signup") {
          if (!formState.email || !formState.password) throw new Error("Email and password are required");
          await signUpWithEmail(formState.email, formState.password, formState.displayName.trim() || undefined);
          setMessage("Registration successful — verification email sent (check your inbox).");
        } else if (tab === "reset") {
          if (!formState.email) throw new Error("Please provide your email");
          await resetPassword(formState.email);
          setMessage("Password reset email sent (check your inbox).");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [formState, tab, signInWithEmail, signUpWithEmail, resetPassword]
  );

  const formConfig = {
    login: { title: "Log In", description: "Enter your credentials to access your account", submitText: "Log In" },
    signup: { title: "Sign Up", description: "Enter your details to create a new account", submitText: "Sign Up" },
    reset: { title: "Reset Password", description: "Enter your email to reset your password", submitText: "Send reset email" }
  };

  const currentConfig = formConfig[tab];

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="flex flex-1 w-full h-full max-h-screen overflow-hidden relative">
        <Image
          priority
          src="https://images.pexels.com/photos/4989170/pexels-photo-4989170.jpeg"
          alt="Clinician Patient Portal Logo"
          height={1000}
          width={1000}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 w-full" />
      </div>
      <div className="flex flex-1 flex-col item-center justify-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-medium text-center">
            Welcome to <br />
            <span className="text-blue-600 dark:text-blue-500 text-5xl md:text-6xl">
              Clinician Patient Portal
            </span>
          </h1>
          <p className="mt-8">
            Sign in to your account to access your personalized dashboard.</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div>
            <div className="flex gap-6 flex-col">
              <Button
                onClick={signInWithGoogle}
                variant="outline"
                className="md:text-base bg-white dark:bg-gray-900 shadow-sm border-gray-100 dark:border-gray-800"
                aria-label="Sign in with Google"
                disabled={isLoading}
              >
                <Image
                  priority
                  src={googleIcon}
                  alt="Login with Google"
                  height={20}
                  width={20}
                />Login with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="uppercase px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-300 font-bold">or</span>
                </div>
              </div>

              <div className="flex w-md max-w-md flex-col">
                <Tabs value={tab} onValueChange={(value) => setTab(value as AuthMode)}
                >
                  <TabsList className="flex rounded-lg bg-gray-100 dark:bg-gray-800  mb-4 w-full">
                    <TabsTrigger
                      value="signup"
                      className={`font-medium text-base p-2 rounded-md w-full transition-colors ${tab === "signup" ? "bg-white dark:bg-gray-900 shadow-sm text-gray-900 dark:text-gray-100" : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"}`}
                    >
                      Sign Up
                    </TabsTrigger>
                    <TabsTrigger
                      value="login"
                      className={`font-medium text-base p-2 rounded-md w-full transition-colors ${tab === "login" || tab === "reset" ? "bg-white dark:bg-gray-900 shadow-sm text-gray-900 dark:text-gray-100" : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"}`}
                    >
                      {tab === "reset" ? "Reset" : "Log In"}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value={tab}>
                    <Card className="shadow-md border-slate-100 dark:border-slate-700">
                      <form onSubmit={handleSubmit} aria-label="Authentication form" className="flex flex-col gap-6">
                        <CardHeader>
                          <CardTitle>
                            {currentConfig.title}
                          </CardTitle>
                          <CardDescription>
                            {currentConfig.description}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="grid gap-6">
                          {tab === "signup" && (
                            <div className="grid gap-2">
                              <Label htmlFor="displayName" className="md:text-sm font-medium">
                                Full Name<span className="text-red-500 ml-0">*</span>
                              </Label>
                              <Input
                                className="shadow-sm border-slate-100 dark:border-slate-700 focus-visible:ring-2 dark:focus-visible:ring-gray-600 focus-visible:ring-gray-300"
                                id="displayName"
                                type="text"
                                value={formState.displayName}
                                onChange={(e) => setFormState(prev => ({ ...prev, displayName: e.target.value }))}
                                placeholder="Enter your full name"
                                required
                              />
                            </div>
                          )}

                          <div className="grid gap-2">
                            <Label htmlFor="email" className="md:text-sm font-medium">
                              Email<span className="text-red-500">*</span>
                            </Label>
                            <Input
                              className="shadow-sm border-slate-100 dark:border-slate-700 focus-visible:ring-2 dark:focus-visible:ring-gray-600 focus-visible:ring-gray-300"
                              id="email"
                              type="email"
                              value={formState.email}
                              onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                              placeholder="Enter your email"
                              required
                            />
                          </div>

                          {tab !== "reset" && (
                            <div className="grid gap-2">
                              <Label htmlFor="password" className="md:text-sm font-medium">
                                Password<span className="text-red-500">*</span>
                              </Label>
                              <Input
                                className="shadow-sm border-slate-100 dark:border-slate-700 focus-visible:ring-2 dark:focus-visible:ring-gray-600 focus-visible:ring-gray-300"
                                id="password"
                                type="password"
                                value={formState.password}
                                onChange={(e) => setFormState(prev => ({ ...prev, password: e.target.value }))}
                                placeholder={tab === "signup" ? "Create a password" : "Enter your password"}
                                required
                              />
                            </div>
                          )}
                          {tab === "login" && (
                            <div className="text-right">
                              <Button
                                type="button"
                                variant="link"
                                className="text-blue-400 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-400"
                                onClick={() => setTab("reset")}
                              >
                                Forgot password?
                              </Button>
                            </div>
                          )}
                          {tab === "reset" && (
                            <div className="text-right">
                              <Button
                                type="button"
                                variant="link"
                                className="text-blue-400 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-400"
                                onClick={() => setTab("login")}
                              >
                                Back to Log In
                              </Button>
                            </div>
                          )}
                        </CardContent>

                        <CardFooter>
                          <Button disabled={isLoading} type="submit" className="text-white bg-blue-400 font-bold w-full">
                            {isLoading ? "Please wait..." : currentConfig.submitText}
                          </Button>
                        </CardFooter>
                      </form>
                    </Card>

                    <div aria-live="polite" className="p-2">
                      {error && <div className="mb-4 text-red-500 dark:text-red-400">{error}</div>}
                      {message && <div className="mb-4 text-green-700 dark:text-green-500">{message}</div>}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
          <footer className="mt-8">
            <p className="text-center text-sm">
              &copy; {new Date().getFullYear()} Clinician Patient Portal. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </div >
  );
}
