import Sidebar from "./Sidebar";
import DashboardNavbar from "./DashBoardNavbar";

export default function DashboardLayout({ children }) {
  const user = JSON.parse(localStorage.getItem("user")) || { name: "User", role: "user" };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role={user.role} />
      <div className="flex-1 flex flex-col">
        <DashboardNavbar username={user.name} />
        <main className="flex-1 bg-gradient-to-br from-green-50 to-green-10 p-4 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
