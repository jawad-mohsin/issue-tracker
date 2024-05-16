import React from "react";
import IssueForm from "../../_components/IssueForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Flex } from "@radix-ui/themes";
import GoBack from "@/app/components/GoBack";

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  console.log("id", params.id);
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();
  return (
    <>
      <Flex justify={"center"}>
        <IssueForm issue={issue} />
      </Flex>
      <GoBack />
    </>
  );
};

export default EditIssuePage;
