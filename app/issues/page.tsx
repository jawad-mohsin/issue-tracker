"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { Table } from "@radix-ui/themes";
import axios from "axios";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMEssage";
import { CiEdit } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";

interface Issue {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

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
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Ttile</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Updated At</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Edit</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>{issue.title}</Table.Cell>
              <Table.Cell>{issue.description}</Table.Cell>
              <Table.Cell>{issue.staus}</Table.Cell>
              <Table.Cell>{issue.createdAt}</Table.Cell>
              <Table.Cell>{issue.updatedAt}</Table.Cell>
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
