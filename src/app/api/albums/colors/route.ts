import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || !body.albumsInfo) {
      return NextResponse.json(
        { error: "albumsInfo is required in the request body" },
        { status: 400 },
      );
    }
    const apiUrl =
      "https://qycu2ntasf.execute-api.us-east-2.amazonaws.com/production/albums/colors";
    const response = await axios.post(apiUrl, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching data from external API:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
