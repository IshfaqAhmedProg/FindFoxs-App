import React, { useState, createContext, useEffect, useContext } from "react";
import { Alert, AlertTitle, Fade, Card, Box } from "@mui/material";
import { GetRefinedFirebaseError } from "@/shared/functions/errorHandler";
import Image from "next/image";
const AuthLayoutContext = createContext<any>({});
export const useAuthLayout = () => useContext(AuthLayoutContext);
export const AuthLayoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const handleError = (err: any) => {
    setChecked(true);
    if (err == null) return;
    console.log(GetRefinedFirebaseError(err));
    setErrorMsg(GetRefinedFirebaseError(err));
    return;
  };
  useEffect(() => {
    //to make the message dissapear
    let checkedTimeOut;
    if (checked) {
      checkedTimeOut = setTimeout(() => setChecked(!checked), 5000);
    }
  }, [checked]);
  const background = (
    <Image
      src="https://source.unsplash.com/random/1280x720/?fox"
      width={1920}
      height={1080}
      alt="background"
      style={{
        objectFit: "cover",
        position: "absolute",
        inset: "0",
        opacity: "1",
        filter: "blur(10px)",
        transform: "scale(1.2)",
      }}
    />
  );
  const errorAlert = (
    <Fade
      in={checked}
      style={{
        transformOrigin: "0 0 0",
        position: "absolute",
        top: "10%",
        left: "50%",
        transform: "translate(-50%,0%)",
      }}
    >
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {errorMsg}
      </Alert>
    </Fade>
  );
  return (
    <AuthLayoutContext.Provider value={{ handleError }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        maxWidth="100%"
        overflow="hidden"
        position="relative"
      >
        {background}
        {errorAlert}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "3em",
            justifyContent: "center",
            width: "40vw",
            minWidth: "fit-content",
            alignItems: "center",
            position: "relative",
            borderRadius: "var(--border-radius)",
            paddingTop: "3.125rem",
            paddingBottom: "5rem",
            boxShadow: "var(--box-shadow)",
            color: "var(--primary)",
            background: "var(--white)",
          }}
        >
          {children}
        </Box>
      </Box>
    </AuthLayoutContext.Provider>
  );
};
