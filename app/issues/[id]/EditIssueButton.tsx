import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditIssueButton = ({ issueId }: { issueId: Number }) => {
  return (
    <Button>
      <Link
        className="flex justify-center items-center"
        href={`/issues/${issueId}/edit`}
      >
        <Pencil2Icon className="mr-2" />
        Edit Issue
      </Link>
    </Button>
  );
};

export default EditIssueButton;
