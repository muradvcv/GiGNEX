
import EditProfile from "@/components/dashboard/freelancer/EditProfile";
import { getUserForServer } from "@/lib/user/getuser";

const EditProfilePage = async () => {
  const session = await getUserForServer();

  return (
    <EditProfile user={session?.user} />
  );
};

export default EditProfilePage;