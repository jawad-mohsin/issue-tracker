import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Issue, Status } from "@prisma/client";
import { Text, Heading, Flex, Card } from "@radix-ui/themes";
import React from "react";

const IssueDetail = ({ issue }: { issue: Issue }) => {
  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="6" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <p> {issue.description}</p>
      </Card>
    </div>
  );
};

export default IssueDetail;
