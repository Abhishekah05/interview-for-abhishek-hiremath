## 🚀 SpaceX Launch Dashboard
This is a modern, single-page web application built using React JS and Material UI that displays SpaceX launch data. It allows users to:

- Browse all SpaceX launches
- Filter launches by status (upcoming/past)
- View detailed launch information in a modal
- Access the application on both desktop and mobile devices

## ✨ Key Features 

🚀 Launch Listings
- Displays all SpaceX launches in a responsive grid
- Each card shows mission patch, mission name, launch date, and rocket name
- Cards are clickable to view more details

🔍 Launch Filtering
* Users can filter launches by:
 - Upcoming launches
 - Past launches
 - All launches
* Filter updates the displayed launches instantly

📑 Launch Details Modal
  - Clicking a launch card opens a detailed modal with:
  - Full mission details
  - Rocket specifications
  - Launch site information
  - Links to press kit and video (when available)

⏳ Loading & Empty States
  -  Shows loading spinner while fetching data
  - Displays friendly empty state when no launches match filters

📱 Mobile Responsive Design

  - Custom mobile layout designed beyond the Figma specs
  - Cards stack vertically on small screens
  - Modal adapts to screen size

🌓 Dark/Light Mode Toggle
  - Easily switch between light and dark UI themes
  - Theme is applied globally using Material UI's theming system


## 🔧 Technical Highlights 

🧠 React Fundamentals

 - Used functional components with React Hooks (useState, useEffect, useContext)
 - Implemented custom hooks for data fetching and state management

🎨 Material UI Integration
 - Implemented a fully themed UI with dark/light toggle
 - Used MUI Grid, Cards, Dialogs, and other components
 - Customized styles with makeStyles

🌐 API Integration (SpaceX REST API)
 - Fetched launch data using axios
 - Implemented error handling and retry logic
 - Cached API responses for better performance

🌍 Global State Management
 - Used React Context API to manage:
 - Theme preferences
 - Filter state
 - Selected launch for modal

📦 Modular & Scalable Codebase
   Separated logic into:
 - /components – Reusable UI components
 - /hooks – Custom hooks for data fetching
 - /context – Shared state management
 - /utils – Helper functions and constants


⚠️ Error Handling & Fallback UI
''
 - Graceful handling of API failures
 - User-friendly error messages

 
🔁 Reusability
 - Abstracted common patterns into reusable components
 - Separated concerns for maintainability

🚀 Live Demo
🔗 Deployed on Vercel:
 https://space-x-dashboard-gold.vercel.app/


## 📥 Installation & Running the App
# 1. Clone the repository
git clone https://github.com/Abhishekah05/SpaceX-Dashboard.git

# 2. Go into the project directory
cd SpaceX-Dashboard

# 3. Install dependencies
npm install

# 4. Start the development server
npm start
