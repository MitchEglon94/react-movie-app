import React from "react";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Login() {
  const user = useSelector((store) => store.user);
  return (
    <div>
      <h1>Login</h1>
      {!user.user && <LoginForm />}
      {user.user && `Welcome, ${user.user.firstName}`}
      {user.user && <Link to={"/dashboard"}>Start Browsing!</Link>}
    </div>
  );
}

export default Login;
