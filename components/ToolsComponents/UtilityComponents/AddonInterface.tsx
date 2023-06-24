import React, { useState } from "react";
import EmailAndContactsIcon from "@/public/Icons/EmailAndContactsScraper.svg";
import PhoneNumberValidatorIcon from "@/public/Icons/PhoneNumberValidator.svg";
import Image from "next/image";
import { Tooltip, Typography, Menu, Stack, MenuItem } from "@mui/material";
import CustomButton from "@/components/CustomComponents/CustomButton";
import CustomBox from "@/components/CustomComponents/CustomBox";
import CustomCheckbox from "@/components/CustomComponents/CustomCheckbox";
interface AddonType {
  [key: string]: boolean;
}
interface Props {
  onAddonSelect: (addon: Array<string>) => void;
}
interface Addon {
  name: string;
  icon: any;
  message: string;
  messageConfirm: string;
}
export default function AddonInterface({ onAddonSelect }: Props) {
  const [addonOpenAnchor, setAddonOpenAnchor] = useState<null | HTMLElement>(
    null
  );
  const [addons, setAddons] = useState<AddonType>({
    EmailAndContacts: false,
    PhoneNumberValidator: false,
  });
  const addonOpen = Boolean(addonOpenAnchor);
  function handleAddonClick(event: React.MouseEvent<HTMLElement>) {
    setAddonOpenAnchor(event.currentTarget);
  }
  function handleAddonClose() {
    setAddonOpenAnchor(null);
  }
  function handleAddon() {
    const activeAddons = [];
    for (const addon in addons) {
      if (addons[addon]) {
        activeAddons.push(addon);
      }
    }
    console.log(activeAddons);
    onAddonSelect(activeAddons);
    setAddonOpenAnchor(null);
  }
  const addOnList: Array<Addon> = [
    {
      name: "EmailAndContacts",
      icon: EmailAndContactsIcon,
      message:
        "Scrape Email and Contacts from the websites found in the result",
      messageConfirm:
        "Email and Contacts will be scraped from any websites found in the results",
    },
    {
      name: "PhoneNumberValidator",
      icon: PhoneNumberValidatorIcon,
      message: "Validate Phone Numbers found in the result",
      messageConfirm: "Phone Numbers found in the result will be validated",
    },
  ];
  return (
    <>
      <Stack gap={2}>
        {!addonOpen &&
          addOnList.map((addon) => {
            if (addons[addon.name]) {
              return (
                <CustomBox
                  variant="outer"
                  key={addon.name}
                  boxProps={{
                    display: "flex",
                    gap: 2,
                    py: 2,
                    px: 2,
                    alignItems: "center",
                  }}
                >
                  <CustomCheckbox
                    checked={addons[addon.name]}
                    id={addon.name}
                    onChange={(e) =>
                      setAddons({ ...addons, [addon.name]: e.target.checked })
                    }
                  />
                  <Image
                    src={addon.icon}
                    height={44}
                    alt="icon"
                    style={{ minWidth: "60px", maxWidth: "60px" }}
                  />
                  <Typography textAlign="left" fontSize={"14px"}>
                    {addon.messageConfirm}
                  </Typography>
                </CustomBox>
              );
            }
          })}
      </Stack>
      <Menu
        anchorEl={addonOpenAnchor}
        id="backdropBlur"
        open={addonOpen}
        onClose={handleAddonClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <CustomButton
          kind="close"
          iconButtonProps={{ onClick: () => handleAddonClose() }}
        />
        <Stack alignItems={"center"} padding={3} gap={4}>
          <Typography>
            These add-ons will be executed along with the task
          </Typography>
          <Stack gap={2}>
            {addOnList.map((addon) => {
              return (
                <Stack direction={"row"} gap={3} alignItems={"center"}>
                  <CustomCheckbox
                    checked={addons[addon.name]}
                    id={addon.name}
                    onChange={(e) =>
                      setAddons({ ...addons, [addon.name]: e.target.checked })
                    }
                  />
                  <Image
                    src={addon.icon}
                    height={44}
                    style={{ minWidth: "60px", maxWidth: "60px" }}
                    alt="icon"
                  />
                  <Typography textAlign="left" fontSize={"14px"}>
                    {addon.message}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
          <CustomButton kind="primary" buttonProps={{ onClick: handleAddon }}>
            Done
          </CustomButton>
        </Stack>
      </Menu>
      <Tooltip
        describeChild
        arrow
        title="Add modules to your task and get more out of your scraped data"
        placement="right"
        sx={{ maxWidth: "250px", color: "var(--accent)" }}
      >
        <CustomButton
          buttonProps={{
            type: "button",
            onClick: handleAddonClick,
            sx: { width: "100%" },
          }}
        >
          + Add-on
        </CustomButton>
      </Tooltip>
    </>
  );
}
