import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const expenses = await prisma.expense.findMany({
    orderBy: { date: "desc" },
  });
  return NextResponse.json(expenses);
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<{
    title: string;
    amount: string | number;
    category: string;
    date: string; // yyyy-mm-dd
  }>;

  const title = (body.title ?? "").trim();
  const category = (body.category ?? "Other").trim() || "Other";
  const amountNumber =
    typeof body.amount === "number"
      ? body.amount
      : Number.parseFloat(String(body.amount ?? ""));

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  if (!Number.isFinite(amountNumber) || amountNumber <= 0) {
    return NextResponse.json(
      { error: "Amount must be a positive number" },
      { status: 400 },
    );
  }

  const dateValue = body.date ? new Date(body.date) : new Date();
  if (Number.isNaN(dateValue.getTime())) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  const expense = await prisma.expense.create({
    data: { title, amount: amountNumber, category, date: dateValue },
  });

  return NextResponse.json(expense, { status: 201 });
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id")?.trim();

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await prisma.expense.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

