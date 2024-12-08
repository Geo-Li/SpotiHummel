import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  req: Request,
  { params }: { params: { track_name: string } },
) {
  try {
    const { track_name } = params;
    if (!track_name) {
      return NextResponse.json(
        { error: "Track name is required" },
        { status: 400 },
      );
    }

    const apiUrl = `https://7xyp8btcja.execute-api.us-east-2.amazonaws.com/prod/lyrics-pdf/${track_name}`;
    const response = await axios.get(apiUrl);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching data from external API:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
