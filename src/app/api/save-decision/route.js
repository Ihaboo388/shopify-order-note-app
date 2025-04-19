export async function POST(request) {
  try {
    const body = await request.json();
    const { shop, decision, timestamp } = body;

    console.log(`[LOG] ${shop} - ${decision} at ${timestamp}`);

    // TODO: Save to database or external service (like Google Sheets, Firebase, MongoDB, etc.)

    return new Response(
      JSON.stringify({ message: `Customer ${decision} the offer!` }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error saving decision" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
