import { getUserForServer } from "@/lib/user/getuser";
import { getPaymentByFreelancer } from "@/lib/actions/payment";
import { getProposalByFreelancer } from "@/lib/api/proposal";
import FreelancerOverview from "@/components/dashboard/freelancer/Overview";

export default async function FreelancerPage() {
  const session = await getUserForServer();

  if (!session?.user) return null;

  const proposalRes = await getProposalByFreelancer(
    session.user.email
  );

  const paymentRes = await getPaymentByFreelancer(
    session.user.id
  );

  const proposals = proposalRes?.data || proposalRes || [];
  const payments = paymentRes?.data || [];

  return (
    <FreelancerOverview
      proposals={proposals}
      payments={payments}
    />
  );
}