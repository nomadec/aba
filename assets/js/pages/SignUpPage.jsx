import React from "react";
import SignUp from "../components/Auth/SignUp";
import AuthLayout from "../Layouts/AuthLayout";

const SignUpPage = () => {
  return (
    <div>
      <AuthLayout>
        <SignUp />
      </AuthLayout>
    </div>
  );
};

export default SignUpPage;
