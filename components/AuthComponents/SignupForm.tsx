import { useAuth } from "@/contexts/AuthContext";
import { FormCredentials } from "@/shared/interfaces/FormInputs";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthLayout } from "./AuthLayout";
import inputs from "../../shared/constants/inputs.json";
import google from "../../public/Logos/Extra/Google.svg";
import Image from "next/image";
import Typography from "@mui/material/Typography";

import { Button, CircularProgress, Box, Divider } from "@mui/material";
import { FormInput } from "@/components/FormComponents/FormInput";
import LoadingButton from "../LoadingButton/LoadingButton";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";

export default function SignupForm() {
  const { handleError } = useAuthLayout();

  const { signup, googleSignup } = useAuth();
  const [values, setValues] = useState<FormCredentials>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    signup(values.email, values.password)
      .then(() => {
        router.replace("/dashboard/newuser/1");
      })
      .catch((error: any) => console.log(error))
      .finally(() => setLoading(false));
  }
  function handleGoogleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    googleSignup()
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
        Create an account
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="1.5rem"
      >
        <form
          onSubmit={handleSignUp}
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
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
            endIcon={<HowToRegRoundedIcon />}
          >
            Sign up
          </LoadingButton>
        </form>
        <Divider style={{ width: "100%" }}>or</Divider>
        <form
          onSubmit={handleGoogleSignup}
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
            Sign up with Google&nbsp;
          </LoadingButton>
        </form>
      </Box>
    </>
  );
}
