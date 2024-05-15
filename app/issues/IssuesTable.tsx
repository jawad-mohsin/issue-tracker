import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { CiEdit } from "react-icons/ci";
import IssueStatusBadge from "../components/IssueStatusBadge";
import { Issue } from "@prisma/client";

interface Props {
  issues: Issue;
}

const IssuesTable = ({ issues }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
          {/* <Table.ColumnHeaderCell className="hidden md:table-cell">
              Description
            </Table.ColumnHeaderCell> */}
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden sm:table-cell">
            Created At
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Updated At
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Edit</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell className="text-violet text-violet-700 hover:underline">
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
            </Table.Cell>
            {/* <Table.Cell className="hidden md:table-cell">
                {issue.description}
              </Table.Cell> */}
            <Table.Cell>
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden sm:table-cell">
              {issue.createdAt}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.updatedAt}
            </Table.Cell>
            <Table.Cell>
              <Link href={`/issues/${issue.id}/edit`}>
                <CiEdit />
              </Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default IssuesTable;
