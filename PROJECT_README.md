# LiveStream Studio - Full Stack Project

## Project Overview

A complete full-stack application for RTSP video streaming with real-time overlay management. Built with React (frontend), Flask (backend), and MongoDB (database).

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Frontend (React)                   │
│  - Video Player with RTSP support                   │
│  - Overlay Management UI                            │
│  - Real-time overlay rendering                      │
└─────────────┬───────────────────────────────────────┘
              │ HTTP REST API
┌─────────────▼───────────────────────────────────────┐
│                  Backend (Flask)                     │
│  - CRUD API endpoints                               │
│  - Overlay data validation                          │
│  - MongoDB integration                              │
└─────────────┬───────────────────────────────────────┘
              │ MongoDB Driver
┌─────────────▼───────────────────────────────────────┐
│                Database (MongoDB)                    │
│  - Overlay storage                                  │
│  - Settings persistence                             │
└─────────────────────────────────────────────────────┘
```

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **React Router** - Routing
- **Sonner** - Toast notifications

### Backend
- **Flask 3.0** - Python web framework
- **PyMongo** - MongoDB driver
- **Flask-CORS** - Cross-origin support

### Database
- **MongoDB** - NoSQL database for overlay storage

## Project Structure

```
.
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── ui/                  # Shadcn UI components
│   │   ├── VideoPlayer.tsx      # RTSP video player
│   │   ├── OverlayManager.tsx   # Overlay CRUD interface
│   │   └── OverlayRenderer.tsx  # Overlay display component
│   ├── pages/                   # Route pages
│   │   ├── Index.tsx            # Landing page
│   │   └── Dashboard.tsx        # Main application
│   ├── services/                # API integration
│   │   └── api.ts               # REST API client
│   ├── types/                   # TypeScript types
│   │   └── overlay.ts           # Overlay data types
│   ├── App.tsx                  # App router
│   └── index.css                # Global styles + design system
│
├── backend/                     # Backend source code
│   ├── app.py                   # Flask application
│   ├── requirements.txt         # Python dependencies
│   ├── .env.example             # Environment variables template
│   └── README.md                # Backend documentation
│
├── USER_DOCUMENTATION.md        # End-user guide
├── PROJECT_README.md            # This file
└── package.json                 # Frontend dependencies
```

## Features Implemented

### ✅ Landing Page
- Professional hero section
- Feature highlights
- Call-to-action to launch studio

### ✅ RTSP Video Streaming
- Support for RTSP URL input
- Video playback controls (play, pause)
- Volume control with mute option
- Real-time stream display

### ✅ Overlay System
- **Text Overlays**:
  - Custom text content
  - Font size adjustment (12-72px)
  - Color picker
  - Position control (X, Y coordinates)
  - Opacity adjustment
  
- **Logo Overlays**:
  - Image URL input
  - Width/height adjustment (50-500px)
  - Position control
  - Opacity adjustment

### ✅ CRUD API
- **Create**: Add new overlays
- **Read**: Get all overlays or single overlay by ID
- **Update**: Modify existing overlays
- **Delete**: Remove overlays

### ✅ Responsive Design
- Mobile-friendly interface
- Dark theme optimized for video viewing
- Smooth animations and transitions

## Installation & Setup

### 1. Frontend Setup

```bash
# Install dependencies
npm install

# Create environment file (optional)
cp .env.example .env

# Start development server
npm run dev
```

Frontend runs on: `http://localhost:8080`

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Configure MongoDB
cp .env.example .env
# Edit .env and add your MONGODB_URI

# Start Flask server
python app.py
```

Backend runs on: `http://localhost:5000`

### 3. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Add to backend/.env

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/overlays` | Create overlay |
| GET | `/api/overlays` | Get all overlays |
| GET | `/api/overlays/:id` | Get overlay by ID |
| PUT | `/api/overlays/:id` | Update overlay |
| DELETE | `/api/overlays/:id` | Delete overlay |

Full API documentation: `backend/README.md`

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (backend/.env)
```
MONGODB_URI=mongodb://localhost:27017/
```

## Running in Production

### Frontend Build
```bash
npm run build
# Output in dist/
```

### Backend Production
```bash
# Use production WSGI server
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Deployment Recommendations
- **Frontend**: Vercel, Netlify, or AWS S3 + CloudFront
- **Backend**: Railway, Render, or AWS EC2
- **Database**: MongoDB Atlas (managed)

## Development Guidelines

### Adding New Overlay Types

1. Update TypeScript types in `src/types/overlay.ts`
2. Modify backend validation in `backend/app.py`
3. Update `OverlayRenderer.tsx` to handle new type
4. Add UI controls in `OverlayManager.tsx`

### Code Quality

```bash
# Frontend linting
npm run lint

# Type checking
npm run type-check

# Backend linting (install flake8)
flake8 backend/app.py
```

## Testing

### Manual Testing Checklist

- [ ] Load RTSP stream successfully
- [ ] Play/pause video controls work
- [ ] Volume adjustment functions
- [ ] Create text overlay
- [ ] Create logo overlay
- [ ] Edit overlay settings
- [ ] Delete overlay
- [ ] Overlays persist after page reload
- [ ] Multiple overlays can coexist
- [ ] Responsive on mobile devices

### API Testing with cURL

See `backend/README.md` for cURL examples.

## Common Issues & Solutions

### RTSP Stream Not Playing
- **Issue**: Browsers don't natively support RTSP
- **Solution**: Use RTSP to WebRTC/HLS gateway (e.g., mediamtx)

### CORS Errors
- **Issue**: Frontend can't reach backend
- **Solution**: Verify Flask-CORS is installed and configured

### MongoDB Connection Failed
- **Issue**: Can't connect to database
- **Solution**: Check MONGODB_URI, ensure MongoDB is running

## Performance Considerations

- **Overlay Limit**: Recommend max 10-15 overlays simultaneously
- **Image Size**: Compress logo images (use WebP format)
- **Video Quality**: RTSP streams consume bandwidth (2-8 Mbps typical)
- **Database**: Add indexes for frequently queried fields

## Security Notes

⚠️ **Important for Production**:

1. Enable authentication on Flask API
2. Use environment variables for secrets
3. Enable MongoDB authentication
4. Configure CORS for specific origins only
5. Use HTTPS/TLS for all connections
6. Validate and sanitize all user inputs
7. Rate limit API endpoints

## Future Enhancements

Potential features to add:
- [ ] Drag-and-drop overlay positioning
- [ ] Real-time collaborative editing
- [ ] Preset overlay templates
- [ ] Video recording with overlays
- [ ] Multi-stream support
- [ ] WebSocket for real-time updates
- [ ] User authentication system
- [ ] Overlay animation effects

## Documentation Files

- **`USER_DOCUMENTATION.md`** - End-user guide for using the application
- **`backend/README.md`** - Complete API reference and backend setup
- **`PROJECT_README.md`** - This file (development overview)

## License

Provided for Full Stack Developer Task evaluation.

## Contact & Support

For issues or questions related to this task submission, please refer to the documentation files or contact the development team.

---


