import React from "react";
import { Box } from "@mui/material";
import CustomCard from "@/components/CustomComponents/CustomCard";
import CustomContainer from "../../CustomComponents/CustomContainer";

export default function ValidatorWrapper({
  children,
  action,
  title,
}: {
  children: React.ReactNode;
  action: React.ReactNode;
  title: string;
}) {
  return (
    <CustomCard title={title} action={action} actionPos="right">
      <CustomContainer>
        <Box
          rowGap={2}
          columnGap={2}
          p={2}
          sx={{
            justifyItems: "center",
            ["@container (max-width: 720px)"]: {
              gridTemplateColumns: "1fr",
              gridTemplateRows: "1fr 1fr 1fr",
            },
          }}
          display={"grid"}
          width={"100%"}
          height={"100%"}
          gridTemplateColumns={"1fr 1fr"}
          gridTemplateRows={"1fr 1fr"}
        >
          {children}
        </Box>
      </CustomContainer>
    </CustomCard>
  );
}
