import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { LoaderCircleIcon } from "lucide-react";
// components
// -- shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type SentimentDataType = {
  playlist_id: string;
  analysis_timestamp: string;
  track_count: number;
  overall_sentiment: {
    Positive: number;
    Negative: number;
    Neutral: number;
    Mixed: number;
  };
  tracks: {
    title: string;
    artist: string;
    sentiment: string;
    scores: {
      Positive: number;
      Negative: number;
      Neutral: number;
      Mixed: number;
    };
  }[];
};

const demo_data = {
  playlist_id: "unknown",
  analysis_timestamp: "2024-12-08T03:05:35.223160",
  track_count: 3,
  overall_sentiment: {
    Positive: 33.45,
    Negative: 24.56,
    Neutral: 34.64,
    Mixed: 7.35,
  },
  tracks: [
    {
      title: "Passionfruit",
      artist: "Drake",
      sentiment: "NEGATIVE",
      scores: {
        Positive: 12.47,
        Negative: 66.46,
        Neutral: 1.52,
        Mixed: 19.54,
      },
    },
    {
      title: "Die For You",
      artist: "The Weeknd",
      sentiment: "POSITIVE",
      scores: {
        Positive: 82.79,
        Negative: 0.11,
        Neutral: 16.9,
        Mixed: 0.19,
      },
    },
    {
      title: "Anti-Hero",
      artist: "Taylor Swift",
      sentiment: "NEUTRAL",
      scores: {
        Positive: 5.1,
        Negative: 7.11,
        Neutral: 85.49,
        Mixed: 2.3,
      },
    },
  ],
};

export default function SentimentAnalysis() {
  const [sentimentData, setSentimentData] =
    useState<SentimentDataType>(demo_data);

  return (
    <div className="flex h-[85vh] items-center justify-center">
      <div className="mt-[2.5vh] h-full overflow-y-auto">
        {sentimentData && (
          <div className="flex flex-col space-y-10">
            <div className="flex w-[50vw] flex-col space-y-5">
              <SentimentLevels
                titles={["Positive", "Negative", "Neutral", "Mixed"]}
                values={[
                  sentimentData.overall_sentiment.Positive,
                  sentimentData.overall_sentiment.Negative,
                  sentimentData.overall_sentiment.Neutral,
                  sentimentData.overall_sentiment.Mixed,
                ]}
              />
            </div>

            {sentimentData.tracks.map((track, index) => (
              <TrackCard
                key={index}
                title={track.title}
                artist={track.artist}
                sentiment={track.sentiment}
                scores={track.scores}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SentimentLevels({
  titles,
  values,
}: {
  titles: string[];
  values: number[];
}) {
  return (
    <div className="space-y-5">
      {titles.map((_, index) => (
        <div key={index} className="space-y-1">
          <div className="flex flex-row justify-between">
            <label className="text-lg font-medium">{titles[index]}</label>
            <label className="text-lg font-medium">{values[index]}/100</label>
          </div>
          <Progress value={values[index]} max={100} />
        </div>
      ))}
    </div>
  );
}

function TrackCard({
  title,
  artist,
  sentiment,
  scores,
}: {
  title: string;
  artist: string;
  sentiment: string;
  scores: {
    Positive: number;
    Negative: number;
    Neutral: number;
    Mixed: number;
  };
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-base font-normal">
          By{" " + artist}
        </CardDescription>
        <div className="flex flex-col space-y-[2px]">
          <label className="text-sm font-normal text-stone-400">
            Sentiment
          </label>
          <label className="text-lg font-medium">{sentiment}</label>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <SentimentLevels
            titles={["Positive", "Negative", "Neutral", "Mixed"]}
            values={[
              scores.Positive,
              scores.Negative,
              scores.Neutral,
              scores.Mixed,
            ]}
          />
        </div>
      </CardContent>
    </Card>
  );
}
