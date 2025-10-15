import { useState, useEffect } from "react";
import { Plus, Trash2, Edit, Save, X, Image, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Overlay, OverlayCreateRequest } from "@/types/overlay";
import { overlayApi } from "@/services/api";
import { toast } from "sonner";

interface OverlayManagerProps {
  overlays: Overlay[];
  setOverlays: (overlays: Overlay[]) => void;
}

const OverlayManager = ({ overlays, setOverlays }: OverlayManagerProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<OverlayCreateRequest>({
    type: "text",
    content: "",
    position: { x: 10, y: 10 },
    size: { width: 200, height: 100 },
    style: {
      fontSize: 24,
      color: "#ffffff",
      backgroundColor: "transparent",
      opacity: 1,
    },
  });

  useEffect(() => {
    loadOverlays();
  }, []);

  const loadOverlays = async () => {
    try {
      const data = await overlayApi.getAll();
      setOverlays(data);
    } catch (error) {
      console.error("Error loading overlays:", error);
      toast.error("Failed to load overlays. Make sure the backend is running.");
    }
  };

  const handleCreate = async () => {
    try {
      const newOverlay = await overlayApi.create(formData);
      setOverlays([...overlays, newOverlay]);
      setIsCreating(false);
      resetForm();
      toast.success("Overlay created successfully");
    } catch (error) {
      console.error("Error creating overlay:", error);
      toast.error("Failed to create overlay");
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const updated = await overlayApi.update(id, formData);
      setOverlays(overlays.map((o) => (o._id === id ? updated : o)));
      setEditingId(null);
      resetForm();
      toast.success("Overlay updated successfully");
    } catch (error) {
      console.error("Error updating overlay:", error);
      toast.error("Failed to update overlay");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await overlayApi.delete(id);
      setOverlays(overlays.filter((o) => o._id !== id));
      toast.success("Overlay deleted successfully");
    } catch (error) {
      console.error("Error deleting overlay:", error);
      toast.error("Failed to delete overlay");
    }
  };

  const startEdit = (overlay: Overlay) => {
    setEditingId(overlay._id || null);
    setFormData({
      type: overlay.type,
      content: overlay.content,
      position: overlay.position,
      size: overlay.size,
      style: overlay.style,
    });
  };

  const resetForm = () => {
    setFormData({
      type: "text",
      content: "",
      position: { x: 10, y: 10 },
      size: { width: 200, height: 100 },
      style: {
        fontSize: 24,
        color: "#ffffff",
        backgroundColor: "transparent",
        opacity: 1,
      },
    });
  };

  const cancelEdit = () => {
    setIsCreating(false);
    setEditingId(null);
    resetForm();
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Overlay Manager</h2>
          {!isCreating && !editingId && (
            <Button
              onClick={() => setIsCreating(true)}
              size="sm"
              className="bg-gradient-to-r from-primary to-accent"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Overlay
            </Button>
          )}
        </div>

        {(isCreating || editingId) && (
          <div className="space-y-4 p-4 bg-secondary/50 rounded-lg mb-4">
            <Tabs
              value={formData.type}
              onValueChange={(value) =>
                setFormData({ ...formData, type: value as "text" | "logo" })
              }
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="text">
                  <Type className="w-4 h-4 mr-2" />
                  Text
                </TabsTrigger>
                <TabsTrigger value="logo">
                  <Image className="w-4 h-4 mr-2" />
                  Logo
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="space-y-3 mt-4">
                <div>
                  <Label>Text Content</Label>
                  <Input
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    placeholder="Enter text..."
                  />
                </div>
                <div>
                  <Label>Font Size: {formData.style?.fontSize}px</Label>
                  <Slider
                    value={[formData.style?.fontSize || 24]}
                    onValueChange={([value]) =>
                      setFormData({
                        ...formData,
                        style: { ...formData.style, fontSize: value },
                      })
                    }
                    min={12}
                    max={72}
                    step={1}
                  />
                </div>
                <div>
                  <Label>Text Color</Label>
                  <Input
                    type="color"
                    value={formData.style?.color}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        style: { ...formData.style, color: e.target.value },
                      })
                    }
                  />
                </div>
              </TabsContent>

              <TabsContent value="logo" className="space-y-3 mt-4">
                <div>
                  <Label>Image URL</Label>
                  <Input
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                <div>
                  <Label>Width: {formData.size.width}px</Label>
                  <Slider
                    value={[formData.size.width]}
                    onValueChange={([value]) =>
                      setFormData({
                        ...formData,
                        size: { ...formData.size, width: value },
                      })
                    }
                    min={50}
                    max={500}
                    step={10}
                  />
                </div>
                <div>
                  <Label>Height: {formData.size.height}px</Label>
                  <Slider
                    value={[formData.size.height]}
                    onValueChange={([value]) =>
                      setFormData({
                        ...formData,
                        size: { ...formData.size, height: value },
                      })
                    }
                    min={50}
                    max={500}
                    step={10}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Position X: {formData.position.x}%</Label>
                <Slider
                  value={[formData.position.x]}
                  onValueChange={([value]) =>
                    setFormData({
                      ...formData,
                      position: { ...formData.position, x: value },
                    })
                  }
                  min={0}
                  max={90}
                  step={1}
                />
              </div>
              <div>
                <Label>Position Y: {formData.position.y}%</Label>
                <Slider
                  value={[formData.position.y]}
                  onValueChange={([value]) =>
                    setFormData({
                      ...formData,
                      position: { ...formData.position, y: value },
                    })
                  }
                  min={0}
                  max={90}
                  step={1}
                />
              </div>
            </div>

            <div>
              <Label>Opacity: {Math.round((formData.style?.opacity || 1) * 100)}%</Label>
              <Slider
                value={[(formData.style?.opacity || 1) * 100]}
                onValueChange={([value]) =>
                  setFormData({
                    ...formData,
                    style: { ...formData.style, opacity: value / 100 },
                  })
                }
                min={0}
                max={100}
                step={5}
              />
            </div>

            <div className="flex gap-2">
              {editingId ? (
                <Button
                  onClick={() => handleUpdate(editingId)}
                  className="flex-1 bg-accent hover:bg-accent/90"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Update
                </Button>
              ) : (
                <Button
                  onClick={handleCreate}
                  className="flex-1 bg-accent hover:bg-accent/90"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Create
                </Button>
              )}
              <Button onClick={cancelEdit} variant="outline" className="flex-1">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Active Overlays ({overlays.length})
          </h3>
          {overlays.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No overlays created yet
            </p>
          ) : (
            overlays.map((overlay) => (
              <div
                key={overlay._id}
                className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {overlay.type === "text" ? (
                      <Type className="w-4 h-4 text-primary" />
                    ) : (
                      <Image className="w-4 h-4 text-primary" />
                    )}
                    <span className="font-medium text-sm">
                      {overlay.type === "text" ? overlay.content : "Logo"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Position: {overlay.position.x}%, {overlay.position.y}%
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => startEdit(overlay)}
                    className="hover:bg-primary/20"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => overlay._id && handleDelete(overlay._id)}
                    className="hover:bg-destructive/20 hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default OverlayManager;
