import CustomBox from "@/components/CustomComponents/CustomBox";
import CustomButton from "@/components/CustomComponents/CustomButton";
import CustomCheckbox from "@/components/CustomComponents/CustomCheckbox";
import EmailAndContactsIcon from "@/public/Icons/EmailAndContactsScraper.svg";
import { Menu, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
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
          <Typography variant="h4" textAlign={"center"}>
            These add-ons will be <br />
            executed along with the task
          </Typography>
          <Stack gap={2}>
            {addOnList.map((addon) => {
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
                    style={{ minWidth: "60px", maxWidth: "60px" }}
                    alt="icon"
                  />
                  <Typography
                    textAlign="left"
                    fontSize={"14px"}
                    maxWidth={"30ch"}
                    minHeight={"56px"}
                  >
                    {addon.message}
                  </Typography>
                </CustomBox>
              );
            })}
          </Stack>
          <CustomButton kind="secondary" buttonProps={{ onClick: handleAddon }}>
            Done
          </CustomButton>
        </Stack>
      </Menu>

      <CustomButton
        buttonProps={{
          type: "button",
          onClick: handleAddonClick,
          sx: { width: "100%" },
        }}
      >
        + Add-on
      </CustomButton>
    </>
  );
}
