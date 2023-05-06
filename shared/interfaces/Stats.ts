import React from "react";
export interface Stat {
  title: string | React.ReactElement | JSX.Element;
  stat?: string;
  statUnit?: string;
}
export default interface Stats {
  statTitle: string;
  statTitleTrailing: string;
  stats: Array<Stat>;
}
