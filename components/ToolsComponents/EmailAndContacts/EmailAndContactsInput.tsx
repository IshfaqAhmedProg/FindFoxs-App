import CustomTextInput from "@/components/CustomComponents/CustomTextInput";
import { Box, Divider, Stack, Typography, Autocomplete } from "@mui/material";
import React from "react";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import { useToolForm } from "@/contexts/ToolFormContext";
import CustomButton from "@/components/CustomComponents/CustomButton";
const topFilms = [
  "The Shawshank Redemption",
  "The Godfather",
  "The Godfather: Part II",
  "The Dark Knight",
  "12 Angry Men",
  "Schindler's List",
  "Pulp Fiction",
  "The Lord of the Rings: The Return of the King",
  "The Good, the Bad and the Ugly",
  "Fight Club",
  "The Lord of the Rings: The Fellowship of the Ring",
  "Star Wars: Episode V - The Empire Strikes Back",
  "Forrest Gump",
  "Inception",
  "The Lord of the Rings: The Two Towers",
  "One Flew Over the Cuckoo's Nest",
  "Goodfellas",
  "The Matrix",
  "Seven Samurai",
  "Star Wars: Episode IV - A New Hope",
];
export default function EmailAndContactsInput() {
  const { formData, handleSingleDataChange, handleFileDataChange } =
    useToolForm();
  // {
  //   console.log("formData", formData);
  // }
  return (
    <Stack pt={4} alignItems={"center"} gap={6} maxWidth={"500px"}>
      <Typography textAlign={"center"}>
        Enter keywords as you would type in the google maps search box or upload
        a file containing the keywords, make sure the file you upload is of
        .xlsx or .csv format. Also make sure the files have headers on the first
        row.
      </Typography>
      <Stack direction={"row"} gap={2}>
        <Autocomplete
          freeSolo
          defaultValue={[topFilms[13]]}
          multiple
          size="small"
          options={topFilms}
          onChange={(e, val) => {
            console.log(val);
          }}
          renderInput={(params) => (
            <CustomTextInput
              placeholder="Enter keywords"
              sx={{ minWidth: "250px" }}
              {...params}
            />
          )}
        />
        {formData.singleData && (
          <CustomButton kind="plain">Validate</CustomButton>
        )}
      </Stack>
      {!formData.singleData && (
        <>
          <Box minWidth={"250px"}>
            <Divider>or</Divider>
          </Box>
          <label style={{ width: "100%" }} htmlFor="fileInput">
            <Box
              border={"2px dashed var(--graylight)"}
              p={3}
              width={"70%"}
              sx={{
                strokeLinecap: "round",
                cursor: "pointer",
                transition: "0.3s all ease",
                ":hover": {
                  bgcolor: "var(--graylighter)",
                  transform: "scale(1.05)",
                },
              }}
              borderRadius={"var(--border-radius)"}
              display={"flex"}
              fontSize={"20px"}
              fontWeight={"bold"}
              color={"var(--graylight)"}
              justifyContent={"center"}
              alignItems={"center"}
              mx={"auto"}
            >
              <FileUploadRoundedIcon sx={{ fontSize: "35px" }} />
              Upload file
            </Box>
          </label>
          <input
            type="file"
            onChange={handleFileDataChange}
            id="fileInput"
            hidden={true}
            accept=".csv,.xls,.xlsx,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          />
          <Box minWidth={"350px"}>
            <Divider />
          </Box>
        </>
      )}
    </Stack>
  );
}
