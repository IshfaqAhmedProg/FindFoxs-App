import { FormInput } from "@/components/CustomComponents/FormComponents/FormInput";
import { useAuth } from "@/contexts/AuthContext";
import { useErrorHandler } from "@/contexts/ErrorHandlerContext";
import { FormCredentials } from "@/shared/interfaces/FormInputs";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import { Box, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import google from "../../public/Logos/Extra/Google.svg";
import inputs from "../../shared/constants/inputs.json";
import CustomButton from "../CustomComponents/CustomButton";
import FormContainer from "../CustomComponents/FormComponents/FormContainer";
import { GetRefinedFirebaseError } from "@/shared/functions/errorHandler";

export default function SignupForm() {
  const { handleError } = useErrorHandler();

  const { signup, googleAccess, sendEV } = useAuth();
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
        sendEV();
      })
      .then(() => router.replace("/auth/signup/verifyEmail"))
      .catch((error: any) => handleError(GetRefinedFirebaseError(error)))
      .finally(() => setLoading(false));
  }
  function handleGoogleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    googleAccess()
      .then(() => router.replace("/dashboard"))
      .catch((error: any) => handleError(GetRefinedFirebaseError(error)))
      .finally(() => setLoading(false));
  }
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
        Create an account
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="1.5rem"
      >
        <FormContainer onSubmit={handleSignUp}>
          {inputs.auth.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <CustomButton
            type="submit"
            disabled={loading}
            variant="contained"
            endIcon={<HowToRegRoundedIcon />}
            loading={loading}
          >
            Sign up
          </CustomButton>
        </FormContainer>
        <Divider style={{ width: "100%" }}>or</Divider>
        <FormContainer onSubmit={handleGoogleSignup}>
          <CustomButton
            type="submit"
            disabled={loading}
            endIcon={<Image src={google} alt="google logo" />}
            loading={loading}
          >
            Log in with Google&nbsp;
          </CustomButton>
        </FormContainer>
      </Box>
    </>
  );
}
