import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import Link from "next/link";
import { Grid, Card, Flex, Heading, Text, Box, Button } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Pencil2Icon } from "@radix-ui/react-icons";
interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap="6" my="2">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card>
          <p> {issue.description}</p>
        </Card>
      </Box>
      <Box>
        <Button>
          <Link
            className="flex justify-center items-center"
            href={`/issues/${issue.id}/edit`}
          >
            <Pencil2Icon className="mr-2" />
            Edit Issue
          </Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
