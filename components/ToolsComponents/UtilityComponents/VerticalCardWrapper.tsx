import CustomBox from "@/components/CustomComponents/CustomBox";
import { Box } from "@mui/material";
import React from "react";

export default function VerticalCardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CustomBox boxProps={{ overflow: "hidden" }} variant="inner">
      <Box
        py={2}
        px={2}
        sx={{ overflowY: "auto", overflowX: "hidden" }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={3}
        height={"100%"}
      >
        {children}
      </Box>
    </CustomBox>
  );
}
