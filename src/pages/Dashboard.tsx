import { useState } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import OverlayManager from "@/components/OverlayManager";
import { Overlay } from "@/types/overlay";

const Dashboard = () => {
  const [overlays, setOverlays] = useState<Overlay[]>([]);
  const [rtspUrl, setRtspUrl] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            LiveStream Studio
          </h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <VideoPlayer 
              rtspUrl={rtspUrl}
              setRtspUrl={setRtspUrl}
              overlays={overlays}
            />
          </div>
          <div>
            <OverlayManager 
              overlays={overlays}
              setOverlays={setOverlays}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
