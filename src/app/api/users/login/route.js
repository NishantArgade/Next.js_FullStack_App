import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "email or password wrong" });
    }

    const validatePassword = bcryptjs.compare(password, user.password);
    if (!validatePassword) {
      return NextResponse.json({ message: "email or password wrong" });
    }

    const tokenPayload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = await jwt.sign(tokenPayload, process.env.TOKEN_SECRET);
    console.log("my token ", token);
    const response = NextResponse.json({
      message: "Successfully login",
      status: true,
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error) {
    return console.log(error);
  }
};

connect();
