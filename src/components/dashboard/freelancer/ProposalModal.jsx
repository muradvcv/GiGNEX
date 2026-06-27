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

export function ProposalModal({
  taskId,
  freelancerEmail,
  taskTitle,
  budget,
}) {
  return (
    <Modal>
      <Button color="primary">Submit Proposal</Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="w-full max-w-4xl">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Icon className="bg-cyan-100 text-cyan-600">
                <Briefcase className="size-5" />
              </Modal.Icon>

              <Modal.Heading>Submit Proposal</Modal.Heading>

              <p className="text-sm text-default-500 mt-2">
                Submit your proposal for this task. Make your offer realistic and
                competitive.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">

              {/* Task Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 rounded-xl bg-default-100 p-4">

                <div>
                  <p className="text-xs text-default-500">Task ID</p>
                  <p className="font-semibold break-all">{taskId}</p>
                </div>

                <div>
                  <p className="text-xs text-default-500">Task</p>
                  <p className="font-semibold">{taskTitle}</p>
                </div>

                <div>
                  <p className="text-xs text-default-500">
                    Client Budget
                  </p>
                  <p className="font-semibold text-green-600">
                    ${budget}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-default-500">
                    Freelancer
                  </p>
                  <p className="font-semibold break-all">
                    {freelancerEmail}
                  </p>
                </div>

              </div>

              <Surface variant="default" className="p-5 rounded-xl">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* Hidden Inputs */}
                  <input
                    type="hidden"
                    name="task_id"
                    value={taskId}
                  />

                  <input
                    type="hidden"
                    name="freelancer_email"
                    value={freelancerEmail}
                  />

                  {/* Proposed Budget */}
                  <TextField
                    name="proposed_budget"
                    variant="secondary"
                  >
                    <Label>Proposed Budget (USD)</Label>

                    <Input
                      type="number"
                      placeholder="Enter your bid"
                    />
                  </TextField>

                  {/* Estimated Days */}
                  <TextField
                    name="estimated_days"
                    variant="secondary"
                  >
                    <Label>Estimated Days</Label>

                    <Input
                      type="number"
                      placeholder="e.g. 5 Days"
                    />
                  </TextField>

                  {/* Cover Note */}
                  <TextField
                    className="md:col-span-2"
                    name="cover_note"
                    variant="secondary"
                  >
                    <Label>Cover Note</Label>

                    <TextArea
                      rows={3}
                      placeholder="Explain why you are the best fit for this task..."
                    />
                  </TextField>

                </form>
              </Surface>
            </Modal.Body>

            <Modal.Footer>

              <Button
                slot="close"
                variant="secondary"
              >
                Cancel
              </Button>

              <Button color="primary">
                Submit Proposal
              </Button>

            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}