import { useAuth } from "@/contexts/AuthContext";
import { FormCredentials } from "@/shared/interfaces/FormInputs";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthError } from "../../contexts/AuthErrorContext";
import inputs from "@/shared/constants/inputs.json";
import {  Box, Divider } from "@mui/material";
import { FormInput } from "@/components/FormComponents/FormInput";
import google from "@/public/Logos/Extra/Google.svg";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import LoadingButton from "../LoadingButton/LoadingButton";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import FormContainer from "../FormComponents/FormContainer";
export default function LoginForm() {
  const { handleError } = useAuthError();
  const { login, googleLogin } = useAuth();
  const [values, setValues] = useState<FormCredentials>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  function handleEmailLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    login(values.email, values.password)
      .then(() => {
        router.replace("/dashboard");
      })
      .catch((error: any) => {
        handleError(error);
      })
      .finally(() => setLoading(false));
  }
  function handleGoogleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    googleLogin()
      .then(() => router.replace("/dashboard"))
      .catch((error: any) => handleError(error))
      .finally(() => setLoading(false));
  }
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  return (
    <>
      <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
        Log In
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="1.5rem"
      >
        <FormContainer onSubmit={handleEmailLogin}>
          {inputs.auth.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <LoadingButton
            loading={loading}
            type="submit"
            variant="contained"
            disabled={loading}
            endIcon={<LoginRoundedIcon />}
          >
            Log in
          </LoadingButton>
        </FormContainer>
        <Divider style={{ width: "100%" }}>or</Divider>
        <FormContainer onSubmit={handleGoogleLogin}>
          <LoadingButton
            loading={loading}
            type="submit"
            size="large"
            startIcon={<Image src={google} alt="google logo" />}
          >
            Log in with Google&nbsp;
          </LoadingButton>
        </FormContainer>
      </Box>
    </>
  );
}
