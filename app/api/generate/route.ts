import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    const chatCompletion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Summarize this note:\n${prompt}`,
          },
        ],
        model: "llama-3.3-70b-versatile",
      })

    const response =
      chatCompletion.choices[0]?.message?.content

    return Response.json({
      success: true,
      response,
    })
  } catch (error) {
    console.log(error)

    return Response.json({
      success: false,
      error: "Failed to generate AI response",
    })
  }
}