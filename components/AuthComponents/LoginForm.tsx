import { useAuth } from "@/contexts/AuthContext";
import { AuthCredentials } from "@/shared/interfaces/Authentication";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthLayout } from "./AuthLayout";
import inputs from "../../shared/constants/inputs.json";
import { Button, CircularProgress, Box, Divider } from "@mui/material";
import { FormInput } from "@/components/FormComponents/FormInput";
import google from "../../public/Logos/Extra/Google.svg";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import LoadingButton from "../LoadingButton/LoadingButton";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
export default function LoginForm() {
  const { handleError } = useAuthLayout();
  const { login, googleLogin } = useAuth();
  const [values, setValues] = useState<AuthCredentials>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const formStyles = {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  };
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
      <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
        Log In
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="1.5rem"
      >
        <form
          onSubmit={handleEmailLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
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
        </form>
        <Divider style={{ width: "100%" }}>or</Divider>
        <form
          onSubmit={handleGoogleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <LoadingButton
            loading={loading}
            type="submit"
            variant="outlined"
            size="large"
            startIcon={<Image src={google} alt="google logo" />}
          >
            Log in with Google&nbsp;
          </LoadingButton>
        </form>
      </Box>
    </>
  );
}
