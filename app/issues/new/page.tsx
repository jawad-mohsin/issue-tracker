import React from "react";
import { TextField, TextArea, Button } from "@radix-ui/themes";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-5">
      <TextField.Root placeholder="Title"></TextField.Root>
      <TextArea placeholder="Description" />
      <Button>Create New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
