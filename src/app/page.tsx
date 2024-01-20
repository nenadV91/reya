import { redirect } from "next/navigation";

export default function Index() {
  redirect("/trading/overview/history");
}
