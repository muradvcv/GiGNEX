"use client";

import { Briefcase } from "lucide-react";
import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextArea,
  TextField,
} from "@heroui/react";

import { useSession } from "@/lib/auth-client";
import { CreateProposal } from "@/lib/api/proposal";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function ProposalModal({
  taskId,
  taskTitle,
  budget,
  deadline,
  clientEmail,
  taskStatus,
}) {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const freelancer = session?.user;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const proposal = {
      task_id: taskId,
      task_title: taskTitle,
      client_email: clientEmail,
      proposed_budget: Number(form.proposed_budget.value),
      estimated_days: Number(form.estimated_days.value),
      cover_note: form.cover_note.value,

      freelancer_email: freelancer?.email,
      freelancer_name: freelancer?.name,
      freelancer_image: freelancer?.image,

      status: "pending",
      taskStatus,
      submitted_at: new Date().toISOString(),
    };

    try {
      await CreateProposal(proposal);

      toast.success("Proposal submitted successfully!");

      router.push("/dashboard/freelancer/myproposal");
    } catch (error) {
      toast.error(error.message || "Failed to submit proposal");
    }
  };

  if (isPending) {
    return <p className="text-sm text-gray-500">Loading...</p>;
  }

  return (
    <Modal>
      <Button color="primary">Submit Proposal</Button>

      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="w-full max-w-4xl">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Icon className="bg-cyan-100 text-cyan-600">
                <Briefcase className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Submit Proposal</Modal.Heading>
              <p className="mt-2 text-sm text-default-500">
                Submit your proposal for this task.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 rounded-xl bg-default-100 p-4">
                <div>
                  <p className="text-xs text-default-500">Task</p>
                  <p className="font-semibold">{taskTitle}</p>
                </div>

                <div>
                  <p className="text-xs text-default-500">Budget</p>
                  <p className="font-semibold text-green-600">${budget}</p>
                </div>

                <div>
                  <p className="text-xs text-default-500">Deadline</p>
                  <p className="font-semibold">
                    {deadline ? new Date(deadline).toLocaleDateString() : "N/A"}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-xs text-default-500">Client Email</p>
                  <p className="font-semibold break-all">{clientEmail}</p>
                </div>

                <div>
                  <p className="text-xs text-default-500">Freelancer</p>
                  <p className="font-semibold break-all">
                    {freelancer?.email}
                  </p>
                </div>
              </div>

              <Surface className="rounded-xl p-5">
                <form
                  id="proposalForm"
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                  <TextField variant="secondary">
                    <Label>Proposed Budget (USD)</Label>
                    <Input
                      name="proposed_budget"
                      type="number"
                      placeholder="Enter your bid"
                      required
                    />
                  </TextField>

                  <TextField variant="secondary">
                    <Label>Estimated Days</Label>
                    <Input
                      name="estimated_days"
                      type="number"
                      placeholder="e.g. 5"
                      required
                    />
                  </TextField>

                  <TextField className="md:col-span-2" variant="secondary">
                    <Label>Cover Note</Label>
                    <TextArea
                      name="cover_note"
                      rows={4}
                      placeholder="Explain why you're the best fit..."
                      required
                    />
                  </TextField>
                </form>
              </Surface>
            </Modal.Body>

            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>

              <Button type="submit" form="proposalForm" color="primary">
                Submit Proposal
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}