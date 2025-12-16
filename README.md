# Film_Track 🎬

A modern movie tracking application built with MERN stack, featuring comprehensive movie management and statistics dashboard.

## ✨ Features

### 🎯 Core Features
- **Movie Management**: Add, edit, and delete movies from your personal collection
- **Watch Status Tracking**: Mark movies as watched or add to backlog
- **Movie Reviews**: Add personal reviews and notes for each movie
- **Movie Ratings**: Rate movies on a 0-10 scale with star display
- **Statistics Dashboard**: View comprehensive stats about your movie collection

### 📊 Statistics Dashboard
- **Total Movies**: Count of all movies in collection
- **Watched Count**: Number of movies you've watched
- **Backlog Count**: Movies waiting to be watched
- **Average Rating**: Overall rating across all rated movies

## 🛠 Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **CSS3** - Custom styling with animations

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

### Development Tools
- **ESLint** - Code linting
- **Nodemon** - Auto-restart for development
- **Git** - Version control
- **GitHub** - Repository hosting

## 🚀 Getting Started

### Prerequisites
- Node.js 20.19+ or 22.12+
- MongoDB (local or cloud instance)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Trina-SE/Film_Track.git
   cd Film_Track
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   Create `.env` file in server directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/film_track
   PORT=4000
   ```

5. **Start the application**

   **Terminal 1 - Start Server:**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Start Client:**
   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000

## 📡 API Endpoints

### Movies API
- `GET /api/movies` - Get all movies
- `POST /api/movies` - Create new movie
- `PUT /api/movies/:id` - Update movie
- `DELETE /api/movies/:id` - Delete movie

### Movie Schema
```javascript
{
  title: String (required),
  director: String (required),
  year: Number (required, min: 1888),
  watched: Boolean (default: false),
  review: String,
  rating: Number (min: 0, max: 10),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔄 MCR (Modern Code Review) Workflow

This project follows Modern Code Review practices for collaborative development:

### 📋 MCR Process We Followed

#### Phase 1: Movie Rating Feature
1. **Branch Creation**: `feature/add-movie-rating`
2. **Backend Changes**: Added rating field to Movie schema
3. **Frontend Changes**: Rating input and display components
4. **Styling**: Golden color scheme for ratings
5. **Commits**: Focused commits with descriptive messages
6. **PR Creation**: Pull request with feature description
7. **Merge**: Fast-forward merge to main
8. **Cleanup**: Delete feature branch

#### Phase 2: Statistics Dashboard
1. **Branch Creation**: `feature/add-stats-button`
2. **UI Implementation**: Stats button and dashboard
3. **Data Calculations**: Real-time statistics computation
4. **Styling**: Animated cards with hover effects
5. **Color Alignment**: Custom button styling for theme consistency
6. **Testing**: Manual testing of all features

### 🎯 MCR Best Practices Applied

#### Branch Strategy
- `main`: Production-ready code
- `feature/*`: Isolated feature development
- Clear branch naming conventions

#### Commit Standards
- Descriptive commit messages
- Logical grouping of changes
- Atomic commits when possible

#### Code Review Process
- Feature branch isolation
- Pull request creation
- Code review checklist
- Approval before merge

#### Development Workflow
1. **Plan** → 2. **Branch** → 3. **Develop** → 4. **Test** → 5. **Commit** → 6. **Push** → 7. **PR** → 8. **Review** → 9. **Merge** → 10. **Cleanup**

## 🎨 UI/UX Features

- **Dark Theme**: Modern dark design with blue accents
- **Responsive Design**: Works on desktop and mobile
- **Smooth Animations**: Fade-in effects and hover transitions
- **Interactive Elements**: Hover effects on cards and buttons
- **Visual Feedback**: Loading states and error handling

## 📁 Project Structure

```
Film_Track/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── App.jsx        # Main component
│   │   ├── App.css        # Styles
│   │   ├── main.jsx       # Entry point
│   │   └── assets/        # Images/icons
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express backend
│   ├── src/
│   │   ├── index.js       # Server entry
│   │   ├── models/
│   │   │   └── movie.js   # Movie schema
│   │   └── routes/
│   │       └── movies.js  # API routes
│   └── package.json
├── .gitignore
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- **Trina-SE** - Initial work and MCR implementation

---
