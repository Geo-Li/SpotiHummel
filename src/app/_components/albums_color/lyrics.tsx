import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { LoaderCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Lyrics() {
  const s3Url = "https://spotihummel.s3.us-east-2.amazonaws.com/";
  const [trackName, setTrackName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [lyricsUrl, setLyricsUrl] = useState<string>("");

  const fetchLyrics = async () => {
    if (!trackName.trim()) {
      alert("Please enter the track name");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`/api/lyrics-pdf/${trackName}`);
      const bucket_key = response.data;
      setLyricsUrl(bucket_key);
    } catch (error) {
      console.error(error);
      alert(`Error fetching album info: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col space-y-5">
        <label className="text-xl font-medium">
          Enter the track name to get the lyrics
        </label>
        <div className="flex flex-row justify-center space-x-3">
          <Input
            placeholder="Enter the track name"
            value={trackName}
            onChange={(e) => setTrackName(e.target.value)}
            className="flex w-[300px] justify-center bg-white"
          />
          <Button
            variant="outline"
            type="submit"
            onClick={fetchLyrics}
            disabled={loading}
          >
            <span className="flex flex-row items-center justify-center space-x-3">
              {loading && <LoaderCircleIcon className="animate-spin" />}
              <span>{loading ? "Loading..." : "Submit"}</span>
            </span>
          </Button>
        </div>

        <div className="h-[75vh] w-[50vw]">
          {lyricsUrl && (
            <iframe
              src={s3Url + lyricsUrl}
              className="h-full w-full rounded-md border-8 border-stone-600"
              title="PDF Viewer"
            />
          )}
        </div>
      </div>
    </div>
  );
}
