export interface Overlay {
  _id?: string;
  type: "text" | "logo";
  content: string;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  style?: {
    fontSize?: number;
    color?: string;
    backgroundColor?: string;
    opacity?: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface OverlayCreateRequest {
  type: "text" | "logo";
  content: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  style?: {
    fontSize?: number;
    color?: string;
    backgroundColor?: string;
    opacity?: number;
  };
}
