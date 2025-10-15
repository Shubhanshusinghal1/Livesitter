import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, Layers, Zap, Code } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
              LiveStream Studio
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional RTSP streaming with custom overlays. Create, manage, and display real-time video content with ease.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8">
                <Play className="w-5 h-5 mr-2" />
                Launch Studio
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-all">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Play className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">RTSP Streaming</h3>
              <p className="text-sm text-muted-foreground">
                Connect to any RTSP stream with full playback controls including play, pause, and volume adjustment.
              </p>
            </div>

            <div className="p-6 bg-card rounded-lg border border-border hover:border-accent/50 transition-all">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Layers className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Custom Overlays</h3>
              <p className="text-sm text-muted-foreground">
                Add text and logo overlays with full control over position, size, and styling in real-time.
              </p>
            </div>

            <div className="p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-all">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">CRUD API</h3>
              <p className="text-sm text-muted-foreground">
                Full REST API for managing overlays with Create, Read, Update, and Delete operations.
              </p>
            </div>
          </div>

          <div className="mt-16 p-6 bg-secondary/30 rounded-lg border border-border">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Code className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold mb-2">Developer Ready</h3>
                <p className="text-sm text-muted-foreground">
                  Built with React, TypeScript, and Flask. MongoDB backend for persistent overlay storage.
                  Full API documentation included.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
