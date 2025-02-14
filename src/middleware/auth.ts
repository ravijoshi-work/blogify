import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "@/lib/jwt"; // Import your JWT token verification function

export async function authMiddleware(req: NextRequest) {
  const accessToken = req.headers.get("authorization");

  if (!accessToken) {
    return new NextResponse(
      JSON.stringify({
        error: "Authorization token is required.",
        status: false,
      }),
      { status: 403 }
    );
  }

  const token = accessToken.split(" ")[1];

  // Verify the token using your existing function
  const decodedToken = verifyJwtToken(token);

  if (!decodedToken) {
    return new NextResponse(
      JSON.stringify({
        error: "Unauthorized (wrong or expired token).",
        status: false,
      }),
      { status: 403 }
    );
  }

  // Attach the decoded token to the request object for further use
  req["user"] = decodedToken;

  return NextResponse.next(); // Proceed with the request
}
