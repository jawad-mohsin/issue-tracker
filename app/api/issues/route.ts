import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../validationSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOptions";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

// export async function GET() {
//   try {
//     const issues = await prisma.issue.findMany();

//     // Convert createdAt and updatedAt to DateStrings
//     const formattedIssues = issues.map((issue) => ({
//       ...issue,
//       createdAt: issue.createdAt.toLocaleString(),
//       updatedAt: issue.updatedAt.toLocaleString(),
//     }));

//     return NextResponse.json(formattedIssues, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Failed to fetch issues" },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const status = searchParams.get("status");

//     let issues;
//     if (status) {
//       issues = await prisma.issue.findMany({
//         where: {
//           status: status.toString(), // Ensure status is a string
//         },
//       });
//     } else {
//       issues = await prisma.issue.findMany();
//     }

//     // Convert createdAt and updatedAt to DateStrings
//     const formattedIssues = issues.map((issue) => ({
//       ...issue,
//       createdAt: issue.createdAt.toLocaleString(),
//       updatedAt: issue.updatedAt.toLocaleString(),
//     }));

//     return NextResponse.json(formattedIssues, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Failed to fetch issues" },
//       { status: 500 }
//     );
//   }
// }

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1", 10);
    console.log("Page", page);
    const pageSize = 10;

    let where;
    if (status) {
      where = {
        status: status.toString(), // Ensure status is a string
      };
    }

    const totalCount = await prisma.issue.count({ where });

    let issues;
    if (status) {
      issues = await prisma.issue.findMany({
        where,
        take: pageSize,
        skip: (page - 1) * pageSize,
      });
    } else {
      issues = await prisma.issue.findMany({
        take: pageSize,
        skip: (page - 1) * pageSize,
      });
    }

    // Convert createdAt and updatedAt to DateStrings
    const formattedIssues = issues.map((issue) => ({
      ...issue,
      createdAt: issue.createdAt.toLocaleString(),
      updatedAt: issue.updatedAt.toLocaleString(),
    }));

    return NextResponse.json(
      { totalCount, issues: formattedIssues },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch issues" },
      { status: 500 }
    );
  }
}
