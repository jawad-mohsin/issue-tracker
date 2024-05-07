import { Button } from "@radix-ui/themes";
import React from "react";

const DeleteIssueButton = ({ issueId }: { issueId: Number }) => {
  return <Button color="red">Delete Issue</Button>;
};

export default DeleteIssueButton;
