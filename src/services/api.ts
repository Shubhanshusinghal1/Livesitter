import { Overlay, OverlayCreateRequest } from "@/types/overlay";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const overlayApi = {
  // Create a new overlay
  create: async (overlay: OverlayCreateRequest): Promise<Overlay> => {
    const response = await fetch(`${API_BASE_URL}/overlays`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(overlay),
    });

    if (!response.ok) {
      throw new Error("Failed to create overlay");
    }

    return response.json();
  },

  // Get all overlays
  getAll: async (): Promise<Overlay[]> => {
    const response = await fetch(`${API_BASE_URL}/overlays`);

    if (!response.ok) {
      throw new Error("Failed to fetch overlays");
    }

    return response.json();
  },

  // Get a single overlay by ID
  getById: async (id: string): Promise<Overlay> => {
    const response = await fetch(`${API_BASE_URL}/overlays/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch overlay");
    }

    return response.json();
  },

  // Update an overlay
  update: async (id: string, overlay: Partial<OverlayCreateRequest>): Promise<Overlay> => {
    const response = await fetch(`${API_BASE_URL}/overlays/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(overlay),
    });

    if (!response.ok) {
      throw new Error("Failed to update overlay");
    }

    return response.json();
  },

  // Delete an overlay
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/overlays/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete overlay");
    }
  },
};
