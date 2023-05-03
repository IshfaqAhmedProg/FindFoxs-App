import React from "react";
import DashboardCardsLayout from "./DashboardCardsLayout";
import CircularProgress from "@/components/ProgressBars/CircularProgress";
import { Box, Stack, Typography } from "@mui/material";
import HorizontalProgress from "@/components/ProgressBars/HorizontalProgress";
export default function LeadConversion() {
  const conversionPercentage = 85;
  const leadConversionDetails = [
    {
      title: "New Leads Added",
      subtitle: "this month",
      value: conversionPercentage,
      maxValue: 100,
    },
    {
      title: "Contacts that opened mail",
      subtitle: "this month",
      value: conversionPercentage,
      maxValue: 100,
    },
    {
      title: "Emails sent to leads",
      subtitle: "this month",
      value: conversionPercentage,
      maxValue: 100,
    },
    {
      title: "Called Leads",
      subtitle: "this month",
      value: conversionPercentage,
      maxValue: 100,
    },
  ];
  return (
    <DashboardCardsLayout title="Lead Conversion" minHeight="357px">
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        marginY="auto"
        gap={4}
      >
        <Box
          display="flex"
          flexDirection="column"
          maxWidth="12rem"
          gap={1}
          alignItems="center"
        >
          <CircularProgress value={conversionPercentage} />
          <Typography textAlign="center" variant="body2">
            <strong>303</strong> Leads Converted to Satisfied out of{" "}
            <strong>387</strong>
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap={2}>
          {leadConversionDetails.map((detail) => {
            return (
              <HorizontalProgress
                value={detail.value}
                full={true}
                maxValue={detail.maxValue}
                title={detail.title}
                subtitle={detail.subtitle}
                valueId="Goal"
              />
            );
          })}
        </Box>
      </Stack>
    </DashboardCardsLayout>
  );
}
