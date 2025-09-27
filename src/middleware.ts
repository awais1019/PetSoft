export { auth as middleware } from "./lib/auth";



export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
// export const config = {
//   matcher: ["/app/:path*"],
// };