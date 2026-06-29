"use client";

import { useState } from "react";
import { Modal, Button, Input } from "@heroui/react";
import { Link2, CheckCircle2 } from "lucide-react";
import Swal from "sweetalert2";

export default function DeliverableModal({ task, taskId }) {
  const [projectLink, setProjectLink] = useState("");
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const handleSubmit = async () => {
    if (!projectLink.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Project Link Required",
        text: "Please enter your project/deliverable URL.",
      });
    }

    try {
      new URL(projectLink);
    } catch {
      return Swal.fire({
        icon: "error",
        title: "Invalid URL",
        text: "Please enter a valid URL.",
      });
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${baseUrl}/api/tasks/${taskId}/deliverable`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deliverable_url: projectLink,
          }),
        }
      );
      console.log("BASE URL:", process.env.NEXT_PUBLIC_API_URL);
      console.log("Task ID:", taskId);
      console.log(
        "Request URL:",
        `${baseUrl}/api/tasks/${taskId}/deliverable`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit");
      }

      await Swal.fire({
        icon: "success",
        title: "Project Submitted",
        text: "Task marked as completed successfully.",
      });

      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      <Button
        color="primary"
        radius="md"
        startContent={<CheckCircle2 size={16} />}
      >
        Submit Deliverable
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="max-w-xl">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>
                Submit Deliverable
              </Modal.Heading>

              <p className="mt-2 text-sm text-gray-500">
                Submit your final project link for{" "}
                <span className="font-semibold text-black">
                  {task?.title}
                </span>
              </p>
            </Modal.Header>

            <Modal.Body>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Project / Deliverable URL
                  </label>

                  <Input
                    required
                    size="lg"
                    
                    placeholder="https://github.com/username/project"
                    value={projectLink}
                    onChange={(e) =>
                      setProjectLink(e.target.value)
                    }
                  />
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <h4 className="font-medium text-amber-700">
                    Important
                  </h4>

                  <p className="mt-1 text-sm text-amber-600">
                    After submitting this deliverable, the task
                    will be marked as completed. Make sure the
                    project link is final and accessible.
                  </p>
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button
                slot="close"
                variant="flat"
              >
                Cancel
              </Button>

              <Button
                color="success"
                isLoading={loading}
                onPress={handleSubmit}
              >
                Mark as Completed
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}