"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { Table } from "@radix-ui/themes";
import axios from "axios";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { CiEdit } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import IssueStatusBadge from "../components/IssueStatusBadge";

const IssuesPage = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/issues");
      console.log(response.data);
      setIssues(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);

      setError("Error occured while fetching data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-5">
        <h1 className="text-center font-bold mb-5">Current Issues</h1>
        <Button>
          <Link className="flex justify-center items-center" href="/issues/new">
            New Issue <FaPlus className="ml-2" />
          </Link>
        </Button>
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Ttile</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Description
            </Table.ColumnHeaderCell>
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
              <Table.Cell className="hidden md:table-cell">
                {issue.description}
              </Table.Cell>
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
      {loading && (
        <div className="p-5 flex justify-center items-center mt-32">
          <Spinner />
        </div>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default IssuesPage;
