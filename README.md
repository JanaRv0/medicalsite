# Medical Site - Membership & Admin System

This project is a Next.js-based medical site featuring a comprehensive membership application system, admin dashboard, and content management capabilities.

## 🚀 Features

### 1. Membership Application System
- **Public Form**: Users can apply for membership via `/membership`.
- **Fields**: Full Name, Email, Phone, Date of Birth, Profession, Membership Category (Student, Full Member, Associate, Honorary).
- **Validation**: Real-time client-side validation and robust server-side validation.
- **Feedback**: Instant success/error feedback to the user.

### 2. Admin Dashboard (`/admin/dashboard`)
- **Secure Authentication**: JWT-based login system with HTTP-only cookies.
- **Application Management**:
  - View all membership applications.
  - Filter by status (Pending, Approved, Rejected) or view all.
  - Approve or Reject applications with a single click.
  - View detailed application information.
- **Feedback Management**:
  - View messages submitted via the Contact form.
  - Mark messages as Read or Resolved.
- **Statistics**: Real-time counters for total, pending, approved, and rejected applications.
- **Settings**: Admin password change functionality.

### 3. Contact & Feedback
- **Contact Form**: Public contact form at `/contact`.
- **Integration**: Submissions are stored in the database and visible in the Admin Dashboard.

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Database**: SQLite (via Prisma ORM)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: `jose` (JWT), `bcryptjs` (Password hashing)
- **Styling**: CSS Modules / Styled JSX

## 📂 Full Project Structure

```
├── .env.local               # Environment variables (DB URL, JWT Secret)
├── components/              # Reusable React components
│   ├── Layout.js            # Main site layout wrapper
│   ├── Header.js            # Navigation header
│   └── Footer.js            # Site footer
├── lib/                     # Backend utilities
│   ├── auth.ts              # Auth helpers (hashing, JWT verification)
│   └── prisma.ts            # Prisma client singleton
├── pages/                   # Application Routes & Views
│   ├── _app.js              # Global App wrapper
│   ├── index.js             # Homepage - Main landing page
│   ├── about.js             # About Us page
│   ├── membership.js        # Membership Application Form
│   ├── contact.js           # Contact & Feedback Form
│   ├── executives.js        # Executives profile page
│   ├── activities.js        # Activities & Events page
│   ├── faith.js             # Faith & Mission page
│   ├── gallery.js           # Photo Gallery
│   ├── guidelines.js        # Ethical Guidelines
│   ├── news.js              # News & Updates
│   ├── outreach.js          # Community Outreach
│   ├── admin/               # Admin Frontend
│   │   ├── login.tsx        # Admin Login Page
│   │   └── dashboard.tsx    # Main Admin Dashboard (Protected)
│   └── api/                 # Backend API Endpoints
│       ├── admin/           # Admin APIs (Login, Logout, Data)
│       │   ├── login.ts     # Login handler
│       │   ├── logout.ts    # Logout handler
│       │   ├── applications.ts # Application CRUD
│       │   ├── feedback.ts  # Feedback CRUD
│       │   └── change-password.ts
│       ├── membership/      # Public APIs
│       │   └── apply.ts     # Application submission
│       └── feedback/
│           └── submit.ts    # Contact form submission
├── prisma/                  # Database Configuration
│   ├── schema.prisma        # Database Schema Definitions
│   └── dev.db               # SQLite Database File
├── public/                  # Static Assets
│   └── images/              # Images and icons
├── scripts/                 # Utility Scripts
│   ├── create-admin.ts      # Script to create initial admin user
│   └── test-login.ts        # Script to verify credentials
├── styles/                  # Global Styles
│   └── globals.css          # Global CSS resets and styles
├── next.config.ts           # Next.js Configuration
├── package.json             # Project Dependencies
└── tsconfig.json            # TypeScript Configuration
```

## ⚙️ Setup & Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   ```

3. **Database Setup**
   Initialize the database and run migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Create Admin User**
   Run the helper script to create the initial admin account:
   ```bash
   npx tsx scripts/create-admin.ts
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```
   Access the site at `http://localhost:3000`.

## 👨‍💼 Accessing the Admin Dashboard

Once the server is running, you can access the admin panel to manage applications and feedback.

1. **Navigate to the Login Page**:
   Open your browser and go to:
   [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

2. **Log In**:
   Use the default credentials created by the `create-admin.ts` script:
   - **Email**: `admin@medicalsite.com`
   - **Password**: `admin123`

   *> **Note**: If these credentials do not work, run `npx tsx scripts/create-admin.ts` in your terminal to ensure the admin user exists in the database.*

3. **Dashboard Overview**:
   After logging in, you will be redirected to `/admin/dashboard` where you can:
   - See statistics on new applications.
   - Review, Approve, or Reject membership requests.
   - Read and resolve contact form messages.
   - Change your admin password under the "Settings" tab.

## 🗄️ Accessing the Database

You can view and manage the database directly using **Prisma Studio**, a visual editor for your data.

1. **Open a new terminal** in the project folder.
2. **Run the following command**:
   ```bash
   npx prisma studio
   ```
3. **Open your browser** to `http://localhost:5555`.

Here you can:
- View all `MembershipApplication` records.
- View all `Feedback` messages.
- View and manage `Admin` users.
- Manually add, edit, or delete records if needed for testing.

**Direct File Access:**
The database is stored as a SQLite file located at `prisma/dev.db`. You can also use any SQLite viewer (like *DB Browser for SQLite*) to open this file directly.

## 🔐 API Endpoints Reference

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/api/membership/apply` | Submit new application | Public |
| `POST` | `/api/feedback/submit` | Submit contact form | Public |
| `POST` | `/api/admin/login` | Admin login | Public |
| `POST` | `/api/admin/logout` | Admin logout | Admin |
| `GET` | `/api/admin/applications` | Fetch all applications | Admin |
| `PATCH` | `/api/admin/applications` | Update app status | Admin |
| `GET` | `/api/admin/feedback` | Fetch all feedback | Admin |
| `PATCH` | `/api/admin/feedback` | Update feedback status | Admin |
| `POST` | `/api/admin/change-password` | Change admin password | Admin |

## 📝 Database Schema

The project uses three main models:
- **Admin**: Stores admin credentials (email, password hash).
- **MembershipApplication**: Stores applicant details and status.
- **Feedback**: Stores contact form messages.

View the full schema in `prisma/schema.prisma`.
