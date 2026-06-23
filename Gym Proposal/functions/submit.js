export async function onRequestPost(context) {
  try {
    // 1. Grab the client state payload from the browser's form submission
    const { clientName, contactEmail, signatureText, currentPrice, gymName } = await context.request.json();

    // 2. Fetch the API key that we will safely store in Cloudflare's dashboard
    const apiKey = context.env.RESEND_API_KEY;

    // 3. Forward the details privately to Resend's secure servers
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: "stakr.dev@gmail.com",
        subject: `⚡ PROPOSAL AUTOSIGNED: ${gymName}`,
        html: `
          <div style="font-family: monospace; padding: 20px; background-color: #000; color: #fff; border: 4px solid #fff;">
            <h2 style="color: #eab308; text-transform: uppercase;">Proposal Execution Complete</h2>
            <hr style="border-color: #333;" />
            <p><strong>Gym Brand:</strong> ${gymName}</p>
            <p><strong>Authorized Rep:</strong> ${clientName}</p>
            <p><strong>Contact Email:</strong> ${contactEmail}</p>
            <p><strong>Digital Monogram Signature:</strong> <span style="color: #eab308; font-style: italic;">${signatureText}</span></p>
            <p><strong>Total Package Investment:</strong> $${currentPrice}</p>
          </div>
        `,
      }),
    });

    const result = await resendResponse.json();

    return new Response(JSON.stringify(result), {
      status: resendResponse.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  }
}
