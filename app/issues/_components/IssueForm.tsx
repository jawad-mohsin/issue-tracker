"use client";

import React, { useState } from "react";
import { TextField, Callout, Button, Text, Flex } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { MdOutlineDownloadDone } from "react-icons/md";
import { Issue } from "@prisma/client";
import toast, { Toaster } from "react-hot-toast";

type IssueFormData = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue | null;
}

const IssueForm = ({ issue }: Props) => {
  console.log("ccgh", issue);

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
        toast.success("Issue updated successfully!");
      } else {
        await axios.post("/api/issues", data);
        toast.success("Issue created successfully!");
      }
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        router.push("/issues");
      }, 2000);
      console.log(data);
    } catch (err) {
      setSubmitting(false);
      toast.error("Failed to update issue");
    }
  });

  return (
    <div>
      <form className="max-w-xl space-y-5" onSubmit={onSubmit}>
        <TextField.Root
          placeholder="Title"
          defaultValue={issue?.title}
          {...register("title")}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          defaultValue={issue?.description}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Flex justify="end">
          <Button disabled={isSubmitting}>
            <Text className="cursor-pointer">
              {issue ? "Update Issue" : "Create New Issue"}
            </Text>
            {isSubmitted && <MdOutlineDownloadDone />}
            {isSubmitting && <Spinner />}
          </Button>
        </Flex>
      </form>
      <Toaster />
    </div>
  );
};

export default IssueForm;
