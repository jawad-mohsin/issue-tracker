"use client";
import React from "react";
// import IssueForm from "../_components/IssueForm";
import dynamic from "next/dynamic";

const NewIssuePage = () => {
  const IssueForm = dynamic(() => import("../_components/IssueForm"), {
    ssr: false,
  });

  return (
    <div>
      <IssueForm />
    </div>
  );
};

export default NewIssuePage;
