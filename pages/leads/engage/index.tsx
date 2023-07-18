import Image from "next/image";
import UnderMaintenance from "@public/Images/UnderMaintenance.png";
export default function EngageLeads() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image src={UnderMaintenance} alt="Page Under Maintenance" width={400} />
    </div>
  );
}
