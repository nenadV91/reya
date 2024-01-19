import { Sidebar } from "@/components/Sidebar";
import { Box } from "@mui/material";

export default function TradingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />

        {children}
      </Box>
    </>
  );
}
