# LiveStream Studio Backend

Flask backend API for managing video overlays with MongoDB.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure MongoDB

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

### 3. Run the Server

```bash
python app.py
```

The API will start on `http://localhost:5000`

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Health Check
```
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "message": "API is running"
}
```

---

#### 2. Create Overlay
```
POST /api/overlays
```

**Request Body:**
```json
{
  "type": "text",
  "content": "Live Now!",
  "position": {
    "x": 10,
    "y": 10
  },
  "size": {
    "width": 200,
    "height": 100
  },
  "style": {
    "fontSize": 24,
    "color": "#ffffff",
    "backgroundColor": "transparent",
    "opacity": 1
  }
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "type": "text",
  "content": "Live Now!",
  "position": { "x": 10, "y": 10 },
  "size": { "width": 200, "height": 100 },
  "style": {
    "fontSize": 24,
    "color": "#ffffff",
    "backgroundColor": "transparent",
    "opacity": 1
  },
  "createdAt": "2025-10-15T10:30:00.000Z",
  "updatedAt": "2025-10-15T10:30:00.000Z"
}
```

---

#### 3. Get All Overlays
```
GET /api/overlays
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "type": "text",
    "content": "Live Now!",
    "position": { "x": 10, "y": 10 },
    "size": { "width": 200, "height": 100 },
    "style": { ... },
    "createdAt": "2025-10-15T10:30:00.000Z",
    "updatedAt": "2025-10-15T10:30:00.000Z"
  }
]
```

---

#### 4. Get Single Overlay
```
GET /api/overlays/{overlay_id}
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "type": "text",
  "content": "Live Now!",
  ...
}
```

**Error (404):**
```json
{
  "error": "Overlay not found"
}
```

---

#### 5. Update Overlay
```
PUT /api/overlays/{overlay_id}
```

**Request Body (partial update allowed):**
```json
{
  "content": "Updated Text",
  "position": { "x": 20, "y": 20 }
}
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "type": "text",
  "content": "Updated Text",
  "position": { "x": 20, "y": 20 },
  ...
}
```

---

#### 6. Delete Overlay
```
DELETE /api/overlays/{overlay_id}
```

**Response (200):**
```json
{
  "message": "Overlay deleted successfully"
}
```

**Error (404):**
```json
{
  "error": "Overlay not found"
}
```

---

## Data Models

### Overlay Schema

```javascript
{
  _id: ObjectId,              // MongoDB auto-generated ID
  type: String,                // "text" or "logo"
  content: String,             // Text content or image URL
  position: {
    x: Number,                 // X position (0-100%)
    y: Number                  // Y position (0-100%)
  },
  size: {
    width: Number,             // Width in pixels
    height: Number             // Height in pixels
  },
  style: {
    fontSize: Number,          // Font size (text only)
    color: String,             // Text color (text only)
    backgroundColor: String,   // Background color
    opacity: Number            // Opacity (0-1)
  },
  createdAt: Date,             // Creation timestamp
  updatedAt: Date              // Last update timestamp
}
```

## Error Handling

All errors return appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

Error response format:
```json
{
  "error": "Error message description"
}
```

## CORS

CORS is enabled for all origins. In production, configure specific allowed origins in `app.py`.

## Testing with cURL

### Create an overlay:
```bash
curl -X POST http://localhost:5000/api/overlays \
  -H "Content-Type: application/json" \
  -d '{
    "type": "text",
    "content": "Test Overlay",
    "position": {"x": 10, "y": 10},
    "size": {"width": 200, "height": 100}
  }'
```

### Get all overlays:
```bash
curl http://localhost:5000/api/overlays
```

### Update an overlay:
```bash
curl -X PUT http://localhost:5000/api/overlays/{overlay_id} \
  -H "Content-Type: application/json" \
  -d '{"content": "Updated Content"}'
```

### Delete an overlay:
```bash
curl -X DELETE http://localhost:5000/api/overlays/{overlay_id}
```
