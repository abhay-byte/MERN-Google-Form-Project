# Feedback App

A full-stack feedback application built with React, Express, and MongoDB.

## 📺 Project Tutorial

[![MERN Stack Google Form Project](https://i1.ytimg.com/vi/g0LflsaiYbg/hqdefault.jpg)](https://www.youtube.com/watch?v=g0LflsaiYbg)

**Watch the complete tutorial:** [MERN Stack Google Form Project](https://www.youtube.com/watch?v=g0LflsaiYbg)

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **Docker Desktop** - [Download](https://www.docker.com/products/docker-desktop/)
- **Git** (optional) - [Download](https://git-scm.com/)


## 🚀 Quick Start (Windows)

### Automated Setup

Simply double-click the `run.bat` file or run it from command prompt:

```bash
run.bat
```

This script will:
1. Check if Docker is installed and running
2. Start MongoDB using Docker Compose
3. Install backend dependencies
4. Install frontend dependencies
5. Start both backend and frontend servers

### Manual Setup

If you prefer to run commands manually:

#### 1. Start MongoDB

```bash
cd backend
docker-compose up -d
cd ..
```

#### 2. Setup and Run Backend

```bash
cd backend
npm install
node server.js
```

The backend will run on `http://localhost:5000` (or your configured port)

#### 3. Setup and Run Frontend (New Terminal)

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🗄️ Database Connection

MongoDB is accessible at:
```
mongodb://localhost:27017/feedback-app
```

## 📦 Technology Stack

### Backend
- **Express.js** v5.1.0 - Web framework
- **Mongoose** v8.19.2 - MongoDB ODM
- **CORS** v2.8.5 - Cross-origin resource sharing

### Frontend
- **React** v19.1.0 - UI library
- **Vite** v6.3.5 - Build tool
- **Tailwind CSS** v4.1.10 - Styling
- **Axios** v1.13.1 - HTTP client
- **Chart.js** v4.5.1 - Data visualization
- **React Router** v7.9.5 - Routing

## 🛠️ Available Scripts

### Backend
```bash
node server.js          # Start the backend server
```

### Frontend
```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run preview        # Preview production build
npm run lint           # Run ESLint
```

### Docker
```bash
docker-compose up -d           # Start MongoDB in background
docker-compose down            # Stop MongoDB
docker-compose logs mongodb    # View MongoDB logs
docker-compose down -v         # Stop and remove volumes (deletes data)
```

## 🔧 Troubleshooting

### Docker Issues
- **Docker not running**: Start Docker Desktop and wait for it to fully initialize
- **Port 27017 in use**: Stop any existing MongoDB instances or change the port in `docker-compose.yml`

### Backend Issues
- **Cannot connect to MongoDB**: Ensure Docker container is running with `docker ps`
- **Port already in use**: Change the port in your backend configuration

### Frontend Issues
- **Dependencies not installing**: Delete `node_modules` and `package-lock.json`, then run `npm install` again
- **Build errors**: Ensure Node.js version is 16 or higher

## 📝 Environment Variables

Create a `.env` file in the backend folder if needed:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/feedback-app
```

## 🛑 Stopping the Application

1. Press `Ctrl + C` in both terminal windows (frontend and backend)
2. Stop MongoDB:
   ```bash
   cd backend
   docker-compose down
   ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Support

For issues or questions, please open an issue on GitHub.