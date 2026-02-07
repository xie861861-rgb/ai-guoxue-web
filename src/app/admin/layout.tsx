import { redirect } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 暂时重定向到 admin page
  redirect("/admin");
}
