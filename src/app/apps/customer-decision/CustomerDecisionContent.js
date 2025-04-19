"use client";

import { useSearchParams } from "next/navigation";

export default function CustomerDecisionContent() {
  const searchParams = useSearchParams();
  const decision = searchParams.get("decision");

  return (
    <div>
      <h1>Customer Decision</h1>
      <p>User selected: {decision}</p>
    </div>
  );
}
