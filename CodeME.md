# Academic Control System — CodeME.md

## 1. Context & Business Goal

The "Academic Control System" is a full-stack MERN application designed to be a dynamic, extensible academic analytics and prediction engine. It moves beyond static marks tracking to offer students a powerful decision-support system for managing their academic progress.

**Problem Statement:** Current academic tracking tools are often rigid, lacking the flexibility to adapt to diverse academic structures (e.g., varying evaluation components, weights, credit systems across subjects/semesters). Students struggle to understand their real-time performance, predict future outcomes, or plan for target grades effectively. This leads to reactive studying rather than proactive strategic planning.

**Business Goal:** To empower students with a comprehensive, real-time, and predictive tool that dynamically models their academic journey, providing actionable insights into performance, future projections, and target achievement strategies. The system aims to reduce academic anxiety by offering clarity and control over their grades.

**Key Product Value Propositions:**
*   **Dynamic Structure Management:** Users can define and modify semesters, subjects, and evaluation components (MSE, SEE, tasks, labs) at runtime, preventing hardcoded limitations.
*   **Real-time Performance Metrics:** Instantaneous calculation of percentages, SGPA (Current, Projected, Maximum), and overall academic standing.
*   **Multi-Modal Prediction Engine:** Offers Optimistic, Performance-Based, and Weighted Recency projections to model various future scenarios.
*   **Target Planner:** Helps users strategize by calculating required marks to achieve desired percentages or SGPA, including feasibility checks.
*   **Advanced Analytics:** Provides insights into weak areas, subject contribution to SGPA, difficulty indicators, and marginal gain analysis.
*   **What-If Simulation:** Allows hypothetical mark entry to instantly see its impact on final grades.
*   **AI Co-Pilot (Stretch Goal):** Natural Language Processing (NLP) interface for advanced queries and guidance, making complex data accessible.
*   **Maintenance Mode:** A global toggle to lock structure editing, ensuring data integrity during critical periods or updates.

**MVP Scope for a 24-48h Hackathon:**
The primary focus for the hackathon is to deliver the core dynamic structure management, marks entry, real-time calculation of percentages and SGPA (current, projected, max), all three prediction modes, the target planner, and a functional calendar. The UI must strictly adhere to the neo-minimalist, boxy, utility-focused design. The AI Co-Pilot will be a basic integration (e.g., a simple text input that sends a prompt and displays a raw LLM response) or a stretch goal if time permits. Authentication, Authorization, and the global Maintenance Mode are essential. Advanced analytics can be simplified to key metrics.

## 2. Exact Tech Stack (High Fidelity)

This project leverages a modern MERN stack with real-time capabilities and AI integration.

**Frontend:**
*   **Framework:** React v18+ (functional components, hooks)
*   **Build Tool:** Vite v4+
*   **State Management:** Zustand v4+
*   **Routing:** React Router DOM v6+
*   **HTTP Client:** Axios v1+
*   **Styling:** Tailwind CSS v3+ (with PostCSS, Autoprefixer)
*   **Charts:** React-Chartjs-2 v5+ with Chart.js v4+
*   **Calendar:** React-FullCalendar v5+ with FullCalendar v6+ plugins (daygrid, interaction)
*   **Icons:** React Icons v2+
*   **UI Components:** Headless UI (optional, for unstyled components like dialogs, menus) or custom components built with Tailwind.

**Backend:**
*   **Runtime:** Node.js v18+
*   **Framework:** Express.js v4+
*   **Database ODM:** Mongoose v7+
*   **Authentication:** jsonwebtoken v9+ (for JWTs), bcryptjs v2+ (for password hashing)
*   **Environment Variables:** dotenv v16+
*   **CORS:** cors v2+
*   **Security:** helmet v7+
*   **Rate Limiting:** express-rate-limit v6+
*   **Real-time:** Socket.io v4+
*   **Redis Client:** ioredis v5+
*   **Input Validation:** express-validator v7+
*   **AI Integration:** openai v4+ (OpenAI Node.js library)
*   **Utilities:** lodash (optional, for utility functions)

**Database:**
*   MongoDB Atlas (NoSQL Cloud Database)

**Cache:**
*   Redis (Key-Value Store, hosted on Railway or Upstash)

**Deployment:**
*   **Frontend:** Vercel
*   **Backend & Socket.io:** Railway
*   **Database:** MongoDB Atlas Free Tier

## 3. Project Folder Structure

```
academic-control-system/
├── .git/                                   # Git version control
├── .github/                                # GitHub Actions or other CI/CD (optional for hackathon)
├── .env.example                            # Example environment variables for root (if any shared)
├── README.md                               # Project documentation
├── frontend/                               # React + Vite application
│   ├── public/                             # Static assets (favicons, images)
│   │   └── vite.svg
│   ├── src/                                # Frontend source code
│   │   ├── assets/                         # Images, fonts, other static files used by components
│   │   ├── components/                     # Reusable UI components
│   │   │   ├── Auth/                       # Authentication related components
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   └── SignupForm.jsx
│   │   │   ├── Layout/                     # Layout components (Sidebar, Navbar, MainLayout)
│   │   │   │   ├── MainLayout.jsx          # Overall page layout wrapper
│   │   │   │   ├── Sidebar.jsx             # Left-hand navigation sidebar
│   │   │   │   └── TopBar.jsx              # Optional top bar for user info/actions
│   │   │   ├── Shared/                     # Generic, highly reusable UI elements
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx                # Boxy container for sections
│   │   │   │   ├── Input.jsx               # Styled input field
│   │   │   │   ├── Modal.jsx               # Generic modal component
│   │   │   │   ├── Table.jsx               # Generic table component for data display
│   │   │   │   └── LoadingSpinner.jsx
│   │   │   ├── Subjects/                   # Components specific to subject/marks management
│   │   │   │   ├── SubjectCard.jsx         # Displays subject details and component marks
│   │   │   │   ├── ComponentInputRow.jsx   # Row for entering/editing marks for a single component
│   │   │   │   └── SubjectForm.jsx         # Form for adding/editing subjects
│   │   │   ├── Predictions/                # Components for displaying prediction results
│   │   │   │   └── PredictionDisplay.jsx   # Card for a single prediction mode
│   │   │   ├── Analytics/                  # Components for charts and analytics metrics
│   │   │   │   ├── ChartContainer.jsx      # Wrapper for Chart.js instances
│   │   │   │   └── MetricCard.jsx          # Displays a single key metric (e.g., SGPA)
│   │   │   ├── Calendar/                   # Calendar-specific components
│   │   │   │   └── EventModal.jsx          # Modal for adding/editing calendar events
│   │   │   └── CoPilot/                    # AI Co-Pilot chat interface
│   │   │       └── CoPilotChatWindow.jsx   # Chat UI component
│   │   ├── hooks/                          # Custom React hooks for reusable logic
│   │   │   ├── useAuth.js                  # Hook for auth state and actions
│   │   │   └── useSocket.js                # Hook for Socket.io connection management
│   │   ├── pages/                          # Top-level page components, wrapped by Layout
│   │   │   ├── DashboardPage.jsx           # Overall summary and key metrics
│   │   │   ├── SubjectsPage.jsx            # Semester and subject management, marks entry
│   │   │   ├── PredictionsPage.jsx         # Displays all prediction models
│   │   │   ├── TargetPlannerPage.jsx       # Interface for target setting and calculation
│   │   │   ├── CalendarPage.jsx            # Academic events calendar
│   │   │   ├── AnalyticsPage.jsx           # Advanced analytics and visualizations
│   │   │   ├── SettingsPage.jsx            # Application settings (e.g., maintenance mode)
│   │   │   ├── LoginPage.jsx               # User login interface
│   │   │   └── SignupPage.jsx              # User registration interface
│   │   ├── store/                          # Zustand stores for global state management
│   │   │   ├── authStore.js                # Authentication state (user, token)
│   │   │   ├── semesterStore.js            # Semesters, subjects, current selection
│   │   │   ├── marksStore.js               # Marks data, real-time updates
│   │   │   ├── configStore.js              # Global configuration (e.g., maintenance mode)
│   │   │   └── uiStore.js                  # UI specific states (loading, modals)
│   │   ├── services/                       # API client functions (Axios instances, wrappers)
│   │   │   └── api.js                      # Centralized API client with interceptors
│   │   ├── utils/                          # Frontend utility functions
│   │   │   ├── constants.js                # Global constants, grade mapping
│   │   │   └── calculations.js             # Frontend-side calculation helpers (e.g., SGPA display)
│   │   ├── App.jsx                         # Main application component, handles routing
│   │   ├── main.jsx                        # Entry point for the React app
│   │   └── index.css                       # Tailwind CSS directives and base styles
│   ├── .env.example                        # Example environment variables for frontend
│   ├── package.json                        # Frontend dependencies and scripts
│   └── tailwind.config.js                  # Tailwind CSS configuration
├── backend/                                # Node.js + Express.js application
│   ├── src/                                # Backend source code
│   │   ├── config/                         # Configuration files
│   │   │   ├── db.js                       # MongoDB connection setup
│   │   │   ├── redis.js                    # Redis client setup
│   │   │   └── env.js                      # Environment variable loading and validation
│   │   ├── middleware/                     # Express middleware functions
│   │   │   ├── authMiddleware.js           # JWT verification and user authentication
│   │   │   ├── errorHandler.js             # Centralized error handling
│   │   │   └── maintenanceMiddleware.js    # Checks and enforces maintenance mode
│   │   ├── models/                         # Mongoose schemas
│   │   │   ├── User.js                     # User schema
│   │   │   ├── Semester.js                 # Semester schema
│   │   │   ├── Subject.js                  # Subject schema
│   │   │   ├── Marks.js                    # Marks schema
│   │   │   ├── Event.js                    # Calendar Event schema
│   │   │   └── GlobalConfig.js             # Global configuration schema (e.g., maintenance mode)
│   │   ├── routes/                         # API route definitions
│   │   │   ├── authRoutes.js               # User authentication routes
│   │   │   ├── semesterRoutes.js           # CRUD for semesters
│   │   │   ├── subjectRoutes.js            # CRUD for subjects and components
│   │   │   ├── marksRoutes.js              # CRUD for marks, bulk updates
│   │   │   ├── eventRoutes.js              # CRUD for calendar events
│   │   │   ├── configRoutes.js             # Global configuration routes
│   │   │   ├── predictionRoutes.js         # Endpoints for prediction calculations
│   │   │   ├── analyticsRoutes.js          # Endpoints for advanced analytics
│   │   │   └── aiRoutes.js                 # AI Co-Pilot integration routes
│   │   ├── controllers/                    # Logic for handling API requests
│   │   │   ├── authController.js
│   │   │   ├── semesterController.js
│   │   │   ├── subjectController.js
│   │   │   ├── marksController.js
│   │   │   ├── eventController.js
│   │   │   ├── configController.js
│   │   │   ├── predictionController.js
│   │   │   ├── analyticsController.js
│   │   │   └── aiController.js
│   │   ├── services/                       # External service integrations (e.g., OpenAI API calls)
│   │   │   └── openaiService.js            # Wrapper for OpenAI API
│   │   ├── utils/                          # Backend utility functions
│   │   │   ├── jwt.js                      # JWT token generation/verification
│   │   │   ├── calculations.js             # Core academic calculation logic (SGPA, percentages, predictions)
│   │   │   └── validation.js               # Joi/Express-validator schemas
│   │   ├── socketHandler.js                # Socket.io event handling logic
│   │   ├── app.js                          # Express application setup (middleware, routes)
│   │   └── server.js                       # Main server entry point (HTTP, Socket.io, DB connect)
│   ├── .env.example                        # Example environment variables for backend
│   └── package.json                        # Backend dependencies and scripts
└── package.json                            # Root package.json for workspace (if using yarn/npm workspaces)
```

## 4. Database Schemas (Implementation Ready)

All schemas include `userId` for multi-tenancy and `timestamps` for `createdAt` and `updatedAt`.

```javascript
// backend/src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false // Do not return password in queries by default
    }
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

```javascript
// backend/src/models/Semester.js
const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Semester name is required'],
        trim: true,
        minlength: 1
    },
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }]
}, {
    timestamps: true
});

// Cascade delete subjects when a semester is deleted
semesterSchema.pre('remove', async function(next) {
    await this.model('Subject').deleteMany({ semesterId: this._id });
    next();
});

module.exports = mongoose.model('Semester', semesterSchema);
```

```javascript
// backend/src/models/Subject.js
const mongoose = require('mongoose');

const subjectComponentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Component name is required'],
        trim: true
    },
    maxMarks: {
        type: Number,
        required: [true, 'Maximum marks for component is required'],
        min: 0
    },
    weight: {
        type: Number,
        required: [true, 'Weight for component is required'],
        min: 0,
        max: 1 // Represented as a percentage, e.g., 0.25 for 25%
    },
    type: {
        type: String,
        enum: ['exam', 'task', 'lab', 'project', 'quiz', 'assignment', 'other'],
        default: 'exam'
    }
}, { _id: false }); // Do not create _id for subdocuments

const subjectSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    semesterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Semester',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Subject name is required'],
        trim: true,
        minlength: 1
    },
    credits: {
        type: Number,
        required: [true, 'Subject credits are required'],
        min: 0
    },
    components: [subjectComponentSchema]
}, {
    timestamps: true
});

// Cascade delete marks when a subject is deleted
subjectSchema.pre('remove', async function(next) {
    await this.model('Marks').deleteMany({ subjectId: this._id });
    // Also remove this subject's reference from its parent semester
    await this.model('Semester').updateOne(
        { _id: this.semesterId },
        { $pull: { subjects: this._id } }
    );
    next();
});

module.exports = mongoose.model('Subject', subjectSchema);
```

```javascript
// backend/src/models/Marks.js
const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    componentName: { // Must match a name in Subject.components
        type: String,
        required: [true, 'Component name for marks is required'],
        trim: true
    },
    obtainedMarks: {
        type: Number,
        required: [true, 'Obtained marks are required'],
        min: 0
    }
}, {
    timestamps: true
});

// Ensure a user can only have one mark entry for a specific component within a subject
marksSchema.index({ userId: 1, subjectId: 1, componentName: 1 }, { unique: true });

module.exports = mongoose.model('Marks', marksSchema);
```

```javascript
// backend/src/models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Event title is required'],
        trim: true
    },
    date: {
        type: Date,
        required: [true, 'Event date is required']
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: false // Optional, an event might not be tied to a specific subject
    },
    type: {
        type: String,
        enum: ['exam', 'deadline', 'task', 'lecture', 'other'],
        default: 'other'
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
```

```javascript
// backend/src/models/GlobalConfig.js
const mongoose = require('mongoose');

const globalConfigSchema = new mongoose.Schema({
    // Only one global config document should exist, managed by an admin user.
    // This userId is for traceability of who last updated it.
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // Must be set by an admin user
    },
    maintenanceMode: {
        type: Boolean,
        default: false
    },
    // Add other global settings here if needed
}, {
    timestamps: true
});

module.exports = mongoose.model('GlobalConfig', globalConfigSchema);
```

## 5. API Endpoint Definitions (Comprehensive)

All endpoints are prefixed with `/api/v1`. All protected routes require a valid JWT via `authMiddleware`. `Admin only` routes require an additional `adminMiddleware`.

---

**1. Authentication Routes (`/api/v1/auth`)**

*   **POST /api/v1/auth/register**
    *   **Description:** Register a new user.
    *   **Payload:**
        ```json
        {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "password": "password123"
        }
        ```
    *   **Success Response (201 Created):**
        ```json
        {
            "success": true,
            "token": "eyJhbGciOiJIUzI1Ni...",
            "user": {
                "_id": "65b7c...",
                "name": "John Doe",
                "email": "john.doe@example.com"
            }
        }
        ```
    *   **Error Response (400 Bad Request / 500 Server Error):**
        ```json
        {
            "success": false,
            "message": "User with this email already exists."
        }
        ```
    *   **Middleware:** None (public route).

*   **POST /api/v1/auth/login**
    *   **Description:** Authenticate user and get JWT.
    *   **Payload:**
        ```json
        {
            "email": "john.doe@example.com",
            "password": "password123"
        }
        ```
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "token": "eyJhbGciOiJIUzI1Ni...",
            "user": {
                "_id": "65b7c...",
                "name": "John Doe",
                "email": "john.doe@example.com"
            }
        }
        ```
    *   **Error Response (401 Unauthorized / 400 Bad Request):**
        ```json
        {
            "success": false,
            "message": "Invalid credentials"
        }
        ```
    *   **Middleware:** None (public route).

*   **GET /api/v1/auth/me**
    *   **Description:** Get current logged-in user's profile.
    *   **Payload:** None (token in header).
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "user": {
                "_id": "65b7c...",
                "name": "John Doe",
                "email": "john.doe@example.com"
            }
        }
        ```
    *   **Error Response (401 Unauthorized):**
        ```json
        {
            "success": false,
            "message": "Not authorized, token failed"
        }
        ```
    *   **Middleware:** `authMiddleware`.

---

**2. Semester Routes (`/api/v1/semesters`)**

*   **POST /api/v1/semesters**
    *   **Description:** Create a new semester.
    *   **Payload:**
        ```json
        {
            "name": "Semester 1"
        }
        ```
    *   **Success Response (201 Created):**
        ```json
        {
            "success": true,
            "data": {
                "_id": "65b7d...",
                "name": "Semester 1",
                "userId": "65b7c...",
                "subjects": [],
                "createdAt": "...",
                "updatedAt": "..."
            }
        }
        ```
    *   **Middleware:** `authMiddleware`, `maintenanceMiddleware` (allows creation if maintenance mode is ON).

*   **GET /api/v1/semesters**
    *   **Description:** Get all semesters for the logged-in user.
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "count": 1,
            "data": [
                {
                    "_id": "65b7d...",
                    "name": "Semester 1",
                    "userId": "65b7c...",
                    "subjects": ["65b7e..."], // Populated references to Subject IDs
                    "createdAt": "...",
                    "updatedAt": "..."
                }
            ]
        }
        ```
    *   **Middleware:** `authMiddleware`.

*   **GET /api/v1/semesters/:id**
    *   **Description:** Get a single semester by ID, populated with subjects.
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "_id": "65b7d...",
                "name": "Semester 1",
                "userId": "65b7c...",
                "subjects": [
                    {
                        "_id": "65b7e...",
                        "name": "DAA",
                        "credits": 4,
                        "components": [ { "name": "MSE 1", "maxMarks": 50, "weight": 0.25, "type": "exam" } ]
                    }
                ],
                "createdAt": "...",
                "updatedAt": "..."
            }
        }
        ```
    *   **Middleware:** `authMiddleware`.

*   **PUT /api/v1/semesters/:id**
    *   **Description:** Update a semester's name.
    *   **Payload:**
        ```json
        {
            "name": "Semester 4 (Current)"
        }
        ```
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "_id": "65b7d...",
                "name": "Semester 4 (Current)",
                "userId": "65b7c...",
                "subjects": [],
                "createdAt": "...",
                "updatedAt": "..."
            }
        }
        ```
    *   **Middleware:** `authMiddleware`, `maintenanceMiddleware`.

*   **DELETE /api/v1/semesters/:id**
    *   **Description:** Delete a semester and all associated subjects and marks.
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "message": "Semester deleted successfully"
        }
        ```
    *   **Middleware:** `authMiddleware`, `maintenanceMiddleware`.

---

**3. Subject Routes (`/api/v1/subjects`)**

*   **POST /api/v1/subjects**
    *   **Description:** Create a new subject within a semester.
    *   **Payload:**
        ```json
        {
            "semesterId": "65b7d...",
            "name": "DAA",
            "credits": 4,
            "components": [
                { "name": "MSE 1", "maxMarks": 50, "weight": 0.25, "type": "exam" },
                { "name": "SEE", "maxMarks": 100, "weight": 0.5, "type": "exam" },
                { "name": "Task 1", "maxMarks": 20, "weight": 0.15, "type": "task" },
                { "name": "Lab", "maxMarks": 30, "weight": 0.1, "type": "lab" }
            ]
        }
        ```
    *   **Success Response (201 Created):**
        ```json
        {
            "success": true,
            "data": {
                "_id": "65b7e...",
                "name": "DAA",
                "credits": 4,
                "components": [...],
                "semesterId": "65b7d...",
                "userId": "65b7c...",
                "createdAt": "...",
                "updatedAt": "..."
            }
        }
        ```
    *   **Middleware:** `authMiddleware`, `maintenanceMiddleware`.

*   **GET /api/v1/subjects/:id**
    *   **Description:** Get a single subject by ID.
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "_id": "65b7e...",
                "name": "DAA",
                "credits": 4,
                "components": [...],
                "semesterId": "65b7d...",
                "userId": "65b7c...",
                "createdAt": "...",
                "updatedAt": "..."
            }
        }
        ```
    *   **Middleware:** `authMiddleware`.

*   **GET /api/v1/subjects/semester/:semesterId**
    *   **Description:** Get all subjects for a specific semester.
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "count": 2,
            "data": [
                { "_id": "65b7e...", "name": "DAA", "credits": 4, "components": [...], "semesterId": "65b7d..." },
                { "_id": "65b7f...", "name": "OS", "credits": 3, "components": [...], "semesterId": "65b7d..." }
            ]
        }
        ```
    *   **Middleware:** `authMiddleware`.

*   **PUT /api/v1/subjects/:id**
    *   **Description:** Update a subject's details (name, credits).
    *   **Payload:**
        ```json
        {
            "name": "Design & Analysis of Algorithms",
            "credits": 5
        }
        ```
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "_id": "65b7e...",
                "name": "Design & Analysis of Algorithms",
                "credits": 5,
                "components": [...],
                "semesterId": "65b7d...",
                "userId": "65b7c...",
                "createdAt": "...",
                "updatedAt": "..."
            }
        }
        ```
    *   **Middleware:** `authMiddleware`, `maintenanceMiddleware`.

*   **PUT /api/v1/subjects/:id/components**
    *   **Description:** Update a subject's component structure (add, remove, modify components). This replaces the entire `components` array.
    *   **Payload:**
        ```json
        {
            "components": [
                { "name": "MSE 1", "maxMarks": 50, "weight": 0.3, "type": "exam" }, // Modified weight
                { "name": "SEE", "maxMarks": 100, "weight": 0.5, "type": "exam" },
                { "name": "Project", "maxMarks": 50, "weight": 0.2, "type": "project" } // New component
            ]
        }
        ```
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "_id": "65b7e...",
                "name": "DAA",
                "credits": 4,
                "components": [
                    { "name": "MSE 1", "maxMarks": 50, "weight": 0.3, "type": "exam" },
                    { "name": "SEE", "maxMarks": 100, "weight": 0.5, "type": "exam" },
                    { "name": "Project", "maxMarks": 50, "weight": 0.2, "type": "project" }
                ],
                "semesterId": "65b7d...",
                "userId": "65b7c...",
                "createdAt": "...",
                "updatedAt": "..."
            }
        }
        ```
    *   **Middleware:** `authMiddleware`, `maintenanceMiddleware`.

*   **DELETE /api/v1/subjects/:id**
    *   **Description:** Delete a subject and all its associated marks.
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "message": "Subject deleted successfully"
        }
        ```
    *   **Middleware:** `authMiddleware`, `maintenanceMiddleware`.

---

**4. Marks Routes (`/api/v1/marks`)**

*   **POST /api/v1/marks**
    *   **Description:** Create or update a single mark entry. This endpoint upserts based on `subjectId` and `componentName`.
    *   **Payload:**
        ```json
        {
            "subjectId": "65b7e...",
            "componentName": "MSE 1",
            "obtainedMarks": 45
        }
        ```
    *   **Success Response (201 Created / 200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "_id": "65b80...",
                "subjectId": "65b7e...",
                "componentName": "MSE 1",
                "obtainedMarks": 45,
                "userId": "65b7c...",
                "createdAt": "...",
                "updatedAt": "..."
            },
            "message": "Mark entry created/updated successfully"
        }
        ```
    *   **Middleware:** `authMiddleware`.
    *   **Logic:** After saving, trigger Socket.io event `marksUpdated` and `predictionUpdated`.

*   **POST /api/v1/marks/bulk**
    *   **Description:** Create or update multiple mark entries for a subject. This endpoint upserts based on `subjectId` and `componentName` for each item in the array.
    *   **Payload:**
        ```json
        {
            "subjectId": "65b7e...",
            "marks": [
                { "componentName": "MSE 1", "obtainedMarks": 45 },
                { "componentName": "Task 1", "obtainedMarks": 18 }
            ]
        }
        ```
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "message": "Bulk marks updated successfully",
            "data": [
                { "_id": "65b80...", "componentName": "MSE 1", "obtainedMarks": 45 },
                { "_id": "65b81...", "componentName": "Task 1", "obtainedMarks": 18 }
            ]
        }
        ```
    *   **Middleware:** `authMiddleware`.
    *   **Logic:** After saving, trigger Socket.io event `marksUpdated` and `predictionUpdated`.

*   **GET /api/v1/marks/subject/:subjectId**
    *   **Description:** Get all marks for a specific subject.
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "count": 2,
            "data": [
                { "_id": "65b80...", "subjectId": "65b7e...", "componentName": "MSE 1", "obtainedMarks": 45 },
                { "_id": "65b81...", "subjectId": "65b7e...", "componentName": "Task 1", "obtainedMarks": 18 }
            ]
        }
        ```
    *   **Middleware:** `authMiddleware`.

*   **DELETE /api/v1/marks/:id**
    *   **Description:** Delete a specific mark entry by its ID.
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "message": "Mark entry deleted successfully"
        }
        ```
    *   **Middleware:** `authMiddleware`.
    *   **Logic:** After deleting, trigger Socket.io event `marksUpdated` and `predictionUpdated`.

---

**5. Event Routes (`/api/v1/events`)**

*   **POST /api/v1/events**
    *   **Description:** Create a new calendar event.
    *   **Payload:**
        ```json
        {
            "title": "DAA Midterm Exam",
            "date": "2024-03-15T10:00:00.000Z",
            "subjectId": "65b7e...",
            "type": "exam",
            "description": "Chapter 1-3"
        }
        ```
    *   **Success Response (201 Created):**
        ```json
        {
            "success": true,
            "data": {
                "_id": "65b82...",
                "title": "DAA Midterm Exam",
                "date": "2024-03-15T10:00:00.000Z",
                "subjectId": "65b7e...",
                "type": "exam",
                "userId": "65b7c...",
                "createdAt": "...",
                "updatedAt": "..."
            }
        }
        ```
    *   **Middleware:** `authMiddleware`.

*   **GET /api/v1/events**
    *   **Description:** Get all events for the logged-in user. Optional query params for date range (`startDate`, `endDate`).
    *   **Query Params:** `?startDate=2024-03-01&endDate=2024-03-31`
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "count": 1,
            "data": [
                {
                    "_id": "65b82...",
                    "title": "DAA Midterm Exam",
                    "date": "2024-03-15T10:00:00.000Z",
                    "subjectId": "65b7e...",
                    "type": "exam",
                    "userId": "65b7c...",
                    "createdAt": "...",
                    "updatedAt": "..."
                }
            ]
        }
        ```
    *   **Middleware:** `authMiddleware`.

*   **PUT /api/v1/events/:id**
    *   **Description:** Update an event.
    *   **Payload:**
        ```json
        {
            "title": "DAA Final Exam",
            "date": "2024-05-20T09:00:00.000Z",
            "type": "exam"
        }
        ```
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "_id": "65b82...",
                "title": "DAA Final Exam",
                "date": "2024-05-20T09:00:00.000Z",
                "type": "exam",
                "userId": "65b7c...",
                "createdAt": "...",
                "updatedAt": "..."
            }
        }
        ```
    *   **Middleware:** `authMiddleware`.

*   **DELETE /api/v1/events/:id**
    *   **Description:** Delete an event.
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "message": "Event deleted successfully"
        }
        ```
    *   **Middleware:** `authMiddleware`.

---

**6. Global Configuration Routes (`/api/v1/config`)**

*   **GET /api/v1/config/maintenance**
    *   **Description:** Get the current maintenance mode status.
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "maintenanceMode": true
            }
        }
        ```
    *   **Middleware:** `authMiddleware` (can be public if needed, but for settings page, auth is fine).

*   **PUT /api/v1/config/maintenance**
    *   **Description:** Toggle maintenance mode. Requires admin privileges.
    *   **Payload:**
        ```json
        {
            "maintenanceMode": false
        }
        ```
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "maintenanceMode": false,
                "updatedBy": "65b7c...",
                "updatedAt": "..."
            }
        }
        ```
    *   **Middleware:** `authMiddleware`, `adminMiddleware` (must be an admin user).
    *   **Logic:** After saving, trigger Socket.io event `configUpdated`.

---

**7. Calculation & Prediction Routes (`/api/v1/calculations`, `/api/v1/predictions`)**

*   **GET /api/v1/calculations/sgpa**
    *   **Description:** Calculate and return current, projected, and maximum possible SGPA for the user's current semester (or all semesters if no current).
    *   **Query Params:** `?semesterId=65b7d...` (optional, for specific semester)
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "currentSGPAs": {
                    "65b7d...": { "value": 8.5, "percentage": 85.0 } // Semester ID -> SGPA/Percentage
                },
                "projectedSGPAs": {
                    "65b7d...": { "value": 9.2, "percentage": 92.0 }
                },
                "maximumSGPAs": {
                    "65b7d...": { "value": 10.0, "percentage": 100.0 }
                },
                "overall": {
                    "current": { "value": 8.5, "percentage": 85.0 },
                    "projected": { "value": 9.2, "percentage": 92.0 },
                    "maximum": { "value": 10.0, "percentage": 100.0 }
                }
            }
        }
        ```
    *   **Middleware:** `authMiddleware`.

*   **GET /api/v1/predictions/subject/:subjectId**
    *   **Description:** Get predictions for a single subject based on three modes.
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "subjectId": "65b7e...",
                "optimistic": { "percentage": 95, "gradePoint": 10, "message": "Assuming 100% in remaining components." },
                "performanceBased": { "percentage": 82, "gradePoint": 9, "message": "Based on 80% past performance." },
                "weightedRecency": { "percentage": 88, "gradePoint": 9, "message": "Recent scores weighted higher." }
            }
        }
        ```
    *   **Middleware:** `authMiddleware`.

*   **GET /api/v1/predictions/overall**
    *   **Description:** Get overall predictions for the current semester (or all).
    *   **Query Params:** `?semesterId=65b7d...` (optional)
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "optimistic": { "sgpa": 9.8, "percentage": 98, "message": "Overall assuming 100%..." },
                "performanceBased": { "sgpa": 8.5, "percentage": 85, "message": "Overall based on past..." },
                "weightedRecency": { "sgpa": 9.0, "percentage": 90, "message": "Overall recent weighted..." }
            }
        }
        ```
    *   **Middleware:** `authMiddleware`.

---

**8. Target Planner Routes (`/api/v1/target-planner`)**

*   **POST /api/v1/target-planner**
    *   **Description:** Calculate required marks in remaining components to hit a target.
    *   **Payload:** (Either `desiredPercentage` OR `desiredSgpa` must be provided, along with `subjectId` or `semesterId`)
        ```json
        {
            "subjectId": "65b7e...",
            "desiredPercentage": 85
        }
        // OR
        {
            "semesterId": "65b7d...",
            "desiredSgpa": 9.0
        }
        ```
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "targetAchievable": true,
                "requiredMarks": [
                    { "subjectId": "65b7e...", "subjectName": "DAA", "componentName": "SEE", "required": 75, "maxPossible": 100 },
                    { "subjectId": "65b7e...", "subjectName": "DAA", "componentName": "Project", "required": 40, "maxPossible": 50 }
                ],
                "message": "You need an average of 75% in remaining DAA components.",
                "maxAchievable": { "percentage": 92, "sgpa": 9.4 } // If target was impossible
            }
        }
        ```
    *   **Error Response (400 Bad Request):**
        ```json
        {
            "success": false,
            "message": "Target is impossible to achieve. Maximum possible is 88%."
        }
        ```
    *   **Middleware:** `authMiddleware`.

---

**9. What-If Simulation Routes (`/api/v1/what-if`)**

*   **POST /api/v1/what-if**
    *   **Description:** Simulate hypothetical marks and return projected final percentage/SGPA.
    *   **Payload:**
        ```json
        {
            "semesterId": "65b7d...",
            "hypotheticalMarks": [
                { "subjectId": "65b7e...", "componentName": "SEE", "marks": 70 },
                { "subjectId": "65b7f...", "componentName": "Final", "marks": 85 }
            ]
        }
        ```
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "finalPercentage": 88.5,
                "finalSgpa": 9.1
            }
        }
        ```
    *   **Middleware:** `authMiddleware`.

---

**10. Advanced Analytics Routes (`/api/v1/analytics`)**

*   **GET /api/v1/analytics/performance**
    *   **Description:** Get performance metrics (percentages) per subject and overall.
    *   **Query Params:** `?semesterId=65b7d...` (optional)
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "overallPercentage": 85.2,
                "subjectPerformance": [
                    { "subjectId": "65b7e...", "name": "DAA", "percentage": 88.0 },
                    { "subjectId": "65b7f...", "name": "OS", "percentage": 79.5 }
                ]
            }
        }
        ```
    *   **Middleware:** `authMiddleware`.

*   **GET /api/v1/analytics/weak-areas**
    *   **Description:** Identify lowest scoring subjects/components.
    *   **Query Params:** `?semesterId=65b7d...` (optional)
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "lowestSubjects": [
                    { "subjectId": "65b7f...", "name": "OS", "percentage": 79.5 }
                ],
                "lowestComponents": [
                    { "subjectId": "65b7e...", "subjectName": "DAA", "componentName": "Lab", "percentage": 60.0 }
                ]
            }
        }
        ```
    *   **Middleware:** `authMiddleware`.

*   **GET /api/v1/analytics/contribution**
    *   **Description:** Show contribution of each subject to overall SGPA.
    *   **Query Params:** `?semesterId=65b7d...` (optional)
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": [
                { "subjectId": "65b7e...", "name": "DAA", "credits": 4, "currentGradePoint": 9, "contributionToSGPA": 36 },
                { "subjectId": "65b7f...", "name": "OS", "credits": 3, "currentGradePoint": 8, "contributionToSGPA": 24 }
            ]
        }
        ```
    *   **Middleware:** `authMiddleware`.

*   **GET /api/v1/analytics/difficulty**
    *   **Description:** Compare required marks vs. past performance for remaining components.
    *   **Query Params:** `?semesterId=65b7d...` (optional)
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": [
                { "subjectId": "65b7e...", "subjectName": "DAA", "componentName": "SEE", "requiredPercentage": 75, "pastAveragePercentage": 80, "difficulty": "Moderate" },
                { "subjectId": "65b7f...", "subjectName": "OS", "componentName": "Final", "requiredPercentage": 95, "pastAveragePercentage": 70, "difficulty": "Hard" }
            ]
        }
        ```
    *   **Middleware:** `authMiddleware`.

*   **GET /api/v1/analytics/marginal-gain**
    *   **Description:** Compute SGPA improvement per +1 mark in each subject.
    *   **Query Params:** `?semesterId=65b7d...` (optional)
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": [
                { "subjectId": "65b7e...", "name": "DAA", "sgpaImprovementPerMark": 0.02 },
                { "subjectId": "65b7f...", "name": "OS", "sgpaImprovementPerMark": 0.015 }
            ]
        }
        ```
    *   **Middleware:** `authMiddleware`.

---

**11. AI Co-Pilot Routes (`/api/v1/ai`)**

*   **POST /api/v1/ai/query**
    *   **Description:** Send a natural language query to the AI Co-Pilot. The backend will process this, potentially query internal data, and use an LLM to generate a response.
    *   **Payload:**
        ```json
        {
            "prompt": "What do I need to score in the DAA final to hit an 8 SGPA?"
        }
        ```
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "response": "To achieve an 8 SGPA, you would need to score approximately 70/100 in your DAA final exam, assuming your current marks remain as they are."
            }
        }
        ```
    *   **Error Response (500 Server Error / 400 Bad Request):**
        ```json
        {
            "success": false,
            "message": "Could not process AI query."
        }
        ```
    *   **Middleware:** `authMiddleware`.
    *   **Logic:** The `aiController` will parse the `prompt`, potentially call other backend calculation/prediction services, and then formulate a request to the OpenAI API, returning its response.

---

## 6. Real-time Events (WebSockets / Socket.io)

The Socket.io server (integrated with the Express backend) will handle real-time updates to ensure the UI reflects changes instantly without manual refreshes. Each user will join a dedicated "room" for their `userId` to receive private updates.

**Client-Side (Frontend) Emits:**

*   **`joinUserRoom`**
    *   **Description:** Sent by the client immediately after successful authentication to join a user-specific room on the server.
    *   **Payload:**
        ```json
        {
            "userId": "65b7c..."
        }
        ```
    *   **Flow:** Client authenticates -> receives JWT -> connects Socket.io -> emits `joinUserRoom`.

*   **`updateMarks`**
    *   **Description:** Sent when a user directly edits a mark in the UI. This triggers a backend update and subsequent real-time recalculations.
    *   **Payload:**
        ```json
        {
            "subjectId": "65b7e...",
            "componentName": "MSE 1",
            "obtainedMarks": 45
        }
        ```
    *   **Flow:** User edits mark in `SubjectsPage` -> client emits `updateMarks`.

*   **`requestPrediction`**
    *   **Description:** (Optional, if predictions are not always automatically updated) Client can explicitly request a new prediction calculation.
    *   **Payload:**
        ```json
        {
            "subjectId": "65b7e...", // Optional, for subject-specific prediction
            "mode": "optimistic" // Optional, for a specific mode
        }
        ```
    *   **Flow:** User navigates to `PredictionsPage` or clicks "Refresh" -> client emits `requestPrediction`.

**Server-Side (Backend) Emits:**

*   **`marksUpdated`**
    *   **Description:** Emitted to a specific `userId`'s room when any mark entry belonging to that user is created, updated, or deleted.
    *   **Payload:**
        ```json
        {
            "subjectId": "65b7e...",
            "marksData": [ // Array of all marks for the subject, or the updated mark
                { "_id": "65b80...", "componentName": "MSE 1", "obtainedMarks": 45 },
                { "_id": "65b81...", "componentName": "Task 1", "obtainedMarks": 18 }
            ]
        }
        ```
    *   **Flow:** `marksController` handles API call -> updates DB -> triggers `socketHandler.emitToUser(userId, 'marksUpdated', payload)`.

*   **`predictionUpdated`**
    *   **Description:** Emitted to a specific `userId`'s room when marks or structural changes lead to a recalculation of predictions (SGPA, percentages, etc.).
    *   **Payload:**
        ```json
        {
            "semesterId": "65b7d...", // Or null if overall
            "subjectId": "65b7e...", // Or null if overall
            "type": "sgpa" | "subjectPrediction" | "overallPrediction",
            "data": { /* structure similar to API responses for calculations/predictions */ }
        }
        ```
    *   **Flow:** `marksController` / `subjectController` update -> `calculations.js` / `predictionController` are called -> results are sent via `socketHandler.emitToUser(userId, 'predictionUpdated', payload)`.

*   **`configUpdated`**
    *   **Description:** Emitted to all connected clients (or specific user rooms if needed) when the global `maintenanceMode` status changes.
    *   **Payload:**
        ```json
        {
            "maintenanceMode": true,
            "message": "The system is now in maintenance mode. Structure editing is locked."
        }
        ```
    *   **Flow:** `configController` updates `GlobalConfig` -> triggers `socketHandler.emitToAllUsers('configUpdated', payload)`.

*   **`structureUpdated`**
    *   **Description:** Emitted to a specific `userId`'s room when semester, subject, or component structure changes (add/edit/delete). This prompts the client to refetch relevant structural data.
    *   **Payload:**
        ```json
        {
            "semesterId": "65b7d...", // ID of affected semester
            "subjectId": "65b7e...", // ID of affected subject
            "changeType": "added" | "updated" | "deleted",
            "entity": "semester" | "subject" | "component"
        }
        ```
    *   **Flow:** `semesterController` / `subjectController` update -> triggers `socketHandler.emitToUser(userId, 'structureUpdated', payload)`.

**Real-time Data Sync (Redis Cache):**
*   The `socketHandler.js` will likely use Redis for broadcasting messages efficiently and for potentially storing real-time calculation results temporarily to avoid redundant DB queries.
*   When a backend API triggers a calculation (e.g., after marks update), the result can be cached in Redis. Then, `socketHandler` can fetch from Redis and emit to clients.
*   The `maintenanceMiddleware` can also quickly check Redis for the `maintenanceMode` status before hitting the DB for `GlobalConfig`.

## 7. Frontend Pages & Components

The frontend will be a single-page application (SPA) built with React and Vite, using React Router DOM for navigation and Zustand for global state management. Tailwind CSS will be used for styling, adhering to the neo-minimalist, boxy, utility-focused design.

**State Management (Zustand):**
*   **`authStore.js`**: Manages user authentication state (`token`, `user` object), login/logout actions, and checks token validity.
*   **`semesterStore.js`**: Stores an array of `semesters`, the currently `selectedSemesterId`, and functions to `fetchSemesters`, `addSemester`, `updateSemester`, `deleteSemester`. It will also manage `subjects` associated with the selected semester.
*   **`marksStore.js`**: Stores `marks` data, organized by `subjectId`. Provides actions to `fetchMarksForSubject`, `updateMark`, `bulkUpdateMarks`. It will also listen to `marksUpdated` Socket.io events.
*   **`configStore.js`**: Stores the global `maintenanceMode` status and an action to `fetchMaintenanceMode`. Listens to `configUpdated` Socket.io events.
*   **`uiStore.js`**: Manages general UI states like `isLoading`, `isModalOpen`, `currentModalType`, and `notifications`.

---

**Page Descriptions & Component Usage:**

**1. `LoginPage.jsx` & `SignupPage.jsx`**
*   **UI Components:** `LoginForm.jsx`, `SignupForm.jsx`, `Input.jsx`, `Button.jsx`, `Card.jsx`.
*   **State Management:** `authStore` for login/registration data and actions.
*   **API Interactions:**
    *   `POST /api/v1/auth/login`
    *   `POST /api/v1/auth/register`
*   **Logic:** On successful auth, store JWT in `localStorage` and redirect to `/dashboard`.

**2. `DashboardPage.jsx` (`/dashboard`)**
*   **UI Components:** `MainLayout`, `Sidebar`, `MetricCard.jsx` (for SGPA, Overall %), `ChartContainer.jsx` (for simple progress bar or small trend charts).
*   **State Management:** `semesterStore` (for current semester context), `marksStore` (for latest mark data), `configStore` (for maintenance mode banner).
*   **API Interactions:**
    *   `GET /api/v1/calculations/sgpa`
    *   `GET /api/v1/predictions/overall`
*   **Logic:** Displays a summary of current, projected, and max SGPA/percentages. Shows a quick overview of academic health.

**3. `SubjectsPage.jsx` (`/subjects`)**
*   **UI Components:** `MainLayout`, `Sidebar`, `Card.jsx` (for semester/subject containers), `SubjectCard.jsx`, `ComponentInputRow.jsx`, `Input.jsx`, `Button.jsx`, `Modal.jsx`, `SubjectForm.jsx`.
*   **State Management:** `semesterStore` (to manage semesters and their subjects), `marksStore` (for marks data and updates).
*   **API Interactions:**
    *   `GET /api/v1/semesters` (to fetch all semesters)
    *   `POST /api/v1/semesters`, `PUT /api/v1/semesters/:id`, `DELETE /api/v1/semesters/:id`
    *   `POST /api/v1/subjects`, `PUT /api/v1/subjects/:id`, `DELETE /api/v1/subjects/:id`
    *   `PUT /api/v1/subjects/:id/components`
    *   `GET /api/v1/marks/subject/:subjectId` (fetched for each expanded subject)
    *   `POST /api/v1/marks/bulk` (for inline marks editing)
*   **Logic:** Allows users to dynamically add/edit/delete semesters and subjects. Each subject card expands to reveal its components and allows inline editing of `obtainedMarks`. Displays total marks/percentage for each subject dynamically. Structural changes are locked if `maintenanceMode` is true.

**4. `PredictionsPage.jsx` (`/predictions`)**
*   **UI Components:** `MainLayout`, `Sidebar`, `Card.jsx`, `PredictionDisplay.jsx` (three instances for each mode), `MetricCard.jsx` (for overall predictions).
*   **State Management:** `semesterStore` (to select a semester for predictions).
*   **API Interactions:**
    *   `GET /api/v1/predictions/subject/:subjectId` (for each subject)
    *   `GET /api/v1/predictions/overall`
*   **Logic:** Presents three distinct prediction models (Optimistic, Performance-Based, Weighted Recency) for both subject-level and overall SGPA/percentage. Each `PredictionDisplay` clearly states its assumptions.

**5. `TargetPlannerPage.jsx` (`/target-planner`)**
*   **UI Components:** `MainLayout`, `Sidebar`, `Card.jsx`, `Input.jsx`, `Button.jsx`, `Table.jsx` (for displaying required marks), `MetricCard.jsx` (for max achievable).
*   **State Management:** `semesterStore` (for subject/semester context).
*   **API Interactions:**
    *   `POST /api/v1/target-planner`
*   **Logic:** User inputs a desired percentage or SGPA. The system calculates and displays the required marks for remaining components, indicating feasibility and the maximum achievable score if the target is impossible.

**6. `CalendarPage.jsx` (`/calendar`)**
*   **UI Components:** `MainLayout`, `Sidebar`, `FullCalendar` component, `EventModal.jsx`, `Input.jsx`, `Button.jsx`.
*   **State Management:** `uiStore` (for modal visibility), `semesterStore` (to link events to subjects).
*   **API Interactions:**
    *   `GET /api/v1/events` (fetching all events for the current view range)
    *   `POST /api/v1/events`, `PUT /api/v1/events/:id`, `DELETE /api/v1/events/:id`
*   **Logic:** Displays academic events (exams, deadlines) on an interactive calendar. Users can add, edit, or delete events, linking them to specific subjects and color-coding them.

**7. `AnalyticsPage.jsx` (`/analytics`)**
*   **UI Components:** `MainLayout`, `Sidebar`, `Card.jsx`, `ChartContainer.jsx` (for bar/line charts), `MetricCard.jsx`.
*   **State Management:** `semesterStore`.
*   **API Interactions:**
    *   `GET /api/v1/analytics/performance`
    *   `GET /api/v1/analytics/weak-areas`
    *   `GET /api/v1/analytics/contribution`
    *   `GET /api/v1/analytics/difficulty`
    *   `GET /api/v1/analytics/marginal-gain`
*   **Logic:** Visualizes various academic analytics. Uses simple, monochrome charts to display performance metrics, identify weak areas, show subject contributions, and analyze marginal gains.

**8. `SettingsPage.jsx` (`/settings`)**
*   **UI Components:** `MainLayout`, `Sidebar`, `Card.jsx`, `Button.jsx`, Toggle switch component.
*   **State Management:** `configStore` (for maintenance mode status).
*   **API Interactions:**
    *   `GET /api/v1/config/maintenance`
    *   `PUT /api/v1/config/maintenance`
*   **Logic:** Allows users to view and (if admin) toggle the global `maintenanceMode`.

**9. `CoPilotChatWindow.jsx` (Component, integrated into various pages or as a fixed sidebar/modal)**
*   **UI Components:** `Input.jsx` (for chat input), `Button.jsx` (for send), `Card.jsx` (for chat messages).
*   **State Management:** Local component state for chat history, `uiStore` for visibility.
*   **API Interactions:**
    *   `POST /api/v1/ai/query`
*   **Logic:** Provides a chat interface for users to ask natural language questions. Displays user prompts and AI responses.

## 8. Authentication & Authorization Flow

The system employs JSON Web Tokens (JWT) for stateless authentication and authorization.

**1. User Registration (`POST /api/v1/auth/register`)**
*   User provides `name`, `email`, `password`.
*   Backend hashes the `password` using `bcryptjs`.
*   A new `User` document is created in MongoDB.
*   A JWT is signed using `jsonwebtoken` with the user's ID as the payload.
*   The JWT and basic user info are returned to the client.

**2. User Login (`POST /api/v1/auth/login`)**
*   User provides `email`, `password`.
*   Backend retrieves the `User` by `email`.
*   The provided `password` is compared with the stored hashed password using `bcryptjs`.
*   If credentials match, a new JWT is signed with user's ID and returned.

**3. JWT Handling (Frontend)**
*   Upon successful registration or login, the JWT (`token`) is stored in `localStorage` in the browser.
*   For every subsequent authenticated API request, the `token` is retrieved from `localStorage` and sent in the `Authorization` header as a Bearer token (`Authorization: Bearer <token>`).
*   Axios interceptors will be used to automatically attach the token to outgoing requests.

**4. Authentication Middleware (`authMiddleware.js` - Backend)**
*   This middleware intercepts requests to protected routes.
*   It checks for the `Authorization` header.
*   It verifies the JWT using `jsonwebtoken.verify()` with `JWT_SECRET`.
*   If valid, it extracts the `userId` from the token's payload, fetches the corresponding `User` from the database, and attaches the `user` object to `req.user`.
*   If invalid or missing, it returns a 401 Unauthorized error.

**5. Authorization (Role-Based Access Control)**
*   For the hackathon, a simple authorization model will be used:
    *   All user-specific data (semesters, subjects, marks, events) are tied to `req.user._id` (multi-tenancy). The backend ensures a user can only access/modify their own data.
    *   **Admin Role (for `GlobalConfig`):** For `PUT /api/v1/config/maintenance`, an `adminMiddleware` will be implemented. This middleware will check if `req.user.isAdmin` (a new boolean field on the `User` schema, initially `false` for all users, manually set to `true` for the first registered user or specific test users).

**6. Token Expiration & Logout**
*   JWTs will have a relatively short expiration time (e.g., 1 hour for hackathon, configurable).
*   The frontend will handle token expiration by redirecting to the login page if an API call returns a 401 Unauthorized error (handled by Axios interceptors).
*   **Logout:** The frontend simply clears the JWT from `localStorage` and redirects to the login page. The backend remains stateless.

## 9. Environment Variables (.env)

A `.env` file should be created in both `frontend/` and `backend/` directories. For the backend, `dotenv` will load these variables. For the frontend, Vite automatically exposes `VITE_` prefixed variables.

**`backend/.env` (Example):**
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/academic-control-system?retryWrites=true&w=majority
JWT_SECRET=supersecretjwtkeythatshouldbemorecomplex
JWT_EXPIRE=1h
REDIS_URL=redis://localhost:6379 # Or a Railway/Upstash URL
CLIENT_URL=http://localhost:5173 # Frontend URL for CORS
OPENAI_API_KEY=sk-your_openai_api_key_here
```

**`frontend/.env` (Example):**
```
VITE_API_BASE_URL=http://localhost:5000/api/v1 # Backend API base URL
VITE_WS_URL=http://localhost:5000 # Backend Socket.io URL
# VITE_OPENAI_API_KEY=sk-your_openai_api_key_here # If direct client-side AI calls are made (less secure, prefer backend proxy)
```

**Descriptions:**
*   `NODE_ENV`: Node.js environment (`development`, `production`). Affects logging, error details.
*   `PORT`: Port for the backend server to listen on.
*   `MONGO_URI`: Connection string for MongoDB Atlas. **Crucial for database access.**
*   `JWT_SECRET`: Secret key used to sign and verify JWTs. **Must be a strong, random string.**
*   `JWT_EXPIRE`: Expiration time for JWTs (e.g., `1h`, `30d`).
*   `REDIS_URL`: Connection URL for the Redis server.
*   `CLIENT_URL`: The URL of the frontend application. Used for CORS configuration on the backend.
*   `OPENAI_API_KEY`: API key for accessing OpenAI services. **Keep this secure on the backend.**
*   `VITE_API_BASE_URL`: Base URL for frontend API requests.
*   `VITE_WS_URL`: Base URL for frontend WebSocket connection.

## 10. Hosting & Deployment Launchpad

The application will be deployed to Vercel for the frontend, Railway for the backend and Socket.io server, and MongoDB Atlas for the database. Redis will be provisioned via Railway's add-on or a service like Upstash.

**1. MongoDB Atlas (Database)**
*   **Setup:**
    1.  Create a free-tier MongoDB Atlas account.
    2.  Set up a new cluster.
    3.  Configure Network Access: Allow access from anywhere (0.0.0.0/0) for simplicity in hackathon, or specify IP addresses for Vercel/Railway regions.
    4.  Create a Database User with read and write access to your database.
    5.  Obtain the connection string (SRV URI) for your cluster.
*   **Environment Variable:** This connection string will be set as `MONGO_URI` in Railway.

**2. Railway (Backend & Socket.io Server)**
*   **Setup:**
    1.  Create a Railway account and connect it to your GitHub repository.
    2.  Create a new project and select "Deploy from GitHub Repo."
    3.  Choose the `backend/` directory in your repository.
    4.  Railway will auto-detect Node.js.
    5.  **Build Command:** `npm install` (default)
    6.  **Start Command:** `node src/server.js` (Ensure `server.js` is your main entry point that starts Express and Socket.io).
    7.  **Environment Variables:** Add all variables from `backend/.env` to Railway's "Variables" section for the backend service. Crucially, `MONGO_URI`, `JWT_SECRET`, `REDIS_URL`, `OPENAI_API_KEY`, and `CLIENT_URL`.
        *   `CLIENT_URL` must be set to your deployed Vercel frontend URL (e.g., `https://academic-control-system.vercel.app`).
        *   Railway automatically provides a public domain for your service. This will be your `VITE_API_BASE_URL` and `VITE_WS_URL` for the frontend.
    8.  **Networking:** Railway typically exposes your app on port 80/443. Ensure your Node.js app listens on `process.env.PORT || 5000`.
    9.  **Redis Add-on:** Add a Redis service as an add-on in your Railway project. Railway will automatically inject its `REDIS_URL` into your backend service's environment variables.

**3. Vercel (Frontend)**
*   **Setup:**
    1.  Create a Vercel account and connect it to your GitHub repository.
    2.  Import your project and select the `frontend/` directory.
    3.  Vercel will auto-detect Vite/React.
    4.  **Build Command:** `npm run build` (default)
    5.  **Output Directory:** `dist` (default)
    6.  **Environment Variables:** Add all `VITE_` prefixed variables from `frontend/.env` to Vercel's "Environment Variables" section.
        *   `VITE_API_BASE_URL`: Set this to the public domain provided by Railway for your backend (e.g., `https://academic-control-system-backend.railway.app/api/v1`).
        *   `VITE_WS_URL`: Set this to the public domain provided by Railway for your backend (e.g., `https://academic-control-system-backend.railway.app`).
    7.  **Domain:** Vercel automatically assigns a `.vercel.app` domain. This will be your `CLIENT_URL` for the backend.

**4. CORS Configuration (Backend)**
*   In `backend/src/app.js`, ensure `cors` middleware is configured correctly:
    ```javascript
    const cors = require('cors');
    // ...
    app.use(cors({
        origin: process.env.CLIENT_URL, // Allow requests only from your Vercel frontend
        credentials: true // If you use cookies/sessions
    }));
    ```
*   This prevents cross-origin request errors between your Vercel frontend and Railway backend.

## 11. Dev Setup & Run Commands

Follow these steps to set up and run the Academic Control System locally on your machine.

**1. Clone the Repository:**
```bash
git clone https://github.com/<your-username>/academic-control-system.git
cd academic-control-system
```

**2. Backend Setup:**
```bash
cd backend
npm install
cp .env.example .env
```
*   **Edit `backend/.env`**: Fill in your `MONGO_URI` (e.g., a local MongoDB instance or a free Atlas cluster), `JWT_SECRET`, `REDIS_URL` (e.g., `redis://localhost:6379`), `CLIENT_URL` (e.g., `http://localhost:5173`), and `OPENAI_API_KEY`.

**3. Frontend Setup:**
```bash
cd ../frontend
npm install
cp .env.example .env
```
*   **Edit `frontend/.env`**: Fill in `VITE_API_BASE_URL` (e.g., `http://localhost:5000/api/v1`) and `VITE_WS_URL` (e.g., `http://localhost:5000`).

**4. Start Redis (Optional, if using local Redis):**
*   If you have Docker installed:
    ```bash
    docker run --name my-redis -p 6379:6379 -d redis
    ```
*   If you have Redis installed directly, start the Redis server.

**5. Start MongoDB (Optional, if using local MongoDB):**
*   If you have Docker installed:
    ```bash
    docker run --name my-mongo -p 27017:27017 -d mongo
    ```
*   If you have MongoDB installed directly, start the MongoDB server. Ensure your `MONGO_URI` in `backend/.env` points to your local instance (e.g., `mongodb://localhost:27017/academic-control-system-local`).

**6. Run the Backend Server:**
```bash
cd ../backend
npm run dev # Or `npm start` for production build
```
The backend server will typically run on `http://localhost:5000`.

**7. Run the Frontend Development Server:**
```bash
cd ../frontend
npm run dev
```
The frontend development server will typically run on `http://localhost:5173`.

**8. Access the Application:**
Open your web browser and navigate to `http://localhost:5173`.

## 12. Agent Task Checklist (The Master Plan)

This checklist provides a granular, step-by-step plan for building the Academic Control System. Each item is a distinct, testable task.

**Phase 1: Project Setup & Core Backend Infrastructure**

1.  **Repository Initialization:**
    *   Create a new GitHub repository named `academic-control-system`.
    *   Initialize `backend/` and `frontend/` directories.
    *   Add `README.md` and `.env.example` files at the root.
    *   Set up `.gitignore` for both `backend/` and `frontend/`.
2.  **Backend Core Setup (`backend/`)**
    *   Initialize `package.json` in `backend/`.
    *   Install core dependencies: `express`, `mongoose`, `dotenv`, `cors`, `helmet`, `express-rate-limit`.
    *   Create `src/server.js` to start the Express app.
    *   Create `src/app.js` for Express app configuration (middleware, routes).
    *   Create `src/config/db.js` for MongoDB connection using Mongoose.
    *   Implement basic error handling middleware (`src/middleware/errorHandler.js`).
    *   Configure `cors` in `src/app.js` using `process.env.CLIENT_URL`.
    *   Add `scripts` to `package.json` for `start` and `dev` (using `nodemon`).
3.  **Authentication Backend:**
    *   Install `jsonwebtoken`, `bcryptjs`.
    *   Create `src/models/User.js` with schema for `name`, `email`, `password`, `isAdmin` (default `false`). Implement pre-save password hashing and password comparison method.
    *   Create `src/utils/jwt.js` for generating JWTs.
    *   Create `src/middleware/authMiddleware.js` to verify JWTs and attach `req.user`.
    *   Create `src/controllers/authController.js` for `register` and `login` logic.
    *   Create `src/routes/authRoutes.js` for `/api/v1/auth/register` (POST) and `/api/v1/auth/login` (POST).
    *   Integrate `authRoutes` into `src/app.js`.
    *   Implement `GET /api/v1/auth/me` to get logged-in user details, protected by `authMiddleware`.
4.  **Global Configuration & Maintenance Mode:**
    *   Create `src/models/GlobalConfig.js` with schema for `maintenanceMode` (boolean) and `updatedBy` (ref to User).
    *   Create `src/middleware/maintenanceMiddleware.js` to check `GlobalConfig.maintenanceMode` and block specific operations.
    *   Create `src/middleware/adminMiddleware.js` to check `req.user.isAdmin`.
    *   Create `src/controllers/configController.js` for getting and updating `GlobalConfig`.
    *   Create `src/routes/configRoutes.js` for `GET /api/v1/config/maintenance` (protected) and `PUT /api/v1/config/maintenance` (protected by `authMiddleware`, `adminMiddleware`).

**Phase 2: Dynamic Academic Structure & Marks Management Backend**

5.  **Database Schemas (Core):**
    *   Create `src/models/Semester.js` schema.
    *   Create `src/models/Subject.js` schema (with embedded `components` array).
    *   Create `src/models/Marks.js` schema (with unique index on `userId, subjectId, componentName`).
    *   Implement cascade deletion pre-hooks for `Semester` (deletes Subjects) and `Subject` (deletes Marks, removes from Semester).
6.  **Semester CRUD Endpoints:**
    *   Create `src/controllers/semesterController.js` with logic for create, read (all, single), update, delete.
    *   Create `src/routes/semesterRoutes.js` for `POST`, `GET /:id`, `GET`, `PUT /:id`, `DELETE /:id`.
    *   Protect all with `authMiddleware`. Apply `maintenanceMiddleware` to `POST`, `PUT`, `DELETE`.
7.  **Subject CRUD Endpoints:**
    *   Create `src/controllers/subjectController.js` with logic for create, read (single, by semester), update (details, components), delete.
    *   Create `src/routes/subjectRoutes.js` for `POST`, `GET /:id`, `GET /semester/:semesterId`, `PUT /:id`, `PUT /:id/components`, `DELETE /:id`.
    *   Protect all with `authMiddleware`. Apply `maintenanceMiddleware` to `POST`, `PUT`, `DELETE`, `PUT /:id/components`.
8.  **Marks CRUD Endpoints:**
    *   Create `src/controllers/marksController.js` with logic for create/upsert (single), bulk create/upsert, read (by subject), delete.
    *   Create `src/routes/marksRoutes.js` for `POST`, `POST /bulk`, `GET /subject/:subjectId`, `DELETE /:id`.
    *   Protect all with `authMiddleware`.

**Phase 3: Real-time & Core Calculation Backend**

9.  **Socket.io Backend Integration:**
    *   Install `socket.io`, `ioredis`.
    *   Integrate Socket.io with the existing Express HTTP server in `src/server.js`.
    *   Create `src/config/redis.js` for Redis client setup.
    *   Create `src/socketHandler.js` to manage Socket.io connections, user rooms, and emit helper functions (`emitToUser`, `emitToAllUsers`).
    *   Implement `connection` and `disconnect` events.
    *   Implement listener for `joinUserRoom` event.
10. **Core Calculation Logic:**
    *   Create `src/utils/calculations.js` to encapsulate all calculation logic:
        *   `calculateSubjectPercentage(subject, marks)`
        *   `calculateOverallPercentage(semesters, subjects, marks)`
        *   `getGradePoint(percentage)` based on defined mapping.
        *   `calculateSGPA(semesterId, subjects, marks)` (current, projected, max).
    *   **SGPA Calculation Endpoint:**
        *   Create `src/controllers/predictionController.js` (will also house predictions).
        *   Add logic to calculate current, projected, max SGPA.
        *   Create `GET /api/v1/calculations/sgpa` route in `src/routes/predictionRoutes.js`.
        *   Protect with `authMiddleware`.

**Phase 4: Prediction & Analytics Backend**

11. **Prediction Engine Endpoints:**
    *   Extend `src/utils/calculations.js` with prediction logic:
        *   `predictOptimistic(subject, marks)`
        *   `predictPerformanceBased(subject, marks)`
        *   `predictWeightedRecency(subject, marks)`
    *   Extend `src/controllers/predictionController.js` to use these functions.
    *   Add routes: `GET /api/v1/predictions/subject/:subjectId` and `GET /api/v1/predictions/overall` in `src/routes/predictionRoutes.js`.
    *   Protect with `authMiddleware`.
12. **Target Planner Endpoint:**
    *   Extend `src/utils/calculations.js` with `solveForRequiredMarks(subject, marks, desiredPercentage/Sgpa)`.
    *   Extend `src/controllers/predictionController.js`.
    *   Add `POST /api/v1/target-planner` route in `src/routes/predictionRoutes.js`.
    *   Protect with `authMiddleware`.
13. **What-If Simulation Endpoint:**
    *   Extend `src/utils/calculations.js` with `simulateMarks(semesterId, currentMarks, hypotheticalMarks)`.
    *   Extend `src/controllers/predictionController.js`.
    *   Add `POST /api/v1/what-if` route in `src/routes/predictionRoutes.js`.
    *   Protect with `authMiddleware`.
14. **Advanced Analytics Endpoints:**
    *   Create `src/controllers/analyticsController.js`.
    *   Create `src/routes/analyticsRoutes.js`.
    *   Implement `GET /api/v1/analytics/performance`.
    *   Implement `GET /api/v1/analytics/weak-areas`.
    *   Implement `GET /api/v1/analytics/contribution`.
    *   Implement `GET /api/v1/analytics/difficulty`.
    *   Implement `GET /api/v1/analytics/marginal-gain`.
    *   Protect all with `authMiddleware`.

**Phase 5: Frontend Core & UI Base**

15. **Frontend Core Setup (`frontend/`)**
    *   Initialize `package.json` in `frontend/`.
    *   Install core dependencies: `react`, `react-dom`, `vite`, `zustand`, `react-router-dom`, `axios`, `tailwindcss`, `postcss`, `autoprefixer`.
    *   Configure `tailwind.config.js` and `index.css` for base styles.
    *   Create `src/main.jsx` and `src/App.jsx` with `BrowserRouter`.
    *   Create `src/services/api.js` for Axios instance with interceptors for JWT.
    *   Set up `frontend/.env` with `VITE_API_BASE_URL` and `VITE_WS_URL`.
16. **UI Layout & Shared Components:**
    *   Implement `src/components/Shared/Button.jsx`, `Input.jsx`, `Card.jsx`, `Modal.jsx`, `Table.jsx`.
    *   Implement `src/components/Layout/Sidebar.jsx` with navigation links.
    *   Implement `src/components/Layout/MainLayout.jsx` to wrap content with `Sidebar`.
    *   Apply neo-minimalist, boxy styling using Tailwind CSS across these components.
17. **Zustand State Stores:**
    *   Create `src/store/authStore.js`, `semesterStore.js`, `marksStore.js`, `configStore.js`, `uiStore.js`.
    *   Implement basic state and actions for each.
18. **Auth UI:**
    *   Implement `src/pages/LoginPage.jsx` and `src/pages/SignupPage.jsx`.
    *   Use `LoginForm.jsx` and `SignupForm.jsx`.
    *   Integrate with `authStore` for login/register actions and token management.
    *   Redirect to `/dashboard` on success.

**Phase 6: Frontend Pages Implementation & Real-time Integration**

19. **Dashboard Page (`/dashboard`):**
    *   Implement `src/pages/DashboardPage.jsx`.
    *   Fetch data from `GET /api/v1/calculations/sgpa` and `GET /api/v1/predictions/overall`.
    *   Display key metrics using `MetricCard.jsx` components.
20. **Subjects Page (`/subjects`):**
    *   Implement `src/pages/SubjectsPage.jsx`.
    *   Fetch all semesters from `GET /api/v1/semesters`.
    *   Render `Card.jsx` for each semester, allowing expansion.
    *   Inside expanded semester, fetch and render `SubjectCard.jsx` for each subject.
    *   `SubjectCard.jsx`: Display subject details, fetch marks for components from `GET /api/v1/marks/subject/:subjectId`.
    *   Implement inline editing for marks using `ComponentInputRow.jsx` and `POST /api/v1/marks/bulk`.
    *   Implement forms/modals for adding/editing/deleting semesters and subjects (`SubjectForm.jsx`), interacting with relevant APIs (`POST/PUT/DELETE /api/v1/semesters`, `POST/PUT/DELETE /api/v1/subjects`, `PUT /api/v1/subjects/:id/components`).
    *   Disable structural editing if `configStore.maintenanceMode` is true.
21. **Predictions Page (`/predictions`):**
    *   Implement `src/pages/PredictionsPage.jsx`.
    *   Fetch data from `GET /api/v1/predictions/overall` and `GET /api/v1/predictions/subject/:subjectId` for selected subjects.
    *   Render multiple `PredictionDisplay.jsx` components for each prediction mode.
22. **Target Planner Page (`/target-planner`):**
    *   Implement `src/pages/TargetPlannerPage.jsx`.
    *   Design input form for desired percentage/SGPA and subject/semester selection.
    *   Call `POST /api/v1/target-planner` and display results using `Table.jsx` and `MetricCard.jsx`.
23. **Calendar Page (`/calendar`):**
    *   Install `react-fullcalendar`, `fullcalendar` plugins.
    *   Create `src/models/Event.js` schema.
    *   Implement `src/pages/CalendarPage.jsx` using `FullCalendar`.
    *   Fetch events from `GET /api/v1/events`.
    *   Implement `EventModal.jsx` for adding/editing events, interacting with `POST/PUT/DELETE /api/v1/events`.
24. **Analytics Page (`/analytics`):**
    *   Install `react-chartjs-2`, `chart.js`.
    *   Implement `src/pages/AnalyticsPage.jsx`.
    *   Fetch data from various `/api/v1/analytics/*` endpoints.
    *   Display data using `ChartContainer.jsx` (bar, line charts) and `MetricCard.jsx`.
25. **Settings Page (`/settings`):**
    *   Implement `src/pages/SettingsPage.jsx`.
    *   Display `configStore.maintenanceMode` status.
    *   Add a toggle switch component. If user is admin, allow `PUT /api/v1/config/maintenance`.
26. **Real-time Frontend Integration:**
    *   Create `src/hooks/useSocket.js` to manage Socket.io connection and event listeners.
    *   In `App.jsx` or `MainLayout.jsx`, use `useSocket` to connect upon authentication.
    *   Implement listeners for `marksUpdated`, `predictionUpdated`, `configUpdated`, `structureUpdated` in relevant stores (`marksStore`, `configStore`, `semesterStore`).
    *   Update UI state in response to these real-time events.
27. **AI Co-Pilot (Stretch Goal):**
    *   Install `openai` (if client-side, but prefer backend proxy).
    *   Create `src/services/openaiService.js` (if client-side) or `src/components/CoPilot/CoPilotChatWindow.jsx`.
    *   Integrate `CoPilotChatWindow.jsx` into a page or as a persistent component.
    *   Send user prompts to `POST /api/v1/ai/query` and display responses.

**Phase 7: Final Polish & Deployment Preparation**

28. **Comprehensive Validation:**
    *   Implement robust input validation on both frontend (formik/yup or native) and backend (`express-validator`).
29. **Error Handling & UI Feedback:**
    *   Ensure all API calls handle errors gracefully and provide user-friendly feedback (toasts, error messages).
    *   Implement loading states for data fetching.
30. **Deployment Configuration:**
    *   Verify `frontend/.env` and `backend/.env` are correctly set up for production.
    *   Test deployment process on Vercel and Railway.
    *   Ensure CORS is correctly configured.
    *   Verify Socket.io connection works in deployed environment.



# Academic Control System — CodeME.md

## 1. Context & Business Goal

The "Academic Control System" is a full-stack MERN application designed to be a dynamic, extensible academic analytics and prediction engine. It moves beyond static marks tracking to offer students a powerful decision-support system for managing their academic progress.

**Problem Statement:** Current academic tracking tools are often rigid, lacking the flexibility to adapt to diverse academic structures (e.g., varying evaluation components, weights, credit systems across subjects/semesters). Students struggle to understand their real-time performance, predict future outcomes, or plan for target grades effectively. This leads to reactive studying rather than proactive strategic planning.

**Business Goal:** To empower students with a comprehensive, real-time, and predictive tool that dynamically models their academic journey, providing actionable insights into performance, future projections, and target achievement strategies. The system aims to reduce academic anxiety by offering clarity and control over their grades.

**Key Product Value Propositions:**
*   **Dynamic Structure Management:** Users can define and modify semesters, subjects, and evaluation components (MSE, SEE, tasks, labs) at runtime, preventing hardcoded limitations.
*   **Real-time Performance Metrics:** Instantaneous calculation of percentages, SGPA (Current, Projected, Maximum), and overall academic standing.
*   **Multi-Modal Prediction Engine:** Offers Optimistic, Performance-Based, and Weighted Recency projections to model various future scenarios.
*   **Target Planner:** Helps users strategize by calculating required marks to achieve desired percentages or SGPA, including feasibility checks.
*   **Advanced Analytics:** Provides insights into weak areas, subject contribution to SGPA, difficulty indicators, and marginal gain analysis.
*   **What-If Simulation:** Allows hypothetical mark entry to instantly see its impact on final grades.
*   **AI Co-Pilot (Stretch Goal):** Natural Language Processing (NLP) interface for advanced queries and guidance, making complex data accessible.
*   **Maintenance Mode:** A global toggle to lock structure editing, ensuring data integrity during critical periods or updates.

**MVP Scope for a 24-48h Hackathon:**
The primary focus for the hackathon is to deliver the core dynamic structure management, marks entry, real-time calculation of percentages and SGPA (current, projected, max), all three prediction modes, the target planner, and a functional calendar. The UI must strictly adhere to the neo-minimalist, boxy, utility-focused design. The AI Co-Pilot will be a basic integration (e.g., a simple text input that sends a prompt and displays a raw LLM response) or a stretch goal if time permits. Authentication, Authorization, and the global Maintenance Mode are essential. Advanced analytics can be simplified to key metrics.

## 2. Exact Tech Stack (High Fidelity)

This project leverages a modern MERN stack with real-time capabilities and AI integration.

**Frontend:**
*   **Framework:** React v18+ (functional components, hooks)
*   **Build Tool:** Vite v4+
*   **State Management:** Zustand v4+
*   **Routing:** React Router DOM v6+
*   **HTTP Client:** Axios v1+
*   **Styling:** Tailwind CSS v3+ (with PostCSS, Autoprefixer)
*   **Charts:** React-Chartjs-2 v5+ with Chart.js v4+
*   **Calendar:** React-FullCalendar v5+ with FullCalendar v6+ plugins (daygrid, interaction)
*   **Icons:** React Icons v2+
*   **UI Components:** Headless UI (optional, for unstyled components like dialogs, menus) or custom components built with Tailwind.

**Backend:**
*   **Runtime:** Node.js v18+
*   **Framework:** Express.js v4+
*   **Database ODM:** Mongoose v7+
*   **Authentication:** jsonwebtoken v9+ (for JWTs), bcryptjs v2+ (for password hashing)
*   **Environment Variables:** dotenv v16+
*   **CORS:** cors v2+
*   **Security:** helmet v7+
*   **Rate Limiting:** express-rate-limit v6+
*   **Real-time:** Socket.io v4+
*   **Redis Client:** ioredis v5+
*   **Input Validation:** express-validator v7+
*   **AI Integration:** openai v4+ (OpenAI Node.js library)
*   **Utilities:** lodash (optional, for utility functions)

**Database:**
*   MongoDB Atlas (NoSQL Cloud Database)

**Cache:**
*   Redis (Key-Value Store, hosted on Railway or Upstash)

**Deployment:**
*   **Frontend:** Vercel
*   **Backend & Socket.io:** Railway
*   **Database:** MongoDB Atlas Free Tier

## 3. Project Folder Structure

```
academic-control-system/
├── .git/                                   # Git version control
├── .github/                                # GitHub Actions or other CI/CD (optional for hackathon)
├── .env.example                            # Example environment variables for root (if any shared)
├── README.md                               # Project documentation
├── frontend/                               # React + Vite application
│   ├── public/                             # Static assets (favicons, images)
│   │   └── vite.svg
│   ├── src/                                # Frontend source code
│   │   ├── assets/                         # Images, fonts, other static files used by components
│   │   ├── components/                     # Reusable UI components
│   │   │   ├── Auth/                       # Authentication related components
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   └── SignupForm.jsx
│   │   │   ├── Layout/                     # Layout components (Sidebar, Navbar, MainLayout)
│   │   │   │   ├── MainLayout.jsx          # Overall page layout wrapper
│   │   │   │   ├── Sidebar.jsx             # Left-hand navigation sidebar
│   │   │   │   └── TopBar.jsx              # Optional top bar for user info/actions
│   │   │   ├── Shared/                     # Generic, highly reusable UI elements
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx                # Boxy container for sections
│   │   │   │   ├── Input.jsx               # Styled input field
│   │   │   │   ├── Modal.jsx               # Generic modal component
│   │   │   │   ├── Table.jsx               # Generic table component for data display
│   │   │   │   └── LoadingSpinner.jsx
│   │   │   ├── Subjects/                   # Components specific to subject/marks management
│   │   │   │   ├── SubjectCard.jsx         # Displays subject details and component marks
│   │   │   │   ├── ComponentInputRow.jsx   # Row for entering/editing marks for a single component
│   │   │   │   └── SubjectForm.jsx         # Form for adding/editing subjects
│   │   │   ├── Predictions/                # Components for displaying prediction results
│   │   │   │   └── PredictionDisplay.jsx   # Card for a single prediction mode
│   │   │   ├── Analytics/                  # Components for charts and analytics metrics
│   │   │   │   ├── ChartContainer.jsx      # Wrapper for Chart.js instances
│   │   │   │   └── MetricCard.jsx          # Displays a single key metric (e.g., SGPA)
│   │   │   ├── Calendar/                   # Calendar-specific components
│   │   │   │   └── EventModal.jsx          # Modal for adding/editing calendar events
│   │   │   └── CoPilot/                    # AI Co-Pilot chat interface
│   │   │       └── CoPilotChatWindow.jsx   # Chat UI component
│   │   ├── hooks/                          # Custom React hooks for reusable logic
│   │   │   ├── useAuth.js                  # Hook for auth state and actions
│   │   │   └── useSocket.js                # Hook for Socket.io connection management
│   │   ├── pages/                          # Top-level page components, wrapped by Layout
│   │   │   ├── DashboardPage.jsx           # Overall summary and key metrics
│   │   │   ├── SubjectsPage.jsx            # Semester and subject management, marks entry
│   │   │   ├── PredictionsPage.jsx         # Displays all prediction models
│   │   │   ├── TargetPlannerPage.jsx       # Interface for target setting and calculation
│   │   │   ├── CalendarPage.jsx            # Academic events calendar
│   │   │   ├── AnalyticsPage.jsx           # Advanced analytics and visualizations
│   │   │   ├── SettingsPage.jsx            # Application settings (e.g., maintenance mode)
│   │   │   ├── LoginPage.jsx               # User login interface
│   │   │   └── SignupPage.jsx              # User registration interface
│   │   ├── store/                          # Zustand stores for global state management
│   │   │   ├── authStore.js                # Authentication state (user, token)
│   │   │   ├── semesterStore.js            # Semesters, subjects, current selection
│   │   │   ├── marksStore.js               # Marks data, real-time updates
│   │   │   ├── configStore.js              # Global configuration (e.g., maintenance mode)
│   │   │   └── uiStore.js                  # UI specific states (loading, modals)
│   │   ├── services/                       # API client functions (Axios instances, wrappers)
│   │   │   └── api.js                      # Centralized API client with interceptors
│   │   ├── utils/                          # Frontend utility functions
│   │   │   ├── constants.js                # Global constants, grade mapping
│   │   │   └── calculations.js             # Frontend-side calculation helpers (e.g., SGPA display)
│   │   ├── App.jsx                         # Main application component, handles routing
│   │   ├── main.jsx                        # Entry point for the React app
│   │   └── index.css                       # Tailwind CSS directives and base styles
│   ├── .env.example                        # Example environment variables for frontend
│   ├── package.json                        # Frontend dependencies and scripts
│   └── tailwind.config.js                  # Tailwind CSS configuration
├── backend/                                # Node.js + Express.js application
│   ├── src/                                # Backend source code
│   │   ├── config/                         # Configuration files
│   │   │   ├── db.js                       # MongoDB connection setup
│   │   │   ├── redis.js                    # Redis client setup
│   │   │   └── env.js                      # Environment variable loading and validation
│   │   ├── middleware/                     # Express middleware functions
│   │   │   ├── authMiddleware.js           # JWT verification and user authentication
│   │   │   ├── errorHandler.js             # Centralized error handling
│   │   │   └── maintenanceMiddleware.js    # Checks and enforces maintenance mode
│   │   ├── models/                         # Mongoose schemas
│   │   │   ├── User.js                     # User schema
│   │   │   ├── Semester.js                 # Semester schema
│   │   │   ├── Subject.js                  # Subject schema
│   │   │   ├── Marks.js                    # Marks schema
│   │   │   ├── Event.js                    # Calendar Event schema
│   │   │   └── GlobalConfig.js             # Global configuration schema (e.g., maintenance mode)
│   │   ├── routes/                         # API route definitions
│   │   │   ├── authRoutes.js               # User authentication routes
│   │   │   ├── semesterRoutes.js           # CRUD for semesters
│   │   │   ├── subjectRoutes.js            # CRUD for subjects and components
│   │   │   ├── marksRoutes.js              # CRUD for marks, bulk updates
│   │   │   ├── eventRoutes.js              # CRUD for calendar events
│   │   │   ├── configRoutes.js             # Global configuration routes
│   │   │   ├── predictionRoutes.js         # Endpoints for prediction calculations
│   │   │   ├── analyticsRoutes.js          # Endpoints for advanced analytics
│   │   │   └── aiRoutes.js                 # AI Co-Pilot integration routes
│   │   ├── controllers/                    # Logic for handling API requests
│   │   │   ├── authController.js
│   │   │   ├── semesterController.js
│   │   │   ├── subjectController.js
│   │   │   ├── marksController.js
│   │   │   ├── eventController.js
│   │   │   ├── configController.js
│   │   │   ├── predictionController.js
│   │   │   ├── analyticsController.js
│   │   │   └── aiController.js
│   │   ├── services/                       # External service integrations (e.g., OpenAI API calls)
│   │   │   └── openaiService.js            # Wrapper for OpenAI API
│   │   ├── utils/                          # Backend utility functions
│   │   │   ├── jwt.js                      # JWT token generation/verification
│   │   │   ├── calculations.js             # Core academic calculation logic (SGPA, percentages, predictions)
│   │   │   └── validation.js               # Joi/Express-validator schemas
│   │   ├── socketHandler.js                # Socket.io event handling logic
│   │   ├── app.js                          # Express application setup (middleware, routes)
│   │   └── server.js                       # Main server entry point (HTTP, Socket.io, DB connect)
│   ├── .env.example                        # Example environment variables for backend
│   └── package.json                        # Backend dependencies and scripts
└── package.json                            # Root package.json for workspace (if using yarn/npm workspaces)
```

## 4. Database Schemas (Implementation Ready)

All schemas include `userId` for multi-tenancy and `timestamps` for `createdAt` and `updatedAt`.

```javascript
// backend/src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false // Do not return password in queries by default
    }
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

```javascript
// backend/src/models/Semester.js
const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Semester name is required'],
        trim: true,
        minlength: 1
    },
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }]
}, {
    timestamps: true
});

// Cascade delete subjects when a semester is deleted
semesterSchema.pre('remove', async function(next) {
    await this.model('Subject').deleteMany({ semesterId: this._id });
    next();
});

module.exports = mongoose.model('Semester', semesterSchema);
```

```javascript
// backend/src/models/Subject.js
const mongoose = require('mongoose');

const subjectComponentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Component name is required'],
        trim: true
    },
    maxMarks: {
        type: Number,
        required: [true, 'Maximum marks for component is required'],
        min: 0
    },
    weight: {
        type: Number,
        required: [true, 'Weight for component is required'],
        min: 0,
        max: 1 // Represented as a percentage, e.g., 0.25 for 25%
    },
    type: {
        type: String,
        enum: ['exam', 'task', 'lab', 'project', 'quiz', 'assignment', 'other'],
        default: 'exam'
    }
}, { _id: false }); // Do not create _id for subdocuments

const subjectSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    semesterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Semester',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Subject name is required'],
        trim: true,
        minlength: 1
    },
    credits: {
        type: Number,
        required: [true, 'Subject credits are required'],
        min: 0
    },
    components: [subjectComponentSchema]
}, {
    timestamps: true
});

// Cascade delete marks when a subject is deleted
subjectSchema.pre('remove', async function(next) {
    await this.model('Marks').deleteMany({ subjectId: this._id });
    // Also remove this subject's reference from its parent semester
    await this.model('Semester').updateOne(
        { _id: this.semesterId },
        { $pull: { subjects: this._id } }
    );
    next();
});

module.exports = mongoose.model('Subject', subjectSchema);
```

```javascript
// backend/src/models/Marks.js
const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    componentName: { // Must match a name in Subject.components
        type: String,
        required: [true, 'Component name for marks is required'],
        trim: true
    },
    obtainedMarks: {
        type: Number,
        required: [true, 'Obtained marks are required'],
        min: 0
    }
}, {
    timestamps: true
});

// Ensure a user can only have one mark entry for a specific component within a subject
marksSchema.index({ userId: 1, subjectId: 1, componentName: 1 }, { unique: true });

module.exports = mongoose.model('Marks', marksSchema);
```

```javascript
// backend/src/models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Event title is required'],
        trim: true
    },
    date: {
        type: Date,
        required: [true, 'Event date is required']
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: false // Optional, an event might not be tied to a specific subject
    },
    type: {
        type: String,
        enum: ['exam', 'deadline', 'task', 'lecture', 'other'],
        default: 'other'
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
```

```javascript
// backend/src/models/GlobalConfig.js
const mongoose = require('mongoose');

const globalConfigSchema = new mongoose.Schema({
    // Only one global config document should exist, managed by an admin user.
    // This userId is for traceability of who last updated it.
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // Must be set by an admin user
    },
    maintenanceMode: {
        type: Boolean,
        default: false
    },
    // Add other global settings here if needed
}, {
    timestamps: true
});

module.exports = mongoose.model('GlobalConfig', globalConfigSchema);
```

## 5. API Endpoint Definitions (Comprehensive)

All endpoints are prefixed with `/api/v1`. All protected routes require a valid JWT via `authMiddleware`. `Admin only` routes require an additional `adminMiddleware`.

---

**1. Authentication Routes (`/api/v1/auth`)**

*   **POST /api/v1/auth/register**
    *   **Description:** Register a new user.
    *   **Payload:**
        ```json
        {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "password": "password123"
        }
        ```
    *   **Success Response (201 Created):**
        ```json
        {
            "success": true,
            "token": "eyJhbGciOiJIUzI1Ni...",
            "user": {
                "_id": "65b7c...",
                "name": "John Doe",
                "email": "john.doe@example.com"
            }
        }
        ```
    *   **Error Response (400 Bad Request / 500 Server Error):**
        ```json
        {
            "success": false,
            "message": "User with this email already exists."
        }
        ```
    *   **Middleware:** None (public route).

*   **POST /api/v1/auth/login**
    *   **Description:** Authenticate user and get JWT.
    *   **Payload:**
        ```json
        {
            "email": "john.doe@example.com",
            "password": "password123"
        }
        ```
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "token": "eyJhbGciOiJIUzI1Ni...",
            "user": {
                "_id": "65b7c...",
                "name": "John Doe",
                "email": "john.doe@example.com"
            }
        }
        ```
    *   **Error Response (401 Unauthorized / 400 Bad Request):**
        ```json
        {
            "success": false,
            "message": "Invalid credentials"
        }
        ```
    *   **Middleware:** None (public route).

*   **GET /api/v1/auth/me**
    *   **Description:** Get current logged-in user's profile.
    *   **Payload:** None (token in header).
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "user": {
                "_id": "65b7c...",
                "name": "John Doe",
                "email": "john.doe@example.com"
            }
        }
        ```
    *   **Error Response (401 Unauthorized):**
        ```json
        {
            "success": false,
            "message": "Not authorized, token failed"
        }
        ```
    *   **Middleware:** `authMiddleware`.

---

**2. Semester Routes (`/api/v1/semesters`)**

*   **POST /api/v1/semesters**
    *   **Description:** Create a new semester.
    *   **Payload:**
        ```json
        {
            "name": "Semester 1"
        }
        ```
    *   **Success Response (201 Created):**
        ```json
        {
            "success": true,
            "data": {
                "_id": "65b7d...",
                "name": "Semester 1",
                "userId": "65b7c...",
                "subjects": [],
                "createdAt": "...",
                "updatedAt": "..."
            }
        }
        ```
    *   **Middleware:** `authMiddleware`, `maintenanceMiddleware` (allows creation if maintenance mode is ON).

*   **GET /api/v1/semesters**
    *   **Description:** Get all semesters for the logged-in user.
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "count": 1,
            "data": [
                {
                    "_id": "65b7d...",
                    "name": "Semester 1",
                    "userId": "65b7c...",
                    "subjects": ["65b7e..."], // Populated references to Subject IDs
                    "createdAt": "...",
                    "updatedAt": "..."
                }
            ]
        }
        ```
    *   **Middleware:** `authMiddleware`.

*   **GET /api/v1/semesters/:id**
    *   **Description:** Get a single semester by ID, populated with subjects.
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "_id": "65b7d...",
                "name": "Semester 1",
                "userId": "65b7c...",
                "subjects": [
                    {
                        "_id": "65b7e...",
                        "name": "DAA",
                        "credits": 4,
                        "components": [ { "name": "MSE 1", "maxMarks": 50, "weight": 0.25, "type": "exam" } ]
                    }
                ],
                "createdAt": "...",
                "updatedAt": "..."
            }
        }
        ```
    *   **Middleware:** `authMiddleware`.

*   **PUT /api/v1/semesters/:id**
    *   **Description:** Update a semester's name.
    *   **Payload:**
        ```json
        {
            "name": "Semester 4 (Current)"
        }
        ```
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "_id": "65b7d...",
                "name": "Semester 4 (Current)",
                "userId": "65b7c...",
                "subjects": [],
                "createdAt": "...",
                "updatedAt": "..."
            }
        }
        ```
    *   **Middleware:** `authMiddleware`, `maintenanceMiddleware`.

*   **DELETE /api/v1/semesters/:id**
    *   **Description:** Delete a semester and all associated subjects and marks.
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "message": "Semester deleted successfully"
        }
        ```
    *   **Middleware:** `authMiddleware`, `maintenanceMiddleware`.

---

**3. Subject Routes (`/api/v1/subjects`)**

*   **POST /api/v1/subjects**
    *   **Description:** Create a new subject within a semester.
    *   **Payload:**
        ```json
        {
            "semesterId": "65b7d...",
            "name": "DAA",
            "credits": 4,
            "components": [
                { "name": "MSE 1", "maxMarks": 50, "weight": 0.25, "type": "exam" },
                { "name": "SEE", "maxMarks": 100, "weight": 0.5, "type": "exam" },
                { "name": "Task 1", "maxMarks": 20, "weight": 0.15, "type": "task" },
                { "name": "Lab", "maxMarks": 30, "weight": 0.1, "type": "lab" }
            ]
        }
        ```
    *   **Success Response (201 Created):**
        ```json
        {
            "success": true,
            "data": {
                "_id": "65b7e...",
                "name": "DAA",
                "credits": 4,
                "components": [...],
                "semesterId": "65b7d...",
                "userId": "65b7c...",
                "createdAt": "...",
                "updatedAt": "..."
            }
        }
        ```
    *   **Middleware:** `authMiddleware`, `maintenanceMiddleware`.

*   **GET /api/v1/subjects/:id**
    *   **Description:** Get a single subject by ID.
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "_id": "65b7e...",
                "name": "DAA",
                "credits": 4,
                "components": [...],
                "semesterId": "65b7d...",
                "userId": "65b7c...",
                "createdAt": "...",
                "updatedAt": "..."
            }
        }
        ```
    *   **Middleware:** `authMiddleware`.

*   **GET /api/v1/subjects/semester/:semesterId**
    *   **Description:** Get all subjects for a specific semester.
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "count": 2,
            "data": [
                { "_id": "65b7e...", "name": "DAA", "credits": 4, "components": [...], "semesterId": "65b7d..." },
                { "_id": "65b7f...", "name": "OS", "credits": 3, "components": [...], "semesterId": "65b7d..." }
            ]
        }
        ```
    *   **Middleware:** `authMiddleware`.

*   **PUT /api/v1/subjects/:id**
    *   **Description:** Update a subject's details (name, credits).
    *   **Payload:**
        ```json
        {
            "name": "Design & Analysis of Algorithms",
            "credits": 5
        }
        ```
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "_id": "65b7e...",
                "name": "Design & Analysis of Algorithms",
                "credits": 5,
                "components": [...],
                "semesterId": "65b7d...",
                "userId": "65b7c...",
                "createdAt": "...",
                "updatedAt": "..."
            }
        }
        ```
    *   **Middleware:** `authMiddleware`, `maintenanceMiddleware`.

*   **PUT /api/v1/subjects/:id/components**
    *   **Description:** Update a subject's component structure (add, remove, modify components). This replaces the entire `components` array.
    *   **Payload:**
        ```json
        {
            "components": [
                { "name": "MSE 1", "maxMarks": 50, "weight": 0.3, "type": "exam" }, // Modified weight
                { "name": "SEE", "maxMarks": 100, "weight": 0.5, "type": "exam" },
                { "name": "Project", "maxMarks": 50, "weight": 0.2, "type": "project" } // New component
            ]
        }
        ```
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "_id": "65b7e...",
                "name": "DAA",
                "credits": 4,
                "components": [
                    { "name": "MSE 1", "maxMarks": 50, "weight": 0.3, "type": "exam" },
                    { "name": "SEE", "maxMarks": 100, "weight": 0.5, "type": "exam" },
                    { "name": "Project", "maxMarks": 50, "weight": 0.2, "type": "project" }
                ],
                "semesterId": "65b7d...",
                "userId": "65b7c...",
                "createdAt": "...",
                "updatedAt": "..."
            }
        }
        ```
    *   **Middleware:** `authMiddleware`, `maintenanceMiddleware`.

*   **DELETE /api/v1/subjects/:id**
    *   **Description:** Delete a subject and all its associated marks.
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "message": "Subject deleted successfully"
        }
        ```
    *   **Middleware:** `authMiddleware`, `maintenanceMiddleware`.

---

**4. Marks Routes (`/api/v1/marks`)**

*   **POST /api/v1/marks**
    *   **Description:** Create or update a single mark entry. This endpoint upserts based on `subjectId` and `componentName`.
    *   **Payload:**
        ```json
        {
            "subjectId": "65b7e...",
            "componentName": "MSE 1",
            "obtainedMarks": 45
        }
        ```
    *   **Success Response (201 Created / 200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "_id": "65b80...",
                "subjectId": "65b7e...",
                "componentName": "MSE 1",
                "obtainedMarks": 45,
                "userId": "65b7c...",
                "createdAt": "...",
                "updatedAt": "..."
            },
            "message": "Mark entry created/updated successfully"
        }
        ```
    *   **Middleware:** `authMiddleware`.
    *   **Logic:** After saving, trigger Socket.io event `marksUpdated` and `predictionUpdated`.

*   **POST /api/v1/marks/bulk**
    *   **Description:** Create or update multiple mark entries for a subject. This endpoint upserts based on `subjectId` and `componentName` for each item in the array.
    *   **Payload:**
        ```json
        {
            "subjectId": "65b7e...",
            "marks": [
                { "componentName": "MSE 1", "obtainedMarks": 45 },
                { "componentName": "Task 1", "obtainedMarks": 18 }
            ]
        }
        ```
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "message": "Bulk marks updated successfully",
            "data": [
                { "_id": "65b80...", "componentName": "MSE 1", "obtainedMarks": 45 },
                { "_id": "65b81...", "componentName": "Task 1", "obtainedMarks": 18 }
            ]
        }
        ```
    *   **Middleware:** `authMiddleware`.
    *   **Logic:** After saving, trigger Socket.io event `marksUpdated` and `predictionUpdated`.

*   **GET /api/v1/marks/subject/:subjectId**
    *   **Description:** Get all marks for a specific subject.
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "count": 2,
            "data": [
                { "_id": "65b80...", "subjectId": "65b7e...", "componentName": "MSE 1", "obtainedMarks": 45 },
                { "_id": "65b81...", "subjectId": "65b7e...", "componentName": "Task 1", "obtainedMarks": 18 }
            ]
        }
        ```
    *   **Middleware:** `authMiddleware`.

*   **DELETE /api/v1/marks/:id**
    *   **Description:** Delete a specific mark entry by its ID.
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "message": "Mark entry deleted successfully"
        }
        ```
    *   **Middleware:** `authMiddleware`.
    *   **Logic:** After deleting, trigger Socket.io event `marksUpdated` and `predictionUpdated`.

---

**5. Event Routes (`/api/v1/events`)**

*   **POST /api/v1/events**
    *   **Description:** Create a new calendar event.
    *   **Payload:**
        ```json
        {
            "title": "DAA Midterm Exam",
            "date": "2024-03-15T10:00:00.000Z",
            "subjectId": "65b7e...",
            "type": "exam",
            "description": "Chapter 1-3"
        }
        ```
    *   **Success Response (201 Created):**
        ```json
        {
            "success": true,
            "data": {
                "_id": "65b82...",
                "title": "DAA Midterm Exam",
                "date": "2024-03-15T10:00:00.000Z",
                "subjectId": "65b7e...",
                "type": "exam",
                "userId": "65b7c...",
                "createdAt": "...",
                "updatedAt": "..."
            }
        }
        ```
    *   **Middleware:** `authMiddleware`.

*   **GET /api/v1/events**
    *   **Description:** Get all events for the logged-in user. Optional query params for date range (`startDate`, `endDate`).
    *   **Query Params:** `?startDate=2024-03-01&endDate=2024-03-31`
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "count": 1,
            "data": [
                {
                    "_id": "65b82...",
                    "title": "DAA Midterm Exam",
                    "date": "2024-03-15T10:00:00.000Z",
                    "subjectId": "65b7e...",
                    "type": "exam",
                    "userId": "65b7c...",
                    "createdAt": "...",
                    "updatedAt": "..."
                }
            ]
        }
        ```
    *   **Middleware:** `authMiddleware`.

*   **PUT /api/v1/events/:id**
    *   **Description:** Update an event.
    *   **Payload:**
        ```json
        {
            "title": "DAA Final Exam",
            "date": "2024-05-20T09:00:00.000Z",
            "type": "exam"
        }
        ```
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "_id": "65b82...",
                "title": "DAA Final Exam",
                "date": "2024-05-20T09:00:00.000Z",
                "type": "exam",
                "userId": "65b7c...",
                "createdAt": "...",
                "updatedAt": "..."
            }
        }
        ```
    *   **Middleware:** `authMiddleware`.

*   **DELETE /api/v1/events/:id**
    *   **Description:** Delete an event.
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "message": "Event deleted successfully"
        }
        ```
    *   **Middleware:** `authMiddleware`.

---

**6. Global Configuration Routes (`/api/v1/config`)**

*   **GET /api/v1/config/maintenance**
    *   **Description:** Get the current maintenance mode status.
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "maintenanceMode": true
            }
        }
        ```
    *   **Middleware:** `authMiddleware` (can be public if needed, but for settings page, auth is fine).

*   **PUT /api/v1/config/maintenance**
    *   **Description:** Toggle maintenance mode. Requires admin privileges.
    *   **Payload:**
        ```json
        {
            "maintenanceMode": false
        }
        ```
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "maintenanceMode": false,
                "updatedBy": "65b7c...",
                "updatedAt": "..."
            }
        }
        ```
    *   **Middleware:** `authMiddleware`, `adminMiddleware` (must be an admin user).
    *   **Logic:** After saving, trigger Socket.io event `configUpdated`.

---

**7. Calculation & Prediction Routes (`/api/v1/calculations`, `/api/v1/predictions`)**

*   **GET /api/v1/calculations/sgpa**
    *   **Description:** Calculate and return current, projected, and maximum possible SGPA for the user's current semester (or all semesters if no current).
    *   **Query Params:** `?semesterId=65b7d...` (optional, for specific semester)
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "currentSGPAs": {
                    "65b7d...": { "value": 8.5, "percentage": 85.0 } // Semester ID -> SGPA/Percentage
                },
                "projectedSGPAs": {
                    "65b7d...": { "value": 9.2, "percentage": 92.0 }
                },
                "maximumSGPAs": {
                    "65b7d...": { "value": 10.0, "percentage": 100.0 }
                },
                "overall": {
                    "current": { "value": 8.5, "percentage": 85.0 },
                    "projected": { "value": 9.2, "percentage": 92.0 },
                    "maximum": { "value": 10.0, "percentage": 100.0 }
                }
            }
        }
        ```
    *   **Middleware:** `authMiddleware`.

*   **GET /api/v1/predictions/subject/:subjectId**
    *   **Description:** Get predictions for a single subject based on three modes.
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "subjectId": "65b7e...",
                "optimistic": { "percentage": 95, "gradePoint": 10, "message": "Assuming 100% in remaining components." },
                "performanceBased": { "percentage": 82, "gradePoint": 9, "message": "Based on 80% past performance." },
                "weightedRecency": { "percentage": 88, "gradePoint": 9, "message": "Recent scores weighted higher." }
            }
        }
        ```
    *   **Middleware:** `authMiddleware`.

*   **GET /api/v1/predictions/overall**
    *   **Description:** Get overall predictions for the current semester (or all).
    *   **Query Params:** `?semesterId=65b7d...` (optional)
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "optimistic": { "sgpa": 9.8, "percentage": 98, "message": "Overall assuming 100%..." },
                "performanceBased": { "sgpa": 8.5, "percentage": 85, "message": "Overall based on past..." },
                "weightedRecency": { "sgpa": 9.0, "percentage": 90, "message": "Overall recent weighted..." }
            }
        }
        ```
    *   **Middleware:** `authMiddleware`.

---

**8. Target Planner Routes (`/api/v1/target-planner`)**

*   **POST /api/v1/target-planner**
    *   **Description:** Calculate required marks in remaining components to hit a target.
    *   **Payload:** (Either `desiredPercentage` OR `desiredSgpa` must be provided, along with `subjectId` or `semesterId`)
        ```json
        {
            "subjectId": "65b7e...",
            "desiredPercentage": 85
        }
        // OR
        {
            "semesterId": "65b7d...",
            "desiredSgpa": 9.0
        }
        ```
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "targetAchievable": true,
                "requiredMarks": [
                    { "subjectId": "65b7e...", "subjectName": "DAA", "componentName": "SEE", "required": 75, "maxPossible": 100 },
                    { "subjectId": "65b7e...", "subjectName": "DAA", "componentName": "Project", "required": 40, "maxPossible": 50 }
                ],
                "message": "You need an average of 75% in remaining DAA components.",
                "maxAchievable": { "percentage": 92, "sgpa": 9.4 } // If target was impossible
            }
        }
        ```
    *   **Error Response (400 Bad Request):**
        ```json
        {
            "success": false,
            "message": "Target is impossible to achieve. Maximum possible is 88%."
        }
        ```
    *   **Middleware:** `authMiddleware`.

---

**9. What-If Simulation Routes (`/api/v1/what-if`)**

*   **POST /api/v1/what-if**
    *   **Description:** Simulate hypothetical marks and return projected final percentage/SGPA.
    *   **Payload:**
        ```json
        {
            "semesterId": "65b7d...",
            "hypotheticalMarks": [
                { "subjectId": "65b7e...", "componentName": "SEE", "marks": 70 },
                { "subjectId": "65b7f...", "componentName": "Final", "marks": 85 }
            ]
        }
        ```
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "finalPercentage": 88.5,
                "finalSgpa": 9.1
            }
        }
        ```
    *   **Middleware:** `authMiddleware`.

---

**10. Advanced Analytics Routes (`/api/v1/analytics`)**

*   **GET /api/v1/analytics/performance**
    *   **Description:** Get performance metrics (percentages) per subject and overall.
    *   **Query Params:** `?semesterId=65b7d...` (optional)
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "overallPercentage": 85.2,
                "subjectPerformance": [
                    { "subjectId": "65b7e...", "name": "DAA", "percentage": 88.0 },
                    { "subjectId": "65b7f...", "name": "OS", "percentage": 79.5 }
                ]
            }
        }
        ```
    *   **Middleware:** `authMiddleware`.

*   **GET /api/v1/analytics/weak-areas**
    *   **Description:** Identify lowest scoring subjects/components.
    *   **Query Params:** `?semesterId=65b7d...` (optional)
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "lowestSubjects": [
                    { "subjectId": "65b7f...", "name": "OS", "percentage": 79.5 }
                ],
                "lowestComponents": [
                    { "subjectId": "65b7e...", "subjectName": "DAA", "componentName": "Lab", "percentage": 60.0 }
                ]
            }
        }
        ```
    *   **Middleware:** `authMiddleware`.

*   **GET /api/v1/analytics/contribution**
    *   **Description:** Show contribution of each subject to overall SGPA.
    *   **Query Params:** `?semesterId=65b7d...` (optional)
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": [
                { "subjectId": "65b7e...", "name": "DAA", "credits": 4, "currentGradePoint": 9, "contributionToSGPA": 36 },
                { "subjectId": "65b7f...", "name": "OS", "credits": 3, "currentGradePoint": 8, "contributionToSGPA": 24 }
            ]
        }
        ```
    *   **Middleware:** `authMiddleware`.

*   **GET /api/v1/analytics/difficulty**
    *   **Description:** Compare required marks vs. past performance for remaining components.
    *   **Query Params:** `?semesterId=65b7d...` (optional)
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": [
                { "subjectId": "65b7e...", "subjectName": "DAA", "componentName": "SEE", "requiredPercentage": 75, "pastAveragePercentage": 80, "difficulty": "Moderate" },
                { "subjectId": "65b7f...", "subjectName": "OS", "componentName": "Final", "requiredPercentage": 95, "pastAveragePercentage": 70, "difficulty": "Hard" }
            ]
        }
        ```
    *   **Middleware:** `authMiddleware`.

*   **GET /api/v1/analytics/marginal-gain**
    *   **Description:** Compute SGPA improvement per +1 mark in each subject.
    *   **Query Params:** `?semesterId=65b7d...` (optional)
    *   **Payload:** None.
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": [
                { "subjectId": "65b7e...", "name": "DAA", "sgpaImprovementPerMark": 0.02 },
                { "subjectId": "65b7f...", "name": "OS", "sgpaImprovementPerMark": 0.015 }
            ]
        }
        ```
    *   **Middleware:** `authMiddleware`.

---

**11. AI Co-Pilot Routes (`/api/v1/ai`)**

*   **POST /api/v1/ai/query**
    *   **Description:** Send a natural language query to the AI Co-Pilot. The backend will process this, potentially query internal data, and use an LLM to generate a response.
    *   **Payload:**
        ```json
        {
            "prompt": "What do I need to score in the DAA final to hit an 8 SGPA?"
        }
        ```
    *   **Success Response (200 OK):**
        ```json
        {
            "success": true,
            "data": {
                "response": "To achieve an 8 SGPA, you would need to score approximately 70/100 in your DAA final exam, assuming your current marks remain as they are."
            }
        }
        ```
    *   **Error Response (500 Server Error / 400 Bad Request):**
        ```json
        {
            "success": false,
            "message": "Could not process AI query."
        }
        ```
    *   **Middleware:** `authMiddleware`.
    *   **Logic:** The `aiController` will parse the `prompt`, potentially call other backend calculation/prediction services, and then formulate a request to the OpenAI API, returning its response.

---

## 6. Real-time Events (WebSockets / Socket.io)

The Socket.io server (integrated with the Express backend) will handle real-time updates to ensure the UI reflects changes instantly without manual refreshes. Each user will join a dedicated "room" for their `userId` to receive private updates.

**Client-Side (Frontend) Emits:**

*   **`joinUserRoom`**
    *   **Description:** Sent by the client immediately after successful authentication to join a user-specific room on the server.
    *   **Payload:**
        ```json
        {
            "userId": "65b7c..."
        }
        ```
    *   **Flow:** Client authenticates -> receives JWT -> connects Socket.io -> emits `joinUserRoom`.

*   **`updateMarks`**
    *   **Description:** Sent when a user directly edits a mark in the UI. This triggers a backend update and subsequent real-time recalculations.
    *   **Payload:**
        ```json
        {
            "subjectId": "65b7e...",
            "componentName": "MSE 1",
            "obtainedMarks": 45
        }
        ```
    *   **Flow:** User edits mark in `SubjectsPage` -> client emits `updateMarks`.

*   **`requestPrediction`**
    *   **Description:** (Optional, if predictions are not always automatically updated) Client can explicitly request a new prediction calculation.
    *   **Payload:**
        ```json
        {
            "subjectId": "65b7e...", // Optional, for subject-specific prediction
            "mode": "optimistic" // Optional, for a specific mode
        }
        ```
    *   **Flow:** User navigates to `PredictionsPage` or clicks "Refresh" -> client emits `requestPrediction`.

**Server-Side (Backend) Emits:**

*   **`marksUpdated`**
    *   **Description:** Emitted to a specific `userId`'s room when any mark entry belonging to that user is created, updated, or deleted.
    *   **Payload:**
        ```json
        {
            "subjectId": "65b7e...",
            "marksData": [ // Array of all marks for the subject, or the updated mark
                { "_id": "65b80...", "componentName": "MSE 1", "obtainedMarks": 45 },
                { "_id": "65b81...", "componentName": "Task 1", "obtainedMarks": 18 }
            ]
        }
        ```
    *   **Flow:** `marksController` handles API call -> updates DB -> triggers `socketHandler.emitToUser(userId, 'marksUpdated', payload)`.

*   **`predictionUpdated`**
    *   **Description:** Emitted to a specific `userId`'s room when marks or structural changes lead to a recalculation of predictions (SGPA, percentages, etc.).
    *   **Payload:**
        ```json
        {
            "semesterId": "65b7d...", // Or null if overall
            "subjectId": "65b7e...", // Or null if overall
            "type": "sgpa" | "subjectPrediction" | "overallPrediction",
            "data": { /* structure similar to API responses for calculations/predictions */ }
        }
        ```
    *   **Flow:** `marksController` / `subjectController` update -> `calculations.js` / `predictionController` are called -> results are sent via `socketHandler.emitToUser(userId, 'predictionUpdated', payload)`.

*   **`configUpdated`**
    *   **Description:** Emitted to all connected clients (or specific user rooms if needed) when the global `maintenanceMode` status changes.
    *   **Payload:**
        ```json
        {
            "maintenanceMode": true,
            "message": "The system is now in maintenance mode. Structure editing is locked."
        }
        ```
    *   **Flow:** `configController` updates `GlobalConfig` -> triggers `socketHandler.emitToAllUsers('configUpdated', payload)`.

*   **`structureUpdated`**
    *   **Description:** Emitted to a specific `userId`'s room when semester, subject, or component structure changes (add/edit/delete). This prompts the client to refetch relevant structural data.
    *   **Payload:**
        ```json
        {
            "semesterId": "65b7d...", // ID of affected semester
            "subjectId": "65b7e...", // ID of affected subject
            "changeType": "added" | "updated" | "deleted",
            "entity": "semester" | "subject" | "component"
        }
        ```
    *   **Flow:** `semesterController` / `subjectController` update -> triggers `socketHandler.emitToUser(userId, 'structureUpdated', payload)`.

**Real-time Data Sync (Redis Cache):**
*   The `socketHandler.js` will likely use Redis for broadcasting messages efficiently and for potentially storing real-time calculation results temporarily to avoid redundant DB queries.
*   When a backend API triggers a calculation (e.g., after marks update), the result can be cached in Redis. Then, `socketHandler` can fetch from Redis and emit to clients.
*   The `maintenanceMiddleware` can also quickly check Redis for the `maintenanceMode` status before hitting the DB for `GlobalConfig`.

## 7. Frontend Pages & Components

The frontend will be a single-page application (SPA) built with React and Vite, using React Router DOM for navigation and Zustand for global state management. Tailwind CSS will be used for styling, adhering to the neo-minimalist, boxy, utility-focused design.

**State Management (Zustand):**
*   **`authStore.js`**: Manages user authentication state (`token`, `user` object), login/logout actions, and checks token validity.
*   **`semesterStore.js`**: Stores an array of `semesters`, the currently `selectedSemesterId`, and functions to `fetchSemesters`, `addSemester`, `updateSemester`, `deleteSemester`. It will also manage `subjects` associated with the selected semester.
*   **`marksStore.js`**: Stores `marks` data, organized by `subjectId`. Provides actions to `fetchMarksForSubject`, `updateMark`, `bulkUpdateMarks`. It will also listen to `marksUpdated` Socket.io events.
*   **`configStore.js`**: Stores the global `maintenanceMode` status and an action to `fetchMaintenanceMode`. Listens to `configUpdated` Socket.io events.
*   **`uiStore.js`**: Manages general UI states like `isLoading`, `isModalOpen`, `currentModalType`, and `notifications`.

---

**Page Descriptions & Component Usage:**

**1. `LoginPage.jsx` & `SignupPage.jsx`**
*   **UI Components:** `LoginForm.jsx`, `SignupForm.jsx`, `Input.jsx`, `Button.jsx`, `Card.jsx`.
*   **State Management:** `authStore` for login/registration data and actions.
*   **API Interactions:**
    *   `POST /api/v1/auth/login`
    *   `POST /api/v1/auth/register`
*   **Logic:** On successful auth, store JWT in `localStorage` and redirect to `/dashboard`.

**2. `DashboardPage.jsx` (`/dashboard`)**
*   **UI Components:** `MainLayout`, `Sidebar`, `MetricCard.jsx` (for SGPA, Overall %), `ChartContainer.jsx` (for simple progress bar or small trend charts).
*   **State Management:** `semesterStore` (for current semester context), `marksStore` (for latest mark data), `configStore` (for maintenance mode banner).
*   **API Interactions:**
    *   `GET /api/v1/calculations/sgpa`
    *   `GET /api/v1/predictions/overall`
*   **Logic:** Displays a summary of current, projected, and max SGPA/percentages. Shows a quick overview of academic health.

**3. `SubjectsPage.jsx` (`/subjects`)**
*   **UI Components:** `MainLayout`, `Sidebar`, `Card.jsx` (for semester/subject containers), `SubjectCard.jsx`, `ComponentInputRow.jsx`, `Input.jsx`, `Button.jsx`, `Modal.jsx`, `SubjectForm.jsx`.
*   **State Management:** `semesterStore` (to manage semesters and their subjects), `marksStore` (for marks data and updates).
*   **API Interactions:**
    *   `GET /api/v1/semesters` (to fetch all semesters)
    *   `POST /api/v1/semesters`, `PUT /api/v1/semesters/:id`, `DELETE /api/v1/semesters/:id`
    *   `POST /api/v1/subjects`, `PUT /api/v1/subjects/:id`, `DELETE /api/v1/subjects/:id`
    *   `PUT /api/v1/subjects/:id/components`
    *   `GET /api/v1/marks/subject/:subjectId` (fetched for each expanded subject)
    *   `POST /api/v1/marks/bulk` (for inline marks editing)
*   **Logic:** Allows users to dynamically add/edit/delete semesters and subjects. Each subject card expands to reveal its components and allows inline editing of `obtainedMarks`. Displays total marks/percentage for each subject dynamically. Structural changes are locked if `maintenanceMode` is true.

**4. `PredictionsPage.jsx` (`/predictions`)**
*   **UI Components:** `MainLayout`, `Sidebar`, `Card.jsx`, `PredictionDisplay.jsx` (three instances for each mode), `MetricCard.jsx` (for overall predictions).
*   **State Management:** `semesterStore` (to select a semester for predictions).
*   **API Interactions:**
    *   `GET /api/v1/predictions/subject/:subjectId` (for each subject)
    *   `GET /api/v1/predictions/overall`
*   **Logic:** Presents three distinct prediction models (Optimistic, Performance-Based, Weighted Recency) for both subject-level and overall SGPA/percentage. Each `PredictionDisplay` clearly states its assumptions.

**5. `TargetPlannerPage.jsx` (`/target-planner`)**
*   **UI Components:** `MainLayout`, `Sidebar`, `Card.jsx`, `Input.jsx`, `Button.jsx`, `Table.jsx` (for displaying required marks), `MetricCard.jsx` (for max achievable).
*   **State Management:** `semesterStore` (for subject/semester context).
*   **API Interactions:**
    *   `POST /api/v1/target-planner`
*   **Logic:** User inputs a desired percentage or SGPA. The system calculates and displays the required marks for remaining components, indicating feasibility and the maximum achievable score if the target is impossible.

**6. `CalendarPage.jsx` (`/calendar`)**
*   **UI Components:** `MainLayout`, `Sidebar`, `FullCalendar` component, `EventModal.jsx`, `Input.jsx`, `Button.jsx`.
*   **State Management:** `uiStore` (for modal visibility), `semesterStore` (to link events to subjects).
*   **API Interactions:**
    *   `GET /api/v1/events` (fetching all events for the current view range)
    *   `POST /api/v1/events`, `PUT /api/v1/events/:id`, `DELETE /api/v1/events/:id`
*   **Logic:** Displays academic events (exams, deadlines) on an interactive calendar. Users can add, edit, or delete events, linking them to specific subjects and color-coding them.

**7. `AnalyticsPage.jsx` (`/analytics`)**
*   **UI Components:** `MainLayout`, `Sidebar`, `Card.jsx`, `ChartContainer.jsx` (for bar/line charts), `MetricCard.jsx`.
*   **State Management:** `semesterStore`.
*   **API Interactions:**
    *   `GET /api/v1/analytics/performance`
    *   `GET /api/v1/analytics/weak-areas`
    *   `GET /api/v1/analytics/contribution`
    *   `GET /api/v1/analytics/difficulty`
    *   `GET /api/v1/analytics/marginal-gain`
*   **Logic:** Visualizes various academic analytics. Uses simple, monochrome charts to display performance metrics, identify weak areas, show subject contributions, and analyze marginal gains.

**8. `SettingsPage.jsx` (`/settings`)**
*   **UI Components:** `MainLayout`, `Sidebar`, `Card.jsx`, `Button.jsx`, Toggle switch component.
*   **State Management:** `configStore` (for maintenance mode status).
*   **API Interactions:**
    *   `GET /api/v1/config/maintenance`
    *   `PUT /api/v1/config/maintenance`
*   **Logic:** Allows users to view and (if admin) toggle the global `maintenanceMode`.

**9. `CoPilotChatWindow.jsx` (Component, integrated into various pages or as a fixed sidebar/modal)**
*   **UI Components:** `Input.jsx` (for chat input), `Button.jsx` (for send), `Card.jsx` (for chat messages).
*   **State Management:** Local component state for chat history, `uiStore` for visibility.
*   **API Interactions:**
    *   `POST /api/v1/ai/query`
*   **Logic:** Provides a chat interface for users to ask natural language questions. Displays user prompts and AI responses.

## 8. Authentication & Authorization Flow

The system employs JSON Web Tokens (JWT) for stateless authentication and authorization.

**1. User Registration (`POST /api/v1/auth/register`)**
*   User provides `name`, `email`, `password`.
*   Backend hashes the `password` using `bcryptjs`.
*   A new `User` document is created in MongoDB.
*   A JWT is signed using `jsonwebtoken` with the user's ID as the payload.
*   The JWT and basic user info are returned to the client.

**2. User Login (`POST /api/v1/auth/login`)**
*   User provides `email`, `password`.
*   Backend retrieves the `User` by `email`.
*   The provided `password` is compared with the stored hashed password using `bcryptjs`.
*   If credentials match, a new JWT is signed with user's ID and returned.

**3. JWT Handling (Frontend)**
*   Upon successful registration or login, the JWT (`token`) is stored in `localStorage` in the browser.
*   For every subsequent authenticated API request, the `token` is retrieved from `localStorage` and sent in the `Authorization` header as a Bearer token (`Authorization: Bearer <token>`).
*   Axios interceptors will be used to automatically attach the token to outgoing requests.

**4. Authentication Middleware (`authMiddleware.js` - Backend)**
*   This middleware intercepts requests to protected routes.
*   It checks for the `Authorization` header.
*   It verifies the JWT using `jsonwebtoken.verify()` with `JWT_SECRET`.
*   If valid, it extracts the `userId` from the token's payload, fetches the corresponding `User` from the database, and attaches the `user` object to `req.user`.
*   If invalid or missing, it returns a 401 Unauthorized error.

**5. Authorization (Role-Based Access Control)**
*   For the hackathon, a simple authorization model will be used:
    *   All user-specific data (semesters, subjects, marks, events) are tied to `req.user._id` (multi-tenancy). The backend ensures a user can only access/modify their own data.
    *   **Admin Role (for `GlobalConfig`):** For `PUT /api/v1/config/maintenance`, an `adminMiddleware` will be implemented. This middleware will check if `req.user.isAdmin` (a new boolean field on the `User` schema, initially `false` for all users, manually set to `true` for the first registered user or specific test users).

**6. Token Expiration & Logout**
*   JWTs will have a relatively short expiration time (e.g., 1 hour for hackathon, configurable).
*   The frontend will handle token expiration by redirecting to the login page if an API call returns a 401 Unauthorized error (handled by Axios interceptors).
*   **Logout:** The frontend simply clears the JWT from `localStorage` and redirects to the login page. The backend remains stateless.

## 9. Environment Variables (.env)

A `.env` file should be created in both `frontend/` and `backend/` directories. For the backend, `dotenv` will load these variables. For the frontend, Vite automatically exposes `VITE_` prefixed variables.

**`backend/.env` (Example):**
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/academic-control-system?retryWrites=true&w=majority
JWT_SECRET=supersecretjwtkeythatshouldbemorecomplex
JWT_EXPIRE=1h
REDIS_URL=redis://localhost:6379 # Or a Railway/Upstash URL
CLIENT_URL=http://localhost:5173 # Frontend URL for CORS
OPENAI_API_KEY=sk-your_openai_api_key_here
```

**`frontend/.env` (Example):**
```
VITE_API_BASE_URL=http://localhost:5000/api/v1 # Backend API base URL
VITE_WS_URL=http://localhost:5000 # Backend Socket.io URL
# VITE_OPENAI_API_KEY=sk-your_openai_api_key_here # If direct client-side AI calls are made (less secure, prefer backend proxy)
```

**Descriptions:**
*   `NODE_ENV`: Node.js environment (`development`, `production`). Affects logging, error details.
*   `PORT`: Port for the backend server to listen on.
*   `MONGO_URI`: Connection string for MongoDB Atlas. **Crucial for database access.**
*   `JWT_SECRET`: Secret key used to sign and verify JWTs. **Must be a strong, random string.**
*   `JWT_EXPIRE`: Expiration time for JWTs (e.g., `1h`, `30d`).
*   `REDIS_URL`: Connection URL for the Redis server.
*   `CLIENT_URL`: The URL of the frontend application. Used for CORS configuration on the backend.
*   `OPENAI_API_KEY`: API key for accessing OpenAI services. **Keep this secure on the backend.**
*   `VITE_API_BASE_URL`: Base URL for frontend API requests.
*   `VITE_WS_URL`: Base URL for frontend WebSocket connection.

## 10. Hosting & Deployment Launchpad

The application will be deployed to Vercel for the frontend, Railway for the backend and Socket.io server, and MongoDB Atlas for the database. Redis will be provisioned via Railway's add-on or a service like Upstash.

**1. MongoDB Atlas (Database)**
*   **Setup:**
    1.  Create a free-tier MongoDB Atlas account.
    2.  Set up a new cluster.
    3.  Configure Network Access: Allow access from anywhere (0.0.0.0/0) for simplicity in hackathon, or specify IP addresses for Vercel/Railway regions.
    4.  Create a Database User with read and write access to your database.
    5.  Obtain the connection string (SRV URI) for your cluster.
*   **Environment Variable:** This connection string will be set as `MONGO_URI` in Railway.

**2. Railway (Backend & Socket.io Server)**
*   **Setup:**
    1.  Create a Railway account and connect it to your GitHub repository.
    2.  Create a new project and select "Deploy from GitHub Repo."
    3.  Choose the `backend/` directory in your repository.
    4.  Railway will auto-detect Node.js.
    5.  **Build Command:** `npm install` (default)
    6.  **Start Command:** `node src/server.js` (Ensure `server.js` is your main entry point that starts Express and Socket.io).
    7.  **Environment Variables:** Add all variables from `backend/.env` to Railway's "Variables" section for the backend service. Crucially, `MONGO_URI`, `JWT_SECRET`, `REDIS_URL`, `OPENAI_API_KEY`, and `CLIENT_URL`.
        *   `CLIENT_URL` must be set to your deployed Vercel frontend URL (e.g., `https://academic-control-system.vercel.app`).
        *   Railway automatically provides a public domain for your service. This will be your `VITE_API_BASE_URL` and `VITE_WS_URL` for the frontend.
    8.  **Networking:** Railway typically exposes your app on port 80/443. Ensure your Node.js app listens on `process.env.PORT || 5000`.
    9.  **Redis Add-on:** Add a Redis service as an add-on in your Railway project. Railway will automatically inject its `REDIS_URL` into your backend service's environment variables.

**3. Vercel (Frontend)**
*   **Setup:**
    1.  Create a Vercel account and connect it to your GitHub repository.
    2.  Import your project and select the `frontend/` directory.
    3.  Vercel will auto-detect Vite/React.
    4.  **Build Command:** `npm run build` (default)
    5.  **Output Directory:** `dist` (default)
    6.  **Environment Variables:** Add all `VITE_` prefixed variables from `frontend/.env` to Vercel's "Environment Variables" section.
        *   `VITE_API_BASE_URL`: Set this to the public domain provided by Railway for your backend (e.g., `https://academic-control-system-backend.railway.app/api/v1`).
        *   `VITE_WS_URL`: Set this to the public domain provided by Railway for your backend (e.g., `https://academic-control-system-backend.railway.app`).
    7.  **Domain:** Vercel automatically assigns a `.vercel.app` domain. This will be your `CLIENT_URL` for the backend.

**4. CORS Configuration (Backend)**
*   In `backend/src/app.js`, ensure `cors` middleware is configured correctly:
    ```javascript
    const cors = require('cors');
    // ...
    app.use(cors({
        origin: process.env.CLIENT_URL, // Allow requests only from your Vercel frontend
        credentials: true // If you use cookies/sessions
    }));
    ```
*   This prevents cross-origin request errors between your Vercel frontend and Railway backend.

## 11. Dev Setup & Run Commands

Follow these steps to set up and run the Academic Control System locally on your machine.

**1. Clone the Repository:**
```bash
git clone https://github.com/<your-username>/academic-control-system.git
cd academic-control-system
```

**2. Backend Setup:**
```bash
cd backend
npm install
cp .env.example .env
```
*   **Edit `backend/.env`**: Fill in your `MONGO_URI` (e.g., a local MongoDB instance or a free Atlas cluster), `JWT_SECRET`, `REDIS_URL` (e.g., `redis://localhost:6379`), `CLIENT_URL` (e.g., `http://localhost:5173`), and `OPENAI_API_KEY`.

**3. Frontend Setup:**
```bash
cd ../frontend
npm install
cp .env.example .env
```
*   **Edit `frontend/.env`**: Fill in `VITE_API_BASE_URL` (e.g., `http://localhost:5000/api/v1`) and `VITE_WS_URL` (e.g., `http://localhost:5000`).

**4. Start Redis (Optional, if using local Redis):**
*   If you have Docker installed:
    ```bash
    docker run --name my-redis -p 6379:6379 -d redis
    ```
*   If you have Redis installed directly, start the Redis server.

**5. Start MongoDB (Optional, if using local MongoDB):**
*   If you have Docker installed:
    ```bash
    docker run --name my-mongo -p 27017:27017 -d mongo
    ```
*   If you have MongoDB installed directly, start the MongoDB server. Ensure your `MONGO_URI` in `backend/.env` points to your local instance (e.g., `mongodb://localhost:27017/academic-control-system-local`).

**6. Run the Backend Server:**
```bash
cd ../backend
npm run dev # Or `npm start` for production build
```
The backend server will typically run on `http://localhost:5000`.

**7. Run the Frontend Development Server:**
```bash
cd ../frontend
npm run dev
```
The frontend development server will typically run on `http://localhost:5173`.

**8. Access the Application:**
Open your web browser and navigate to `http://localhost:5173`.

## 12. Agent Task Checklist (The Master Plan)

This checklist provides a granular, step-by-step plan for building the Academic Control System. Each item is a distinct, testable task.

**Phase 1: Project Setup & Core Backend Infrastructure**

1.  **Repository Initialization:**
    *   Create a new GitHub repository named `academic-control-system`.
    *   Initialize `backend/` and `frontend/` directories.
    *   Add `README.md` and `.env.example` files at the root.
    *   Set up `.gitignore` for both `backend/` and `frontend/`.
2.  **Backend Core Setup (`backend/`)**
    *   Initialize `package.json` in `backend/`.
    *   Install core dependencies: `express`, `mongoose`, `dotenv`, `cors`, `helmet`, `express-rate-limit`.
    *   Create `src/server.js` to start the Express app.
    *   Create `src/app.js` for Express app configuration (middleware, routes).
    *   Create `src/config/db.js` for MongoDB connection using Mongoose.
    *   Implement basic error handling middleware (`src/middleware/errorHandler.js`).
    *   Configure `cors` in `src/app.js` using `process.env.CLIENT_URL`.
    *   Add `scripts` to `package.json` for `start` and `dev` (using `nodemon`).
3.  **Authentication Backend:**
    *   Install `jsonwebtoken`, `bcryptjs`.
    *   Create `src/models/User.js` with schema for `name`, `email`, `password`, `isAdmin` (default `false`). Implement pre-save password hashing and password comparison method.
    *   Create `src/utils/jwt.js` for generating JWTs.
    *   Create `src/middleware/authMiddleware.js` to verify JWTs and attach `req.user`.
    *   Create `src/controllers/authController.js` for `register` and `login` logic.
    *   Create `src/routes/authRoutes.js` for `/api/v1/auth/register` (POST) and `/api/v1/auth/login` (POST).
    *   Integrate `authRoutes` into `src/app.js`.
    *   Implement `GET /api/v1/auth/me` to get logged-in user details, protected by `authMiddleware`.
4.  **Global Configuration & Maintenance Mode:**
    *   Create `src/models/GlobalConfig.js` with schema for `maintenanceMode` (boolean) and `updatedBy` (ref to User).
    *   Create `src/middleware/maintenanceMiddleware.js` to check `GlobalConfig.maintenanceMode` and block specific operations.
    *   Create `src/middleware/adminMiddleware.js` to check `req.user.isAdmin`.
    *   Create `src/controllers/configController.js` for getting and updating `GlobalConfig`.
    *   Create `src/routes/configRoutes.js` for `GET /api/v1/config/maintenance` (protected) and `PUT /api/v1/config/maintenance` (protected by `authMiddleware`, `adminMiddleware`).

**Phase 2: Dynamic Academic Structure & Marks Management Backend**

5.  **Database Schemas (Core):**
    *   Create `src/models/Semester.js` schema.
    *   Create `src/models/Subject.js` schema (with embedded `components` array).
    *   Create `src/models/Marks.js` schema (with unique index on `userId, subjectId, componentName`).
    *   Implement cascade deletion pre-hooks for `Semester` (deletes Subjects) and `Subject` (deletes Marks, removes from Semester).
6.  **Semester CRUD Endpoints:**
    *   Create `src/controllers/semesterController.js` with logic for create, read (all, single), update, delete.
    *   Create `src/routes/semesterRoutes.js` for `POST`, `GET /:id`, `GET`, `PUT /:id`, `DELETE /:id`.
    *   Protect all with `authMiddleware`. Apply `maintenanceMiddleware` to `POST`, `PUT`, `DELETE`.
7.  **Subject CRUD Endpoints:**
    *   Create `src/controllers/subjectController.js` with logic for create, read (single, by semester), update (details, components), delete.
    *   Create `src/routes/subjectRoutes.js` for `POST`, `GET /:id`, `GET /semester/:semesterId`, `PUT /:id`, `PUT /:id/components`, `DELETE /:id`.
    *   Protect all with `authMiddleware`. Apply `maintenanceMiddleware` to `POST`, `PUT`, `DELETE`, `PUT /:id/components`.
8.  **Marks CRUD Endpoints:**
    *   Create `src/controllers/marksController.js` with logic for create/upsert (single), bulk create/upsert, read (by subject), delete.
    *   Create `src/routes/marksRoutes.js` for `POST`, `POST /bulk`, `GET /subject/:subjectId`, `DELETE /:id`.
    *   Protect all with `authMiddleware`.

**Phase 3: Real-time & Core Calculation Backend**

9.  **Socket.io Backend Integration:**
    *   Install `socket.io`, `ioredis`.
    *   Integrate Socket.io with the existing Express HTTP server in `src/server.js`.
    *   Create `src/config/redis.js` for Redis client setup.
    *   Create `src/socketHandler.js` to manage Socket.io connections, user rooms, and emit helper functions (`emitToUser`, `emitToAllUsers`).
    *   Implement `connection` and `disconnect` events.
    *   Implement listener for `joinUserRoom` event.
10. **Core Calculation Logic:**
    *   Create `src/utils/calculations.js` to encapsulate all calculation logic:
        *   `calculateSubjectPercentage(subject, marks)`
        *   `calculateOverallPercentage(semesters, subjects, marks)`
        *   `getGradePoint(percentage)` based on defined mapping.
        *   `calculateSGPA(semesterId, subjects, marks)` (current, projected, max).
    *   **SGPA Calculation Endpoint:**
        *   Create `src/controllers/predictionController.js` (will also house predictions).
        *   Add logic to calculate current, projected, max SGPA.
        *   Create `GET /api/v1/calculations/sgpa` route in `src/routes/predictionRoutes.js`.
        *   Protect with `authMiddleware`.

**Phase 4: Prediction & Analytics Backend**

11. **Prediction Engine Endpoints:**
    *   Extend `src/utils/calculations.js` with prediction logic:
        *   `predictOptimistic(subject, marks)`
        *   `predictPerformanceBased(subject, marks)`
        *   `predictWeightedRecency(subject, marks)`
    *   Extend `src/controllers/predictionController.js` to use these functions.
    *   Add routes: `GET /api/v1/predictions/subject/:subjectId` and `GET /api/v1/predictions/overall` in `src/routes/predictionRoutes.js`.
    *   Protect with `authMiddleware`.
12. **Target Planner Endpoint:**
    *   Extend `src/utils/calculations.js` with `solveForRequiredMarks(subject, marks, desiredPercentage/Sgpa)`.
    *   Extend `src/controllers/predictionController.js`.
    *   Add `POST /api/v1/target-planner` route in `src/routes/predictionRoutes.js`.
    *   Protect with `authMiddleware`.
13. **What-If Simulation Endpoint:**
    *   Extend `src/utils/calculations.js` with `simulateMarks(semesterId, currentMarks, hypotheticalMarks)`.
    *   Extend `src/controllers/predictionController.js`.
    *   Add `POST /api/v1/what-if` route in `src/routes/predictionRoutes.js`.
    *   Protect with `authMiddleware`.
14. **Advanced Analytics Endpoints:**
    *   Create `src/controllers/analyticsController.js`.
    *   Create `src/routes/analyticsRoutes.js`.
    *   Implement `GET /api/v1/analytics/performance`.
    *   Implement `GET /api/v1/analytics/weak-areas`.
    *   Implement `GET /api/v1/analytics/contribution`.
    *   Implement `GET /api/v1/analytics/difficulty`.
    *   Implement `GET /api/v1/analytics/marginal-gain`.
    *   Protect all with `authMiddleware`.

**Phase 5: Frontend Core & UI Base**

15. **Frontend Core Setup (`frontend/`)**
    *   Initialize `package.json` in `frontend/`.
    *   Install core dependencies: `react`, `react-dom`, `vite`, `zustand`, `react-router-dom`, `axios`, `tailwindcss`, `postcss`, `autoprefixer`.
    *   Configure `tailwind.config.js` and `index.css` for base styles.
    *   Create `src/main.jsx` and `src/App.jsx` with `BrowserRouter`.
    *   Create `src/services/api.js` for Axios instance with interceptors for JWT.
    *   Set up `frontend/.env` with `VITE_API_BASE_URL` and `VITE_WS_URL`.
16. **UI Layout & Shared Components:**
    *   Implement `src/components/Shared/Button.jsx`, `Input.jsx`, `Card.jsx`, `Modal.jsx`, `Table.jsx`.
    *   Implement `src/components/Layout/Sidebar.jsx` with navigation links.
    *   Implement `src/components/Layout/MainLayout.jsx` to wrap content with `Sidebar`.
    *   Apply neo-minimalist, boxy styling using Tailwind CSS across these components.
17. **Zustand State Stores:**
    *   Create `src/store/authStore.js`, `semesterStore.js`, `marksStore.js`, `configStore.js`, `uiStore.js`.
    *   Implement basic state and actions for each.
18. **Auth UI:**
    *   Implement `src/pages/LoginPage.jsx` and `src/pages/SignupPage.jsx`.
    *   Use `LoginForm.jsx` and `SignupForm.jsx`.
    *   Integrate with `authStore` for login/register actions and token management.
    *   Redirect to `/dashboard` on success.

**Phase 6: Frontend Pages Implementation & Real-time Integration**

19. **Dashboard Page (`/dashboard`):**
    *   Implement `src/pages/DashboardPage.jsx`.
    *   Fetch data from `GET /api/v1/calculations/sgpa` and `GET /api/v1/predictions/overall`.
    *   Display key metrics using `MetricCard.jsx` components.
20. **Subjects Page (`/subjects`):**
    *   Implement `src/pages/SubjectsPage.jsx`.
    *   Fetch all semesters from `GET /api/v1/semesters`.
    *   Render `Card.jsx` for each semester, allowing expansion.
    *   Inside expanded semester, fetch and render `SubjectCard.jsx` for each subject.
    *   `SubjectCard.jsx`: Display subject details, fetch marks for components from `GET /api/v1/marks/subject/:subjectId`.
    *   Implement inline editing for marks using `ComponentInputRow.jsx` and `POST /api/v1/marks/bulk`.
    *   Implement forms/modals for adding/editing/deleting semesters and subjects (`SubjectForm.jsx`), interacting with relevant APIs (`POST/PUT/DELETE /api/v1/semesters`, `POST/PUT/DELETE /api/v1/subjects`, `PUT /api/v1/subjects/:id/components`).
    *   Disable structural editing if `configStore.maintenanceMode` is true.
21. **Predictions Page (`/predictions`):**
    *   Implement `src/pages/PredictionsPage.jsx`.
    *   Fetch data from `GET /api/v1/predictions/overall` and `GET /api/v1/predictions/subject/:subjectId` for selected subjects.
    *   Render multiple `PredictionDisplay.jsx` components for each prediction mode.
22. **Target Planner Page (`/target-planner`):**
    *   Implement `src/pages/TargetPlannerPage.jsx`.
    *   Design input form for desired percentage/SGPA and subject/semester selection.
    *   Call `POST /api/v1/target-planner` and display results using `Table.jsx` and `MetricCard.jsx`.
23. **Calendar Page (`/calendar`):**
    *   Install `react-fullcalendar`, `fullcalendar` plugins.
    *   Create `src/models/Event.js` schema.
    *   Implement `src/pages/CalendarPage.jsx` using `FullCalendar`.
    *   Fetch events from `GET /api/v1/events`.
    *   Implement `EventModal.jsx` for adding/editing events, interacting with `POST/PUT/DELETE /api/v1/events`.
24. **Analytics Page (`/analytics`):**
    *   Install `react-chartjs-2`, `chart.js`.
    *   Implement `src/pages/AnalyticsPage.jsx`.
    *   Fetch data from various `/api/v1/analytics/*` endpoints.
    *   Display data using `ChartContainer.jsx` (bar, line charts) and `MetricCard.jsx`.
25. **Settings Page (`/settings`):**
    *   Implement `src/pages/SettingsPage.jsx`.
    *   Display `configStore.maintenanceMode` status.
    *   Add a toggle switch component. If user is admin, allow `PUT /api/v1/config/maintenance`.
26. **Real-time Frontend Integration:**
    *   Create `src/hooks/useSocket.js` to manage Socket.io connection and event listeners.
    *   In `App.jsx` or `MainLayout.jsx`, use `useSocket` to connect upon authentication.
    *   Implement listeners for `marksUpdated`, `predictionUpdated`, `configUpdated`, `structureUpdated` in relevant stores (`marksStore`, `configStore`, `semesterStore`).
    *   Update UI state in response to these real-time events.
27. **AI Co-Pilot (Stretch Goal):**
    *   Install `openai` (if client-side, but prefer backend proxy).
    *   Create `src/services/openaiService.js` (if client-side) or `src/components/CoPilot/CoPilotChatWindow.jsx`.
    *   Integrate `CoPilotChatWindow.jsx` into a page or as a persistent component.
    *   Send user prompts to `POST /api/v1/ai/query` and display responses.

**Phase 7: Final Polish & Deployment Preparation**

28. **Comprehensive Validation:**
    *   Implement robust input validation on both frontend (formik/yup or native) and backend (`express-validator`).
29. **Error Handling & UI Feedback:**
    *   Ensure all API calls handle errors gracefully and provide user-friendly feedback (toasts, error messages).
    *   Implement loading states for data fetching.
30. **Deployment Configuration:**
    *   Verify `frontend/.env` and `backend/.env` are correctly set up for production.
    *   Test deployment process on Vercel and Railway.
    *   Ensure CORS is correctly configured.
    *   Verify Socket.io connection works in deployed environment.
