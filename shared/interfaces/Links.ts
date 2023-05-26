import { SvgIconProps } from "@mui/material";
import { Url } from "url";
export interface SimpleLink {
  name: string;
  goto: string | Url;
}
export interface NavLinks extends SimpleLink {
  handler?: (param: any) => void;
  icon?: React.ReactElement<SvgIconProps>;
  badge?: boolean;
}
export interface SideBarLinks extends NavLinks {
  children?: Array<SimpleLink>;
  expanded?: boolean;
}
