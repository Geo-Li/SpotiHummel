"use client";

// components
// -- shadcn components
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// -- local components
import AlbumsColor from "./_components/albums_color/albums-color";
import Lyrics from "./_components/albums_color/lyrics";
import SentimentAnalysis from "./_components/albums_color/sentiment-analysis";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-stone-200">
      <Tabs defaultValue="albums color" className="flex h-full w-full flex-col">
        <div className="absolute right-1/2 top-0 z-20 translate-x-1/2 bg-stone-200 px-4 pt-4">
          <TabsList>
            <TabsTrigger value="albums color">Albums Color</TabsTrigger>
            <TabsTrigger value="lyrics">Lyrics</TabsTrigger>
            <TabsTrigger value="sentiment analysis">
              Sentiment Analysis
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex items-center justify-center">
          <TabsContent value="albums color" className="mt-0">
            <AlbumsColor />
          </TabsContent>

          <TabsContent value="lyrics" className="mt-0">
            <Lyrics />
          </TabsContent>

          <TabsContent value="sentiment analysis" className="mt-0">
            <SentimentAnalysis />
          </TabsContent>
        </div>
      </Tabs>
    </main>
  );
}
