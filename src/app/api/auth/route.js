// src/app/api/auth/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";

const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const shop = searchParams.get("shop");
  const hmac = searchParams.get("hmac");
  const code = searchParams.get("code");
  const timestamp = searchParams.get("timestamp");

  if (!shop || !hmac || !code || !timestamp) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  // Rebuild message for HMAC
  const params = Object.fromEntries(searchParams);
  delete params["hmac"];
  const message = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  const generatedHash = crypto
    .createHmac("sha256", SHOPIFY_API_SECRET)
    .update(message)
    .digest("hex");

  if (generatedHash !== hmac) {
    return NextResponse.json({ error: "Invalid HMAC" }, { status: 403 });
  }

  // Exchange temporary code for access token
  const response = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: SHOPIFY_API_KEY,
      client_secret: SHOPIFY_API_SECRET,
      code,
    }),
  });

  const data = await response.json();

  if (!data.access_token) {
    return NextResponse.json(
      { error: "Failed to get access token" },
      { status: 500 }
    );
  }

  // Token received: You can store it in a DB here

  console.log("Access Token:", data.access_token);

  // Redirect back to Shopify Admin
  return NextResponse.redirect(`https://${shop}/admin/apps`);
}
