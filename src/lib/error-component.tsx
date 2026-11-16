import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  if (typeof error === "object" && error !== null && "message" in error) {
    const message = error.message;
    if (typeof message === "string" && message) return message;
  }
  return "Something went wrong.";
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-paper px-6 text-ink">
      <TriangleAlert className="size-8 text-danger" aria-hidden />
      <p className="max-w-lg text-center text-muted">{errorMessage(error)}</p>
    </div>
  );
}
