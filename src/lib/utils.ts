import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const checkAndRemoveCookie = () => {
  // Get the JWT token from cookies
  const token = Cookies.get("token");

  if (token) {
    try {
      // Decode the JWT
      const decodedToken:any = jwtDecode(token);

      // Get the current time in seconds
      const currentTime = Math.floor(Date.now() / 1000);

      // Compare the expiration time
      if (decodedToken.exp < currentTime) {
        // Token is expired, remove the cookie
        Cookies.remove("token");
        console.log("Token expired. Cookie removed.");
      } else {
        console.log("Token is still valid.");
      }
    } catch (error) {
      console.error("Invalid token:", error);
      // Optionally remove the cookie if the token is invalid
      Cookies.remove("token");
    }
  } else {
    console.log("No token found in cookies.");
  }
};

// Call this function where needed


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
