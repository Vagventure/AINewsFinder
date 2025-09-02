import { NextResponse } from "next/server";
const apikey = process.env.API_KEY;

export async function POST(req: Request) {

    try {
        const { query } = await req.json();
        const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&max=5&apikey=` + apikey;

        const res = await fetch(url);
        const data = await res.json();
        return NextResponse.json(data.articles)
    } catch (err) {
        console.log("Error getting news from api: ", err);
        return Response.json({
            success: false,
            message: "Error fetching the news"
        })
    }

}
