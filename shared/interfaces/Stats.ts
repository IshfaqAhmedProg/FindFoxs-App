import React from "react";
export interface Stat {
  title?: string | number | React.ReactNode;
  stat?: string | number | React.ReactNode;
  statUnit?: string | React.ReactNode;
}
export default interface Stats {
  statTitle: string;
  statTitleTrailing?: string;
  stats: Array<Stat>;
}
