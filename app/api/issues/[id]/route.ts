import { issueSchema } from "../../../validationSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params: { id } }: Props) {
  try {
    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const updatedIssue = await prisma.issue.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title,
        description: body.description,
      },
    });
    if (updatedIssue) {
      return NextResponse.json(updatedIssue, { status: 200 });
    } else {
      return NextResponse.json({ message: "Invalid issue" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update issue" },
      { status: 500 }
    );
  }
}
