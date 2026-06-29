import AllUserHistory from "@/components/dashboard/admin/AllUserHistory";
import { getAllUser } from "@/lib/actions/admin";


const UsersPage = async () => {
  const result = await getAllUser();

  return <AllUserHistory users={result?.data || []} />;
};

export default UsersPage;