import { SvgIconProps } from "@mui/material";
import { Url } from "url";
export interface SimpleLink {
  name: string;
  goto: string | Url;
  children?: { [key: string]: SimpleLink };
}
export interface NavLinks extends SimpleLink {
  handler?: (param: any) => void;
  icon?: React.ReactElement<SvgIconProps>;
  badge?: boolean;
}
export interface SideBarLinks extends NavLinks {
  expanded?: boolean;
}
