"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function UpsellPage() {
  const searchParams = useSearchParams();
  const shop = searchParams.get("shop"); // to track which shop
  const [status, setStatus] = useState(null);

  const handleDecision = async (decision) => {
    const res = await fetch("/api/save-decision", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shop,
        decision,
        timestamp: new Date().toISOString(),
      }),
    });

    const data = await res.json();
    setStatus(data.message);
  };

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>🔥 Special Offer Just for You!</h1>
      <p>Would you like to upgrade your product for only $9.99?</p>

      <button
        onClick={() => handleDecision("accepted")}
        style={{
          marginRight: 10,
          padding: "10px 20px",
          backgroundColor: "green",
          color: "white",
        }}
      >
        Accept
      </button>
      <button
        onClick={() => handleDecision("declined")}
        style={{ padding: "10px 20px", backgroundColor: "red", color: "white" }}
      >
        Decline
      </button>

      {status && <p style={{ marginTop: 20 }}>{status}</p>}
    </div>
  );
}
