import React from "react";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";

function Login() {
  const user = useSelector((store) => store.user);
  return (
    <div>
      <h1>Login</h1>
      {!user.user && <LoginForm />}
      {user.user && `Welcome, ${user.user.firstName}`}
    </div>
  );
}

export default Login;
