# Excel-Analytics

Excel-Analytics is a full-stack MERN based data vosualization and analytics platform. User can upload files in xlsx or csv format and generate charts of either 2d or 3d type and save them to database or export them.  They can see tehir number of files uploaded, total file size, total charts created and other metrics. It also contains the activity table which shows chart type, name, date and delete option. Users can see chart history and can view or download them. There is also a admin dashboard which contains usage analytics of normal users and gives admin power to update role of user or delete their accounts. Toast notifications are shown for each action of user for efficent feedback.

## Features
- Upload .xlsx or .csv files

- Preview uploaded data

- View summary statistics (mean, median, mode, etc.)

- Generate visualizations (bar, pie, line charts)

- Authentication system (Login/Register)

- User can generate and export json summary for their charts.

- Admin Dashboard with full admin privileges and user analytics visualization.

- Toast notifications for each user action for proper feedback.

- Mobile-friendly UI

## Tech Stack
- Frontend: React, Axios, React Router
- Backend: Node.js, Express
- Database: MongoDB Atlas
- Others: Mongoose, JWT, CORS, dotenv

## Folder structure

```
excel-analytics/
├── backend/    
│ ├── controllers/
│ ├── middleware/ 
│ ├── models/
│ ├── routes/
│ └── server.js
│
├── frontend/
│ ├── src/
│ ├── public/
│ └── package.json
│
└── README.md

```

## Sample Functionalities
- User logs in or registers

- Uploads an Excel file

- Gets insights like:

    - Number of rows/columns

    - Column-wise statistics

    - Graphical representation

## 🚀 Getting Started

Follow the steps below to set up and run the **Excel Analytics System** locally.

### 🧩 Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/) (v16 or above)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (either local or Atlas)
- Git

1. ### Clone the Repository
```bash
git clone https://github.com/VivekVallabhan3407/Excel-Analytics.git
cd excel-analytics
```
2. ### ⚙️ Setup Backend

1. Go to the backend folder:
```bash
cd backend
```

2. Install Dependencies
```bash
npm install
```
3. Create a .env file inside the backend/ folder by following the .env-example file:

4. Start the backend server:
```bash
npm run dev
```
The API should now run on http://localhost:5000.

3. ### 💻 Setup Frontend

1. Open a new terminal and navigate to frontend:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the React development server:
```bash
npm run dev
```

The frontend should be running on http://localhost:5173.

## License

This project is licensed under the [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/).  
No commercial use, modification, or redistribution permitted without explicit permission.

