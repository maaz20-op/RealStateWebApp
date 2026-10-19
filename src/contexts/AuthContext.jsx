import { createContext, useContext, useMemo } from "react";
import { useGetMeQuery } from "../services/userApi";
import { useLogoutMutation } from "../services/authApi";

const AuthContext = createContext(null);

// The user lives only in the RTK Query cache; this context just exposes it.
// Auth is a HttpOnly cookie set by the backend, so nothing is stored in localStorage.
export function AuthProvider({ children }) {
  const { data: user, isLoading, isFetching } = useGetMeQuery();
  const [logoutRequest] = useLogoutMutation();
  const value = useMemo(() => ({
    user: user?.email || user?._id ? user : null,
    isLoading: isLoading || isFetching,
    isAdmin: user?.role === "admin",
    logout: () => logoutRequest().unwrap(),
  }), [user, isLoading, isFetching, logoutRequest]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
