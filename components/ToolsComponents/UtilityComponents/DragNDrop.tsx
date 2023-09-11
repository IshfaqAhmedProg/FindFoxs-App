import React, { useState } from "react";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import { Box } from "@mui/material";
import { useToolFormContext } from "@/contexts/ToolFormContext";
interface Props {
  handleFileDataChange: (files: FileList | null) => void;
}
export default function DragNDrop({ handleFileDataChange }: Props) {
  const [draggedOver, setDraggedOver] = useState<boolean>(false);
  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setDraggedOver(true);
  }
  function handleDragEnd(e: React.DragEvent) {
    e.preventDefault();
    setDraggedOver(false);
  }
  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    handleFileDataChange(e.dataTransfer.files);
    setDraggedOver(false);
  }
  const divStyle = {
    strokeLinecap: "round",
    cursor: "pointer",
    transition: "0.3s all ease",
  };
  const hoverStyle = {
    bgcolor: "var(--graylighter)",
    transform: "scale(1.05)",
  };
  return (
    <>
      <label style={{ width: "100%" }} htmlFor="fileInput">
        <Box
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragEnd}
          border={"2px dashed var(--graylight)"}
          p={3}
          width={"70%"}
          sx={
            draggedOver
              ? { ...divStyle, ...hoverStyle }
              : { ...divStyle, ":hover": hoverStyle }
          }
          borderRadius={"var(--border-radius)"}
          display={"flex"}
          fontSize={"20px"}
          fontWeight={"bold"}
          color={"var(--graylight)"}
          justifyContent={"center"}
          alignItems={"center"}
          mx={"auto"}
        >
          {draggedOver ? (
            <>
              <FileDownloadRoundedIcon sx={{ fontSize: "35px" }} /> Drop your
              file here
            </>
          ) : (
            <>
              <FileUploadRoundedIcon sx={{ fontSize: "35px" }} /> Upload here
            </>
          )}
        </Box>
      </label>
      <input
        type="file"
        onChange={(e) => handleFileDataChange(e.target.files)}
        id="fileInput"
        hidden={true}
        accept=".csv,.xls,.xlsx,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
      />
    </>
  );
}
