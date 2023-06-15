import React from "react";
export interface Stat {
  title: string | React.ReactNode;
  stat?: string | React.ReactNode;
  statUnit?: string | React.ReactNode;
}
export default interface Stats {
  statTitle: string;
  statTitleTrailing?: string;
  stats: Array<Stat>;
}
