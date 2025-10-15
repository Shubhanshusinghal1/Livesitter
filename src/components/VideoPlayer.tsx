import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Overlay } from "@/types/overlay";
import OverlayRenderer from "./OverlayRenderer";
import { toast } from "sonner";

interface VideoPlayerProps {
  rtspUrl: string;
  setRtspUrl: (url: string) => void;
  overlays: Overlay[];
}

const VideoPlayer = ({ rtspUrl, setRtspUrl, overlays }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(true);
  const [tempUrl, setTempUrl] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleLoadStream = () => {
    if (!tempUrl.trim()) {
      toast.error("Please enter a valid RTSP URL");
      return;
    }
    setRtspUrl(tempUrl);
    setShowUrlInput(false);
    toast.success("Stream URL loaded successfully");
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((err) => {
          console.error("Error playing video:", err);
          toast.error("Unable to play stream. Check the URL and try again.");
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume / 100;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-lg p-4 border border-border">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          Stream Configuration
        </h2>
        
        {showUrlInput && (
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">RTSP Stream URL</label>
              <Input
                type="text"
                placeholder="rtsp://example.com/stream"
                value={tempUrl}
                onChange={(e) => setTempUrl(e.target.value)}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Use tools like RTSP.ME or VLC to stream from a video file
              </p>
            </div>
            <Button 
              onClick={handleLoadStream}
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              Load Stream
            </Button>
          </div>
        )}

        {!showUrlInput && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground font-mono truncate flex-1">
              {rtspUrl}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowUrlInput(true)}
              className="ml-2"
            >
              Change
            </Button>
          </div>
        )}
      </div>

      <div className="relative video-container rounded-lg overflow-hidden border border-border aspect-video">
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          src={rtspUrl || undefined}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={rtspUrl} type="application/x-rtsp" />
          Your browser does not support RTSP streaming.
        </video>

        <OverlayRenderer overlays={overlays} />

        {!rtspUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <p className="text-muted-foreground">No stream loaded. Please enter an RTSP URL above.</p>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 control-panel p-4">
          <div className="flex items-center gap-4">
            <Button
              size="icon"
              variant="ghost"
              onClick={togglePlay}
              disabled={!rtspUrl}
              className="hover:bg-primary/20"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </Button>

            <div className="flex items-center gap-2 flex-1 max-w-xs">
              <Button
                size="icon"
                variant="ghost"
                onClick={toggleMute}
                className="hover:bg-primary/20"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume]}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="flex-1"
              />
            </div>

            <div className="flex-1" />

            <div className="text-sm text-muted-foreground">
              {isPlaying ? "LIVE" : "PAUSED"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
