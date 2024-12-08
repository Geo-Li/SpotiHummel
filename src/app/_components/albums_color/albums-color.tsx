import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { LoaderCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AlbumsInfo = {
  id: string;
  images: { url: string; height: number; width: number }[];
  name: string;
};

export default function AlbumsColor() {
  const s3Url = "https://spotihummel.s3.us-east-2.amazonaws.com/";
  const [artist, setArtist] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [albumsInfo, setAlbumsInfo] = useState<AlbumsInfo[]>([]);
  const [color, setColor] = useState<string>("bg-white");
  const [coverUrls, setCoverUrls] = useState<string[]>([]);

  const fetchInfo = async () => {
    if (!artist.trim()) {
      alert("Please enter an artist name");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`/api/albums/info/${artist}`);
      const albumsInfo = response.data;
      setAlbumsInfo(albumsInfo["albumsInfo"]);
    } catch (error) {
      console.error(error);
      alert(`Error fetching album info: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchColor = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/albums/colors",
        { albumsInfo: albumsInfo },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const avgAlbumsColor = response.data;
      setColor(avgAlbumsColor);
    } catch (error) {
      console.error(error);
      alert(`Error fetching album info: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchAlbumCovers = async () => {
    if (!artist.trim()) {
      alert("Please enter an artist name");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `/api/albums/info/${artist}`,
        { albumsInfo: albumsInfo },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const bucketKeys = response.data;
      setCoverUrls(bucketKeys["bucketKeys"]);
    } catch (error) {
      console.error(error);
      alert(`Error fetching album info: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (albumsInfo && albumsInfo.length > 0) {
      fetchColor();
      fetchAlbumCovers();
    }
  }, [albumsInfo]);

  return (
    <div className="flex flex-row space-x-[5vw] p-6">
      <div className="flex flex-col justify-center space-y-5">
        <label className="text-xl font-medium">
          Enter the artist name to get the average color of their album
        </label>
        <div className="flex flex-row justify-center space-x-3">
          <Input
            placeholder="Enter the artist name"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="flex w-[300px] justify-center bg-white"
          />
          <Button
            variant="outline"
            type="submit"
            onClick={fetchInfo}
            disabled={loading}
          >
            <span className="flex flex-row items-center justify-center space-x-3">
              {loading && <LoaderCircleIcon className="animate-spin" />}
              <span>{loading ? "Loading..." : "Submit"}</span>
            </span>
          </Button>
        </div>

        <div className="flex flex-row items-center justify-center space-x-5">
          <div
            className="h-[200px] w-[200px] rounded-lg transition-colors duration-300"
            style={{ backgroundColor: color }}
          />
          <Button variant="outline" onClick={() => setColor("white")}>
            Switch Color
          </Button>
        </div>
      </div>

      <div className="w-[400px] rounded-lg border p-4">
        <h2 className="mb-3 text-3xl font-medium">Album Covers</h2>
        <div className="h-[600px] overflow-y-auto">
          <div className="grid gap-4">
            {coverUrls.map((coverUrl) => (
              <div key={coverUrl} className="relative aspect-square">
                <Image
                  src={s3Url + coverUrl}
                  alt={coverUrl}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
