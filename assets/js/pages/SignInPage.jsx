import React from "react";
import SignIn from "../components/Auth/SignIn";
import AuthLayout from "../Layouts/AuthLayout";

const SignInPage = () => {
  return (
    <div>
      <AuthLayout>
        <SignIn />
      </AuthLayout>
    </div>
  );
};

export default SignInPage;
