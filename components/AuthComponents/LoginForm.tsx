import { FormInput } from "@/components/CustomComponents/FormComponents/FormInput";
import { useAuth } from "@/contexts/AuthContext";
import google from "@/public/Logos/Extra/Google.svg";
import inputs from "@/shared/constants/inputs.json";
import { GetRefinedFirebaseError } from "@/shared/functions/errorHandler";
import { FormCredentials } from "@/shared/interfaces/FormInputs";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { Box, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useErrorHandler } from "../../contexts/ErrorHandlerContext";
import CustomButton from "../CustomComponents/CustomButton";
import FormContainer from "../CustomComponents/FormComponents/FormContainer";

export default function LoginForm() {
  const { handleError } = useErrorHandler();
  const { login, googleAccess: googleLogin } = useAuth();
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
      .catch((error: any) => {
        handleError(GetRefinedFirebaseError(error));
      })
      .finally(() => setLoading(false));
  }
  function handleGoogleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    googleLogin()
      .catch((error: any) => handleError(GetRefinedFirebaseError(error)))
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
          <CustomButton
            type="submit"
            disabled={loading}
            variant="contained"
            endIcon={<LoginRoundedIcon />}
          >
            Log in
          </CustomButton>
        </FormContainer>
        <Divider style={{ width: "100%" }}>or</Divider>
        <FormContainer onSubmit={handleGoogleLogin}>
          <CustomButton
            type="submit"
            disabled={loading}
            endIcon={<Image src={google} alt="google logo" />}
          >
            Log in with Google&nbsp;
          </CustomButton>
        </FormContainer>
      </Box>
    </>
  );
}
