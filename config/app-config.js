
export const IsProd = (process.env.NODE_ENV === "production");
export const Domain = "https://seedsjobfairapp.com";
export const AppName = "Zurich"
export const ServerRoot = (IsProd) ? `${Domain}/cf` : "http://localhost:4040";