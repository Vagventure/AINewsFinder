import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {

  try {
    const { headline, date, description, content, sourceUrl } = await req.json();

    if (!headline) {
      return Response.json({
        success: false,
        message: "Not recieved the news article"
      }, { status: 500 })
    }

    const prompt = `You are a news assistant. I will provide you with data from a news API.  
                    Your task is to:  
                    1. Summarize the news in clear and engaging language.  
                    2. Highlight the main points in bullet form.  
                    3. Add extra background or context by checking the source URL or related articles online.  
                    4. Make the output suitable for someone who wants a quick but complete understanding.  
                    
                    Here is the data:  
                    - Headline: ${headline}  
                    - Date: ${date}  
                    - Description: ${description}  
                    - Content: ${content}  
                    - Source URL: ${sourceUrl}  
                    
                    Output format instructions:  
                  - Return the summary strictly as plain text.  
                  - Do not use any HTML tags such as <br>, <p>, <ul>, or <li>.  
                  - Use "\n" at the end of each line.  
                  - Use "\n\n" to separate paragraphs.  
                  - Use "-" for bullet points, not HTML.  
                    
                    Now generate the summary.

                    `

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