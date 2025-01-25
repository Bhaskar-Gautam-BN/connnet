import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  // checkAndRemoveCookie();
  const AuthCookie = req.cookies.get("login-token")?.value;
  console.log("🚀 ~ middleware ~ AuthCookie:", AuthCookie)
  const userCookie = req.cookies.get("user")?.value;
   console.log(userCookie);
  // Check if the user is authenticated
  const isAuthenticated = Boolean(AuthCookie);

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return NextResponse.redirect(new URL("/login", req.url));
  }

  let user;
  try {
    user = userCookie ? JSON.parse(userCookie) : null;
    console.log(user);
   
  } catch (error) {
    console.error("Failed to parse user cookie:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role = user?.role; // Assuming user.role contains the role number (0, 1, or 2)
  const pathname = req.nextUrl.pathname;
  // Authorization logic based on role
  if (role === 0) {
    // Super Admin: Can access everything
    return NextResponse.next();
  } else if (role === 1) {
    // Admin: Can access only dashboard routes
    if (!pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  } else if (role === 2) {
    // User: Cannot access dashboard routes
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else {
    // If the role is not recognized, redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", // User and Super Admin can access
    "/about/:path*", // User and Super Admin can access
    "/home/:path", // User and Super Admin can access
    "/dashboard/:path*", // Admin and Super Admin only
    "/chat/:path*", // User and Super Admin can access
    "/chat-me", // User and Super Admin can access
  ],
};

// import { NextRequest, NextResponse } from "next/server";

// export default async function middleware(req: NextRequest) {
//   // const { pathname } = req.nextUrl;
//   const AuthCookie = req.cookies.get("login-token")?.value;
//   const userCookie = req.cookies.get("user")?.value;
//   const isAuthenticated = Boolean(AuthCookie);
//   if (!isAuthenticated) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
//   return NextResponse.next(); // Proceed to the requested route if no redirection is needed
// }

// export const config = {
//   matcher: [
//     "/",
//     "/about/:path*",
//     "/home/:path",
//     "/dashboard",
//     "/about/:path*",
//     "/chat/:path*",
//     "/dashboard/:path*",
//     "/chat-me",
//   ],
// };
