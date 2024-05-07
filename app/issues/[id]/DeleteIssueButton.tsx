"use client";
import Spinner from "@/app/components/Spinner";
import { AlertDialog, Button } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: Number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDeleteIssue = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`/api/issues/${issueId}`);
      console.log(response);
      router.push("/issues");
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button disabled={loading ? true : false} color="red">
            {loading ? "Deleting.." : "Delete Issue"}
            {loading && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content className="AlertDialogContent">
          <AlertDialog.Title className="AlertDialogTitle">
            Confirm Deletion
          </AlertDialog.Title>
          <AlertDialog.Description className="AlertDialogDescription">
            Are you sure you want to delete this issue?. This action cannot be
            undone.
          </AlertDialog.Description>
          <div className="flex justify-end space-x-4 mt-4">
            <AlertDialog.Cancel>
              <Button color="gray">Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button onClick={handleDeleteIssue} color="red">
                Yes, delete issue
                {/* {loading && <Spinner />} */}
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content className="AlertDialogContent">
          <AlertDialog.Title className="AlertDialogTitle">
            Error
          </AlertDialog.Title>
          <AlertDialog.Description className="AlertDialogDescription">
            An error occured while deleting the issue
          </AlertDialog.Description>
          <div className="flex justify-end space-x-4 mt-4">
            <AlertDialog.Action>
              <Button color="gray" variant="soft">
                Ok
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
