import AdminTaskTable from "@/components/dashboard/admin/AdminTaskTable";
import { getAllTasks } from "@/lib/actions/admin";


const AdminTaskHistoryPage = async () => {
  const result = await getAllTasks();

  return <AdminTaskTable tasks={result?.data || []} />;
};

export default AdminTaskHistoryPage;