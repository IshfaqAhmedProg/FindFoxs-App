import React, { useState } from "react";
import {
  Box,
  ButtonGroup,
  Divider,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import DisplayStat from "../../CustomComponents/DisplayStats/DisplayStat";
import CustomButton from "../../CustomComponents/CustomButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import Task from "@/shared/interfaces/Tasks";
import { formatDate, formatTime } from "@/shared/functions/formatDateTime";
import StatusGenerator from "../../TasksComponents/StatusGenerator";
import { DocumentData } from "@firebase/firestore-types";
import downloadAooAsSheet, {
  getTaskResult,
  getTaskDownloadUrl,
} from "@/shared/functions/downloadAooAsSheet";
import CustomBox from "@/components/CustomComponents/CustomBox";
import getFirstCharacter from "@/shared/functions/stringTransformers/getFirstCharacter";
export interface ResultData {
  downloadUrl: string;
  response: Array<any>;
}
const downloadFormats = ["xlsx", "csv"];
export type FileType = (typeof downloadFormats)[number];

export default function ResultSummaryCard({
  task,
}: {
  task: Task | DocumentData;
}) {
  const [taskResultData, setTaskResultData] = useState<ResultData>({
    downloadUrl: "",
    response: [],
  });
  const [downloadMenuAnchor, setDownloadMenuAnchor] =
    useState<null | HTMLElement>(null);
  const downloadMenuOpen = Boolean(downloadMenuAnchor);
  function handleDownloadMenuClick(event: React.MouseEvent<HTMLElement>) {
    setDownloadMenuAnchor(event.currentTarget);
  }
  function handleDownloadMenuClose() {
    setDownloadMenuAnchor(null);
  }
  const checkForFile = async (fileType: FileType) => {
    const resultData = {
      downloadUrl: taskResultData.downloadUrl,
      response: taskResultData.response,
    };
    if (taskResultData.downloadUrl == "") {
      await getTaskDownloadUrl(`${task.uid}/tasks/${task._id}/response`).then(
        (url) => {
          resultData.downloadUrl = url;
        }
      );
    }
    if (taskResultData.response.length == 0) {
      await getTaskResult(resultData.downloadUrl).then((response) => {
        console.log(response);
        resultData.response = response;
      });
    }
    const idShort = task._id.slice(0, 8);
    downloadAooAsSheet(
      resultData.response,
      `FindFoxs${getFirstCharacter(task.tool)}_${idShort}.${fileType}`
    );
    setTaskResultData({
      response: resultData.response,
      downloadUrl: resultData.downloadUrl,
    });
  };

  return (
    <CustomBox
      sx={{ gridColumnStart: "3" }}
      p={4}
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      gap={1}
    >
      <Typography variant="h4">Summary</Typography>
      <Divider />
      <DisplayStat
        stat={{
          statTitle: task.tool,
          stats: [
            {
              title: "Query count",
              stat: task.queryCount.toString(),
              statUnit: `${task.unit}(s)`,
            },
            {
              title: "Created at",
              stat: formatDate(task.dateCreated?.toDate()),
              statUnit: formatTime(task.dateCreated?.toDate()),
            },
            {
              title: "Completed at",
              stat: formatDate(task.dateCompleted?.toDate()),
              statUnit: formatTime(task.dateCompleted?.toDate()),
            },
            {
              title: "Status",
              stat: <StatusGenerator status={task.status} variant="medium" />,
            },
          ],
        }}
      />
      <Box display={"flex"} gap={3}>
        <CustomButton size="small" startIcon={<ShareRoundedIcon />}>
          Share
        </CustomButton>
        <ButtonGroup variant="text">
          <CustomButton
            size="small"
            onClick={(e) => checkForFile("xlsx")}
            kind="secondary"
          >
            Download
          </CustomButton>
          <CustomButton
            size="small"
            onClick={handleDownloadMenuClick}
            kind="secondary"
          >
            <ArrowDropDownIcon />
          </CustomButton>
        </ButtonGroup>
      </Box>
      <Menu
        anchorEl={downloadMenuAnchor}
        open={downloadMenuOpen}
        onClose={handleDownloadMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem sx={{ pointerEvents: "none" }}>
          <Typography variant="h4" fontSize={"14px"}>
            Select format
          </Typography>
        </MenuItem>
        {downloadFormats.map((format) => {
          return (
            <MenuItem key={format} onClick={(e) => checkForFile(format)}>
              {format}
            </MenuItem>
          );
        })}
      </Menu>
    </CustomBox>
  );
}
