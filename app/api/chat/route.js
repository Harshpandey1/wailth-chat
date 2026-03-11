export async function POST(req) {
  const { messages } = await req.json()

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.3-8b-instruct:free",
        messages: [
          {
            role: "system",
            content: "You are WaiLTH's AI Finance Assistant. Help users with budgeting, saving, investing and spending. Be concise and friendly."
          },
          ...messages
        ]
      })
    }
  )

  const data = await response.json()
  return Response.json({ reply: data.choices[0].message.content })
}
