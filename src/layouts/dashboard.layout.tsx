import { Sidebar } from "../components/dashboard/sidebar.component";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="flex flex-col w-full py-8 px-8">{children}</div>
    </div>
  );
};
