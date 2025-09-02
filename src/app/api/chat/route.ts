import { google } from '@ai-sdk/google';
import { streamText, UIMessage, convertToModelMessages } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {

  try {
    const { message } = await req.json();

    if (!message) {
      return Response.json({
        success: false,
        message: "Not recieved the news article"
      }, { status: 500 })
    }
    
    const prompt = `Based on the news article I'll provide, your task is to act as a professional summarizer and analyst. First, summarize the article to make it easy to understand. Highlight the most important points. Then, find at least three relevant supporting facts from the web to add context or increase the length of the response, making it more informative. Present these supporting facts in a separate section. The final response should be helpful and easy for a general audience to read. Here is the article: ${message}`

    const result = streamText({
      model: google('gemini-2.5-flash'),
      prompt
    });

    return result.toTextStreamResponse();
  } catch (err) {
    console.log("Error summarising the news: ", err)
    return Response.json({
      success: false,
      message: "Couldn't call the AI"
    }, { status: 405 })
  }

}