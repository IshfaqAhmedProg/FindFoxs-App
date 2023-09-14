import CustomTextInput from "@/components/CustomComponents/CustomTextInput";
import { Autocomplete, Stack, Typography } from "@mui/material";

const jobTitles = [
  "Software Engineer",
  "Project Manager",
  "Sales Manager",
  "Business Development Manager",
  "Marketing Manager",
  "Operations Manager",
  "Account Manager",
  "Product Manager",
  "Financial Analyst",
  "Data Scientist",
  "Human Resources Manager",
  "Consultant",
  "Software Developer",
  "Executive Assistant",
  "Customer Success Manager",
  "Operations Analyst",
  "Marketing Coordinator",
  "Business Analyst",
  "Graphic Designer",
  "Administrative Assistant",
  "Financial Controller",
  "Account Executive",
  "Sales Representative",
  "Operations Coordinator",
  "Product Marketing Manager",
  "Data Analyst",
  "HR Coordinator",
  "Sales Operations Manager",
  "Project Coordinator",
  "Marketing Specialist",
  "Operations Assistant",
  "Financial Manager",
  "Software Architect",
  "UX Designer",
  "HR Manager",
  "Accounting Manager",
  "Business Consultant",
  "IT Manager",
  "Marketing Director",
  "Operations Director",
  "Product Owner",
  "Data Engineer",
  "HR Generalist",
  "Sales Executive",
  "Technical Support Engineer",
  "Financial Advisor",
  "Web Developer",
  "Customer Service Representative",
  "Operations Supervisor",
  "Content Writer",
  "Digital Marketing Manager",
];

export default function Filter() {
  return (
    <>
      <Stack px={3} py={2}>
        <Typography>Filter by Job title:</Typography>
        <Autocomplete
          freeSolo
          multiple
          size="small"
          options={jobTitles}
          limitTags={5}
          renderInput={(params) => (
            <CustomTextInput
              placeholder="Enter Job Title"
              sx={{ minWidth: "300px", maxWidth: "300px" }}
              {...params}
            />
          )}
        />
      </Stack>
    </>
  );
}
