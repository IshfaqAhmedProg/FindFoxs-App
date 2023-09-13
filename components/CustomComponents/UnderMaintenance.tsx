import React from "react";
import UnderMaintenanceImage from "@public/Images/UnderMaintenance.png";
import Image from "next/image";

export default function UnderMaintenance() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        src={UnderMaintenanceImage}
        alt="Page Under Maintenance"
        width={400}
      />
    </div>
  );
}
