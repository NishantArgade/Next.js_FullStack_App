import jwt from "jsonwebtoken";
import User from "@/models/userModel";

const getUserDetails = async (response) => {
  try {
    const token = response.cookies.get("token")?.value || "";

    const data = await jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findOne({ _id: data.id });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

export default getUserDetails;
