import getCookieToken from "./getCookieToken";

const isLoggedIn = () => Boolean(getCookieToken());
export default isLoggedIn;
