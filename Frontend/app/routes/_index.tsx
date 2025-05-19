import { Outlet } from "@remix-run/react";
import Sidebar from "~/components/Sidebar";

export default function Index() {
  return (
    <>
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
} 