import React from "react";
import SignUp from "../components/Auth/SignUp";
import AuthLayout from "../Layouts/AuthLayout";

const SignUpPage = () => {
  return (
    <AuthLayout>
      <SignUp />
    </AuthLayout>
  );
};

export default SignUpPage;