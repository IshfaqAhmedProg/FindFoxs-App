import mockPeople from "@/shared/data/PlaceholderLeads.json";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import { Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CustomBox from "../CustomComponents/CustomBox";
import CustomButton from "../CustomComponents/CustomButton";
import TableItem from "../TableComponents/TableItem";
import TablePrimaryItem from "../TableComponents/TablePrimaryItem";
import SearchPeoplePrimaryItem from "./SearchPeoplePrimaryItem";
import SearchPeopleSecondaryItem from "./SearchPeopleSecondaryItem";
export default function SearchPeoplePaywall() {
  const theme = useTheme();
  mockPeople.length = 3;
  const tablePrimaryItems = (
    <>
      {mockPeople.length != 0 &&
        mockPeople.map((lead) => {
          return (
            <TablePrimaryItem key={lead._id} id={lead._id}>
              <SearchPeoplePrimaryItem content={lead} />
            </TablePrimaryItem>
          );
        })}
    </>
  );
  const tableSecondaryItems = (
    <>
      {mockPeople.length != 0 &&
        mockPeople.map((lead) => {
          return (
            <TableItem key={lead._id}>
              <SearchPeopleSecondaryItem content={lead} />
            </TableItem>
          );
        })}
    </>
  );
  return (
    <CustomBox width="100%" position="relative" bgcolor="var(--white)">
      <Stack
        position={"absolute"}
        top={"0"}
        left={"50%"}
        sx={{
          isolation: "isolate",
          transform: "translate(-50%,0%)",
          ":before": {
            content: '""',
            position: "absolute",
            height: "90%",
            width: "200%",
            top: 0,
            bgcolor: "var(--white)",
            // bgcolor: "red",
            filter: "blur(20px)",
            zIndex: -1,
            borderRadius: "0% 0% 50% 50%",
          },
        }}
        zIndex={5}
        pt={7}
        alignItems={"center"}
        gap={2}
      >
        <Typography variant="h3" color={"var(--primary)"}>
          Lookin for{" "}
          <span style={{ color: "var(--accent)", fontSize: "2.5rem" }}>
            more
          </span>{" "}
          leads?
        </Typography>
        <Typography maxWidth={"35ch"} fontWeight={"bold"} textAlign={"center"}>
          Get access to more than 10,000+ leads and more features by upgrading
          to one of our paid plans.
        </Typography>
        <CustomButton kind="secondary" startIcon={<ReceiptLongRoundedIcon />}>
          View Plans
        </CustomButton>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent="center"
        sx={{ pointerEvents: "none", filter: "blur(4px)" }}
      >
        <Stack
          pt={2}
          width={
            useMediaQuery(theme.breakpoints.down("sm")) ? "100%" : "inherit"
          }
        >
          {tablePrimaryItems}
        </Stack>
        <Stack
          display={
            useMediaQuery(theme.breakpoints.down("sm")) ? "none" : "block"
          }
          width="80%"
          height={"fit-content"}
          sx={{ overflowX: "auto", whiteSpace: "nowrap", overflowY: "hidden" }}
          py={2}
        >
          {tableSecondaryItems}
        </Stack>
      </Stack>
    </CustomBox>
  );
}
