"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onLoginHandle = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/users/login", user);
      router.push("/");
      toast.success("Login Successfully");
    } catch (error) {
      console.log("login error, ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col  items-center justify-center min-h-screen py-2">
        <h1>Login</h1>
        <h1>{loading ? "loading..." : ""}</h1>
        <hr />

        <label htmlFor="email">email</label>
        <input
          className="p-2 text-black border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: [e.target.value] })}
          placeholder="email"
        />
        <label htmlFor="password">password</label>
        <input
          className="p-2 border text-black border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: [e.target.value] })}
          placeholder="password"
        />
        <button
          onClick={onLoginHandle}
          className="p-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          Login
        </button>
        <Link href="/signup">Visit Signup Page</Link>
      </div>
    </>
  );
};

export default Login;
