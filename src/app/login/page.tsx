"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCallback, useEffect, useMemo, useState } from "react";
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

  const updateFormField = useCallback((field: keyof FormState, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  }, []);

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

  const validateForm = useCallback((): boolean => {
    if (!formState.email.trim()) {
      setError("Email is required");
      return false;
    }

    if (tab !== "reset" && !formState.password) {
      setError("Password is required");
      return false;
    }

    if (tab === "signup" && !formState.displayName.trim()) {
      setError("Full name is required");
      return false;
    }

    return true;
  }, [tab, formState]);



  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setMessage(null);

      if (!validateForm()) {
        return;
      }

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
    [validateForm, tab, signInWithEmail, formState.email, formState.password, formState.displayName, signUpWithEmail, resetPassword]
  );

  const formConfig = useMemo(() => ({
    login: {
      title: "Log In",
      description: "Enter your credentials to access your account",
      submitText: "Log In"
    },
    signup: {
      title: "Sign Up",
      description: "Enter your details to create a new account",
      submitText: "Sign Up"
    },
    reset: {
      title: "Reset Password",
      description: "Enter your email to reset your password",
      submitText: "Send reset email"
    }
  }), []);

  const currentConfig = formConfig[tab];

  const handleModeChange = useCallback((value: string) => {
    const validModes: AuthMode[] = ["signup", "login", "reset"];
    if (validModes.includes(value as AuthMode)) {
      setTab(value as AuthMode);
    }
  }, []);


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
        <div className="absolute inset-0 bg-black/40 w-full" />
      </div>
      <div className="flex flex-1 flex-col item-center justify-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-medium text-center">
            Welcome to <br />
            <span className="text-blue-700 text-5xl md:text-6xl">
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
                className="md:text-base bg-white shadow-sm border-gray-100"
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
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="uppercase px-2 bg-white text-gray-500 font-bold">or</span>
                </div>
              </div>

              <div className="flex w-md max-w-md flex-col">
                <Tabs value={tab === "reset" ? "login" : tab} onValueChange={handleModeChange}
                >
                  <TabsList className="flex rounded-lg bg-gray-100  mb-4 w-full">
                    <TabsTrigger
                      value="signup"
                      className={`font-medium text-base p-2 rounded-md w-full transition-colors ${tab === "signup" ? "bg-white shadow-sm text-gray-900" : "text-slate-600 hover:text-slate-800"}`}
                    >
                      Sign Up
                    </TabsTrigger>
                    <TabsTrigger
                      value="login"
                      className={`font-medium text-base p-2 rounded-md w-full transition-colors ${tab === "login" || tab === "reset" ? "bg-white shadow-sm text-gray-900" : "text-slate-600 hover:text-slate-800"}`}
                    >
                      {tab === "reset" ? "Reset" : "Log In"}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value={tab === "reset" ? "login" : tab}>
                    <Card className="shadow-md border-slate-100">
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
                              <Label htmlFor="name" className="md:text-sm font-medium">
                                Full Name
                              </Label>
                              <Input
                                className="shadow-md border-slate-100"
                                id="name"
                                type="text"
                                value={formState.displayName}
                                onChange={(e) => updateFormField("displayName", e.target.value)}
                                placeholder="Enter your full name"
                              />
                            </div>
                          )}

                          <div className="grid gap-2">
                            <Label htmlFor="email" className="md:text-sm font-medium">
                              Email
                            </Label>
                            <Input
                              className="shadow-md border-slate-100"
                              id="email"
                              type="email"
                              value={formState.email}
                              onChange={(e) => updateFormField("email", e.target.value)}
                              placeholder="Enter your email"
                              required
                            />
                          </div>

                          {tab !== "reset" && (
                            <div className="grid gap-2">
                              <Label htmlFor="password" className="md:text-sm font-medium">
                                Password
                              </Label>
                              <Input
                                className="shadow-md border-slate-100"
                                id="password"
                                type="password"
                                value={formState.password}
                                onChange={(e) => updateFormField("password", e.target.value)}
                                placeholder={tab === "signup" ? "Create a password" : "Enter your password"}
                                required
                              />
                            </div>
                          )}

                          {["login", "reset"].includes(tab) && (
                            <div className="text-right">
                              <Button
                                type="button"
                                className="text-sm text-blue-400 hover:text-blue-700 hover:underline"
                                onClick={() => setTab(tab === "login" ? "reset" : "login")}
                              >
                                {tab === "login" ? "Forgot password?" : "Back to Log In?"}
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
                      {error && <div className="mb-4 text-red-600">{error}</div>}
                      {message && <div className="mb-4 text-green-700">{message}</div>}
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
