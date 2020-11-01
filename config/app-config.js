
export const IsProd = (process.env.NODE_ENV === "production");
export const Domain = "https://seedsjobfairapp.com";
export const AppName = "Zurich Admin Management System"
export const AppSlug = "insurance-app"
export const ServerRoot = (IsProd) ? `${Domain}/cf` : "http://localhost:4040";
