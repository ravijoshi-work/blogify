"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Input from "../ui/Input";

const initialState = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [hydrated, setHydrated] = useState(false);
  const [state, setState] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = state;

    // Basic form validation
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!pattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      setIsLoading(true);

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false, // To prevent automatic redirect
      });


      if (res?.error) {
        setError(res.error); // Use the error message from NextAuth response
        setIsLoading(false);
        return;
      }

      setSuccess("Login successful");
      router.push("/blog"); // Redirect to the blog page

    } catch (error) {
      console.error("Login failed:", error);
      setError("An unexpected error occurred. Please try again later.");
      setIsLoading(false);
    }
  };

  return (
    <section className="container">
      <form
        onSubmit={handleSubmit}
        className="border-2 border-paragraphColor rounded-lg max-w-sm mx-auto px-8 py-6 space-y-5"
      >
        <h2 className="text-center special-word">Login</h2>

        <Input
          label="Email"
          type="email"
          name="email"
          onChange={handleChange}
          value={state.email}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
          value={state.password}
        />

        {error && <div className="text-red-700">{error}</div>} {/* Display error message */}

        {success && <div className="text-green-700">{success}</div>} {/* Display success message */}

        <button type="submit" className="btn w-full">
          {isLoading ? "Loading..." : "Login"}
        </button>

        <p className="text-center">
          Need an account?{" "}
          <Link href={"/signup"} className="text-primaryColor">
            Sign Up
          </Link>
        </p>
      </form>
    </section>
  );
};

export default LoginForm;
