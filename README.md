# Health & Wellness Tracker

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application developed to help users maintain a healthy lifestyle by tracking their wellness activities, goals, and daily progress.

The application provides a modern and responsive user interface where users can manage personal wellness goals, monitor progress, and improve daily health habits through an interactive dashboard.

---

## Project Overview

The Health & Wellness Tracker is designed to support users in managing their health and wellness activities efficiently. The platform allows users to create goals related to fitness and wellness while providing visual tracking features to monitor progress over time.

The project focuses on both functionality and user experience by implementing a clean UI design, responsive layouts, secure authentication, and dynamic data handling using the MERN Stack.

---

## Features

### Authentication System
- User Registration
- User Login
- Secure Authentication
- Protected Routes

### Goal Management
Users can:
- Set daily step goals
- Set workout session targets
- Set calorie intake goals
- Update wellness goals anytime

### Progress Tracking
- Progress bars
- Goal completion tracking
- Dashboard monitoring
- Dynamic updates based on user activity

### Dashboard and Navigation
- Responsive sidebar navigation
- Active page highlighting
- Separate pages for each module
- User-friendly dashboard layout

### UI/UX Improvements
- Responsive design
- Full-screen background image
- Banner image integration
- Modern card-based layouts
- Mobile-friendly interface

---

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

---
### Install Frontend Dependencies

```bash
cd client
npm install
```

---

### Install Backend Dependencies

```bash
cd server
npm install
```

---

### Configure Environment Variables

Created a `.env` file inside the folder

---

### Run the Backend Server

```bash
cd server
npm start
```

---

### Run the Frontend Application

```bash
cd client
npm start
```

---

## Application Modules

### Login and Registration
Allows users to securely create an account and log into the application.

### Dashboard
Displays user wellness information, progress indicators, and navigation access.

### Goal Setting
Users can define and manage personal wellness targets such as:
- Daily steps
- Workout frequency
- Calorie goals

### Progress Monitoring
Tracks the completion percentage of user goals using visual indicators.

---

## Future Enhancements

The following features can be added in future versions:

- BMI Calculator
- Water Intake Tracker
- Sleep Monitoring
- Reminder Notifications
- Dark Mode
- Workout History
- AI-based Wellness Suggestions
- Mobile Application Support

---

## Testing

Basic testing includes:
- User registration
- User login
- Goal creation
- Progress tracking
- Navigation testing
- Responsive UI testing

---

## Learning Outcomes

Through this project, the following concepts were learned and implemented:

- MERN Stack Development
- REST API Integration
- MongoDB Database Management
- Authentication and Authorization
- React Component Architecture
- Frontend UI Design
- Backend API Development
- Full Stack Project Integration

---

## Contribution

Suggestions and improvements are welcome for further enhancement of the project.

---

## License

This project is developed for educational and learning purposes.

---










# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
