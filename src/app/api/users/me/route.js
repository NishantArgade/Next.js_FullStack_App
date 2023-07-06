import getUserDetails from "@/helper/getUserDetails";
import { NextResponse } from "next/server";

export const GET = async (response) => {
  try {
    const user = await getUserDetails(response);

    return NextResponse.json({
      message: "User get Successfully",
      user,
    });
  } catch (error) {
    return console.log(error);
  }
};
