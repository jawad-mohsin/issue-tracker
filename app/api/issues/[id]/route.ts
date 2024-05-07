import { createIssueSchema } from "../../../validationSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function PUT(req: NextRequest) {
  try {
    const { id, title, description, status } = await req.json();

    const updatedIssue = await prisma.issue.update({
      where: { id: id },
      data: { title, description, status },
    });

    return NextResponse.json(updatedIssue, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update issue" },
      { status: 500 }
    );
  }
}
