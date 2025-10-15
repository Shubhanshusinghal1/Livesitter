from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# MongoDB Configuration
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
client = MongoClient(MONGODB_URI)
db = client["livestream_studio"]
overlays_collection = db["overlays"]

# Helper function to serialize MongoDB documents
def serialize_overlay(overlay):
    overlay["_id"] = str(overlay["_id"])
    return overlay

# Health check endpoint
@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "message": "API is running"}), 200

# CREATE - Add new overlay
@app.route("/api/overlays", methods=["POST"])
def create_overlay():
    try:
        data = request.json
        
        # Validate required fields
        required_fields = ["type", "content", "position", "size"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        # Create overlay document
        overlay = {
            "type": data["type"],
            "content": data["content"],
            "position": data["position"],
            "size": data["size"],
            "style": data.get("style", {}),
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
        
        result = overlays_collection.insert_one(overlay)
        overlay["_id"] = result.inserted_id
        
        return jsonify(serialize_overlay(overlay)), 201
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# READ - Get all overlays
@app.route("/api/overlays", methods=["GET"])
def get_overlays():
    try:
        overlays = list(overlays_collection.find())
        return jsonify([serialize_overlay(overlay) for overlay in overlays]), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# READ - Get single overlay by ID
@app.route("/api/overlays/<overlay_id>", methods=["GET"])
def get_overlay(overlay_id):
    try:
        overlay = overlays_collection.find_one({"_id": ObjectId(overlay_id)})
        
        if not overlay:
            return jsonify({"error": "Overlay not found"}), 404
        
        return jsonify(serialize_overlay(overlay)), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# UPDATE - Update overlay by ID
@app.route("/api/overlays/<overlay_id>", methods=["PUT"])
def update_overlay(overlay_id):
    try:
        data = request.json
        
        # Prepare update data
        update_data = {
            "updatedAt": datetime.utcnow()
        }
        
        # Update only provided fields
        allowed_fields = ["type", "content", "position", "size", "style"]
        for field in allowed_fields:
            if field in data:
                update_data[field] = data[field]
        
        result = overlays_collection.find_one_and_update(
            {"_id": ObjectId(overlay_id)},
            {"$set": update_data},
            return_document=True
        )
        
        if not result:
            return jsonify({"error": "Overlay not found"}), 404
        
        return jsonify(serialize_overlay(result)), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# DELETE - Delete overlay by ID
@app.route("/api/overlays/<overlay_id>", methods=["DELETE"])
def delete_overlay(overlay_id):
    try:
        result = overlays_collection.delete_one({"_id": ObjectId(overlay_id)})
        
        if result.deleted_count == 0:
            return jsonify({"error": "Overlay not found"}), 404
        
        return jsonify({"message": "Overlay deleted successfully"}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
