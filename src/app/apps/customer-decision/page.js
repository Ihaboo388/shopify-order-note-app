"use client";

import { Suspense } from "react";
import CustomerDecisionContent from "./CustomerDecisionContent";

export default function CustomerDecisionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomerDecisionContent />
    </Suspense>
  );
}
