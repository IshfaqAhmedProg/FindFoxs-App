import { useTable } from "@/contexts/TableContext";
import useDeleteTasks from "@/shared/hooks/useDeleteTasks";
import { LeadAction } from "@/shared/interfaces/Lead";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { Stack, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import ConfirmationDialog from "../CustomComponents/ConfirmationDialog/ConfirmationDialog";
import CustomButton from "../CustomComponents/CustomButton";
export default function TasksTableSelectAction() {
  const { selected } = useTable();
  const [deleteDocument, loading, error] = useDeleteTasks();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const LeadTableSelectActions: Array<LeadAction> = [
    {
      title: "Delete Task(s)",
      icon: <DeleteOutlineRoundedIcon />,
      handler: (e) => handleShowDeleteConfirm(),
    },
  ];
  function handleShowDeleteConfirm() {
    setShowDeleteConfirm(true);
  }
  function onCloseConfirm() {
    setShowDeleteConfirm(false);
  }
  // console.log(showDeleteConfirm);
  return (
    <>
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent={"flex-end"}
        width={"100%"}
        gap={1}
      >
        {LeadTableSelectActions.map((filter) => {
          return (
            <CustomButton
              kind="icon"
              key={filter.title}
              iconButtonProps={{
                onClick: filter.handler,
                sx:
                  filter.title == "Delete Task(s)"
                    ? {
                        "& .MuiSvgIcon-root": {
                          color: "var(--error)",
                        },
                      }
                    : {},
              }}
            >
              <Tooltip title={filter.title}>{filter.icon}</Tooltip>
            </CustomButton>
          );
        })}
      </Stack>
      <ConfirmationDialog
        label="Delete"
        element="Tasks"
        message={
          <Typography textAlign={"center"}>
            Are you sure you want to delete {selected.length} task(s).
            <br />
            <span style={{ color: "var(--error)" }}>
              This action is irreversible
            </span>
          </Typography>
        }
        loading={loading}
        open={showDeleteConfirm}
        onClose={onCloseConfirm}
        action={() => deleteDocument(selected)}
      />
    </>
  );
}
