"use client";
import Link from "next/link";
import React, {  useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const Signup = () => {
  const [user, setUser] = useState({ email: "", password: "", username: "" });
  const [loading,setLoading]= useState(false)

  const router = useRouter();

  const onSignupHandle = async () => {
    setLoading(true)
    try {
      const res = await axios.post("/api/users/signup",user);
      toast.success("Signed up Successfully");
      router.push("/login");
    } catch (error) {
      console.log("Signup error, ", error);
      toast.error(error.error);
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <>
      <div className="flex flex-col  items-center justify-center min-h-screen py-2">
        <h1 >Signup</h1>
        <h1 >{loading?"Loading":""}</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input
          className="p-2 border text-black border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />
        <label htmlFor="email">email</label>
        <input
          className="p-2 text-black border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <label htmlFor="password">password</label>
        <input
          className="p-2 border text-black border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button
          onClick={onSignupHandle}
          className="p-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          Signup
        </button>
        <Link href="/login">Visit Login Page</Link>
      </div>
    </>
  );
};

export default Signup;
