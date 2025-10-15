# LiveStream Studio - User Documentation

## Overview

LiveStream Studio is a professional RTSP streaming platform that allows you to display livestream videos with custom overlays. You can add text labels, logos, and other graphics on top of your video stream in real-time.

## Features

- ✅ RTSP video streaming support
- ✅ Custom text overlays with styling options
- ✅ Logo/image overlays
- ✅ Drag-and-position overlays anywhere on the video
- ✅ Adjustable overlay size and opacity
- ✅ Full CRUD operations for overlay management
- ✅ Video playback controls (play, pause, volume)
- ✅ Persistent overlay storage via MongoDB

## Getting Started

### Prerequisites

1. **Node.js** (v18 or higher) - for the React frontend
2. **Python 3.8+** - for the Flask backend
3. **MongoDB** - local installation or MongoDB Atlas account
4. **RTSP Stream Source** - You can use tools like:
   - RTSP.ME (https://rtsp.me)
   - VLC Media Player (to stream a video file)
   - Any IP camera with RTSP support

### Installation

#### 1. Frontend Setup

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:8080`

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Configure MongoDB connection
cp .env.example .env
# Edit .env and add your MongoDB connection string

# Start the Flask server
python app.py
```

The backend API will be available at `http://localhost:5000`

#### 3. Environment Configuration

Create a `.env` file in the root directory (optional):

```
VITE_API_URL=http://localhost:5000/api
```

## Using the Application

### Step 1: Load an RTSP Stream

1. Navigate to the Dashboard
2. In the "Stream Configuration" section, enter your RTSP URL
3. Click "Load Stream"

**Example RTSP URLs:**
- From RTSP.ME: `rtsp://username:password@rtsp.me:1935/stream`
- From VLC: `rtsp://localhost:8554/stream`
- IP Camera: `rtsp://camera-ip:554/stream`

### Step 2: Control Video Playback

Once the stream is loaded, use the video controls:

- **Play/Pause**: Click the play button at the bottom left
- **Volume**: Use the volume slider to adjust audio level
- **Mute**: Click the volume icon to mute/unmute

### Step 3: Add Overlays

#### Adding a Text Overlay:

1. Click "Add Overlay" button in the Overlay Manager
2. Select the "Text" tab
3. Enter your text content
4. Adjust settings:
   - **Font Size**: Slider from 12px to 72px
   - **Text Color**: Color picker
   - **Position**: X and Y sliders (percentage of video area)
   - **Opacity**: 0-100%
5. Click "Create"

#### Adding a Logo Overlay:

1. Click "Add Overlay" button
2. Select the "Logo" tab
3. Enter the image URL
4. Adjust settings:
   - **Width**: Slider from 50px to 500px
   - **Height**: Slider from 50px to 500px
   - **Position**: X and Y sliders
   - **Opacity**: 0-100%
5. Click "Create"

### Step 4: Manage Overlays

#### Edit an Overlay:
1. Find the overlay in the Active Overlays list
2. Click the pencil (Edit) icon
3. Modify any settings
4. Click "Update"

#### Delete an Overlay:
1. Find the overlay in the Active Overlays list
2. Click the trash (Delete) icon
3. Confirm deletion

## Tips and Best Practices

### For Best Streaming Experience:

1. **Use a stable network connection** for smooth RTSP streaming
2. **Test your RTSP URL** in VLC first to ensure it works
3. **Keep overlays organized** - use descriptive text for easy identification
4. **Adjust opacity** for logos to blend naturally with video
5. **Position carefully** - preview on different screen sizes

### Common RTSP URL Formats:

```
# Standard format
rtsp://server:port/path

# With authentication
rtsp://username:password@server:port/path

# IP Camera example
rtsp://admin:password123@192.168.1.100:554/stream1
```

### Creating an RTSP Stream from Video File (VLC):

1. Open VLC Media Player
2. Media → Stream
3. Add your video file
4. Choose RTSP as output
5. Set up stream (default port: 8554)
6. Click "Stream"
7. Use URL: `rtsp://localhost:8554/stream`

## Troubleshooting

### Stream Not Loading

**Problem**: Video player shows "No stream loaded"

**Solutions**:
- Verify RTSP URL is correct
- Check if the RTSP server is running
- Test URL in VLC Media Player first
- Ensure your browser supports the video codec
- Check firewall settings

### Backend Connection Issues

**Problem**: Overlays not saving or loading

**Solutions**:
- Verify backend server is running (`python app.py`)
- Check MongoDB connection in `.env`
- Ensure MongoDB service is running
- Check browser console for API errors
- Verify CORS is enabled on backend

### Browser Compatibility

**RTSP Support**: Most browsers don't natively support RTSP. You may need:
- Use HLS/WebRTC conversion server
- Implement FFmpeg transcoding
- Use browser extensions for RTSP

**Recommended Setup**:
- Use an RTSP to WebRTC gateway
- Tools: mediamtx, rtsp-simple-server
- Or use HLS streaming as alternative

### Overlay Not Visible

**Solutions**:
- Check opacity setting (ensure it's not 0%)
- Verify position is within video bounds (0-90%)
- For text: ensure color contrasts with video
- For logos: verify image URL is accessible

## Advanced Usage

### Custom Styling

Text overlays support full styling control:

```json
{
  "style": {
    "fontSize": 32,
    "color": "#FF0000",
    "backgroundColor": "rgba(0,0,0,0.5)",
    "opacity": 0.9
  }
}
```

### API Integration

Use the REST API directly for automation:

```javascript
// Create overlay programmatically
fetch('http://localhost:5000/api/overlays', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'text',
    content: 'LIVE',
    position: { x: 85, y: 5 },
    size: { width: 100, height: 50 },
    style: { fontSize: 24, color: '#ff0000' }
  })
});
```

## Security Considerations

1. **RTSP Authentication**: Use username/password in RTSP URLs when possible
2. **API Protection**: Add authentication to Flask API in production
3. **MongoDB Security**: Use strong passwords and enable authentication
4. **CORS**: Configure specific allowed origins in production
5. **HTTPS**: Deploy with SSL/TLS certificates

## Performance Optimization

1. **Limit active overlays** - Too many can affect performance
2. **Optimize logo images** - Use compressed PNG/WebP formats
3. **Monitor bandwidth** - RTSP streams consume significant bandwidth
4. **Database indexing** - Add indexes for frequently queried fields

## Support and Resources

- **Backend API Documentation**: See `backend/README.md`
- **React Documentation**: https://react.dev
- **Flask Documentation**: https://flask.palletsprojects.com
- **MongoDB Documentation**: https://docs.mongodb.com
- **RTSP Protocol**: https://en.wikipedia.org/wiki/Real_Time_Streaming_Protocol

## License

