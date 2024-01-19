import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";

// Settings
const loginRouters = ['/login', '/register']

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const isAuthenticated = useAppSelector(state => state.auth.authUser);
    const isPageOutAuthentic = loginRouters.some(route => route === pathname);

    useEffect(() => {
      if (!isAuthenticated && !isPageOutAuthentic) navigate("/login");
      else if (isAuthenticated && isPageOutAuthentic) navigate("/dragons");
    }, []);

     return <Component {...props} />;
  };
}