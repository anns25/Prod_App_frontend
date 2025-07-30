import axios from "axios";
import { useContext, createContext, useState } from "react";
import { toast } from "react-toastify";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return (window.localStorage.getItem('username') || null);
  });

  // const [fakeUser, setFakeUser] = useState([{
  //   username: "admin",
  //   password: "123"
  // },
  // {
  //   username: "user1",
  //   password: "1234"
  // }]);

  const [error, setError] = useState("");

  const login = async (username, password) => {
    try{
      const res = await axios.post('http://localhost:3000/user/login',{ username, password});
      const token = res.data.data;
      setUser(username);
      window.localStorage.setItem("username", username);
      window.localStorage.setItem("token", token);
      toast.success("Valid User. Welcome Back.");
      setError("")
    }
    catch(err){
      setError(err.response?.data?.message || "login failed");
    }  
  }

  const signUp = async (username, password) => {
    try{
      await axios.post('http://localhost:3000/user/register', { username, password, role : "user"});
      window.localStorage.setItem("username", username);
      toast.success("New User Created !");
      setError("");
    }
    catch(err){
      setError(err.response?.data?.message || "Sign Up failed");
    }

  }

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("token");
  }

  return <AuthContext.Provider value={{ login, logout, signUp, user, error }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};