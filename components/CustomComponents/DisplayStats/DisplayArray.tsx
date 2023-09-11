import React from "react";
import { Chip, Stack, Tooltip, Typography } from "@mui/material";
import CustomButton from "@/components/CustomComponents/CustomButton";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CustomBox from "@/components/CustomComponents/CustomBox";
interface Props {
  array: Array<string>;
  clearArray: () => void;
  disableClear: boolean;
  title?: string;
}
export default function DisplayArray({
  array,
  clearArray,
  disableClear,
  title,
}: Props) {
  return (
    <Stack gap={1} width={"80%"}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {title && (
          <Typography>
            {title}: <span className="trailingText">{array.length}</span>
          </Typography>
        )}
        <CustomButton
          kind="plain"
          buttonProps={{
            startIcon: <CancelRoundedIcon />,
            onClick: clearArray,
            disabled: disableClear,
          }}
        >
          clear
        </CustomButton>
      </Stack>
      <CustomBox
        variant="inner"
        boxProps={{
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
          p: 1,
          gap: 1,
          maxHeight: "250px",
          sx: { overflowY: "auto" },
        }}
      >
        {array.map((text) => {
          return (
            <Tooltip key={text} title={text}>
              <Chip label={text} size="small" />
            </Tooltip>
          );
        })}
      </CustomBox>
    </Stack>
  );
}
