import { NextRequest, NextResponse } from "next/server";
// import { authMiddleware } from "./middleware/auth";
// import {
//   apiPrefix,
//   apiPublicRoutes,
//   clientPublicRoutes,
// } from "./utils/constant";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname; // Get the current URL path
  console.info("path", path);

  // const isApiRoute = path.startsWith(apiPrefix);

  // if (isApiRoute) {
  //   if (apiPublicRoutes.includes(path)) {
  //     console.log("ready to go", path);
  //   }
  // }

  // console.log("path", path);
  // if (clientPublicRoutes.includes(path)) {
  //   return NextResponse.next(); // Proceed with the request
  // }
  // return authMiddleware(req);

  return NextResponse.next();
}

// // don't run middleware on these routes
// export const config = {
//   matcher: ["/api/:path*"],
// };
