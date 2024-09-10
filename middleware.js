import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Set the paths that don't require the user to be signed in
  // Sign in and sign up pages are already made public by Clerk
<<<<<<< HEAD
  publicRoutes: ["/", "/contact", "/about", "/privacy-policy", "/api/webhook", '/api/elevenlabs'],
=======
  publicRoutes: ["/", "/contact", "/about", "/privacy-policy", "/api/webhook", "/api/elevenlabs"],
>>>>>>> da469d7a616198b9de4feeaa27e890c8398383cb
});


export const config = {
  matcher: ["/((?!.*\\..*|_next).*)","/","/(api|trpc)(.*)"],
};



