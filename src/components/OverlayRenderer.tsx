import { Overlay } from "@/types/overlay";

interface OverlayRendererProps {
  overlays: Overlay[];
}

const OverlayRenderer = ({ overlays }: OverlayRendererProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {overlays.map((overlay) => (
        <div
          key={overlay._id}
          className="absolute overlay-item"
          style={{
            left: `${overlay.position.x}%`,
            top: `${overlay.position.y}%`,
            width: `${overlay.size.width}px`,
            height: overlay.type === "text" ? "auto" : `${overlay.size.height}px`,
            opacity: overlay.style?.opacity || 1,
          }}
        >
          {overlay.type === "text" ? (
            <div
              style={{
                fontSize: `${overlay.style?.fontSize || 24}px`,
                color: overlay.style?.color || "#ffffff",
                backgroundColor: overlay.style?.backgroundColor || "transparent",
                padding: "4px 8px",
                borderRadius: "4px",
                fontWeight: "bold",
                textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
              }}
            >
              {overlay.content}
            </div>
          ) : (
            <img
              src={overlay.content}
              alt="Logo overlay"
              className="w-full h-full object-contain"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default OverlayRenderer;
