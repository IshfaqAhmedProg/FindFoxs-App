import React, { useState, createContext, useEffect, useContext } from "react";
import { Alert, AlertTitle, Fade } from "@mui/material";
const ErrorHandlerContext = createContext<any>({});
export const useErrorHandler = () => useContext(ErrorHandlerContext);
export const ErrorHandlerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const handleError = (err: any) => {
    setChecked(true);
    if (err == null) return;
    setErrorMsg(err);
    return;
  };
  useEffect(() => {
    //to make the message dissapear
    let checkedTimeOut;
    if (checked) {
      checkedTimeOut = setTimeout(() => setChecked(!checked), 5000);
    }
  }, [checked]);

  const errorAlert = (
    <Fade
      in={checked}
      style={{
        transformOrigin: "0 0 0",
        position: "absolute",
        top: "10%",
        left: "50%",
        transform: "translate(-50%,0%)",
        zIndex: 5,
      }}
    >
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {errorMsg}
      </Alert>
    </Fade>
  );
  return (
    <ErrorHandlerContext.Provider value={{ handleError, errorAlert }}>
      {children}
    </ErrorHandlerContext.Provider>
  );
};
