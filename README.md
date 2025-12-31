# Fix My Ward - Community Problem Tracker

A modern, full-stack web application that enables citizens to report community problems (broken roads, water issues, footpath problems, etc.) to their ward councillors in Bengaluru, India.

## Features

- **Multi-Language Support**: English, Hindi, and Kannada
- **Dual User Roles**: Citizens and Councillors
- **Photo-Based Reporting**: Citizens can upload photos of issues
- **Smart Verification**: Councillors can verify and validate reports
- **10 Bengaluru Wards**: Pre-configured wards with councillor information
- **Real-Time Status Tracking**: Citizens can track the status of their reports
- **Issue Categories**: Road damage, water problems, footpaths, drainage, street lights, garbage, and more
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

### Frontend

- **React 18** with TypeScript
- **React Router 6** for navigation
- **Tailwind CSS 3** for styling
- **Lucide React** for icons
- **Vite** for fast development and building

### Backend

- **Express.js 5** with TypeScript
- **Node.js** runtime
- **Mongoose** for MongoDB ODM (optional, included for production)

### Database

- **MongoDB** (optional, for production)
- **localStorage** (for demo/development)

## Project Structure

```
.
├── client/                    # React SPA frontend
│   ├── pages/                # Route pages
│   │   ├── Home.tsx
│   │   ├── CitizenLogin.tsx
│   │   ├── CouncillorLogin.tsx
│   │   ├── Signup.tsx
│   │   ├── CitizenDashboard.tsx
│   │   └── CouncillorDashboard.tsx
│   ├── i18n/                 # Internationalization
│   │   ├── translations.ts   # All language strings
│   │   └── LanguageContext.tsx
│   ├── data/                 # Static data
│   │   └── wards.ts          # Ward information
│   ├── components/           # Reusable components
│   ├── App.tsx               # Root component
│   └── global.css            # Global styles
│
├── server/                    # Express backend
│   ├── routes/               # API endpoints
│   │   ├── auth.ts           # Authentication
│   │   ├── reports.ts        # Report management
│   │   └── wards.ts          # Ward information
│   ├── models/               # MongoDB models (Mongoose)
│   │   ├── User.ts
│   │   ├── Ward.ts
│   │   └── Report.ts
│   ├── utils/                # Utilities
│   │   └── imageVerification.ts
│   └── index.ts              # Server entry point
│
├── shared/                   # Shared types
├── tailwind.config.ts        # Tailwind configuration
└── vite.config.ts            # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm or pnpm
- MongoDB (for production, optional for development)

### Installation

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Start development server**

   ```bash
   pnpm dev
   ```

   The app will be available at `http://localhost:5173`

### Building for Production

```bash
pnpm build
```

This creates optimized production builds in the `dist/` directory.

### Running Production Build

```bash
pnpm start
```

## Available Wards

The application includes 10 pre-configured Bengaluru wards:

1. **Hebbal** (North) - Suresh Kumar (BJP)
2. **Whitefield** (East) - Ravi Shankar (INC)
3. **Indiranagar** (East) - Priya Sharma (BJP)
4. **Basavangudi** (Central) - Mahesh Reddy (INC)
5. **Malleshwaram** (North) - Anita Desai (JDS)
6. **Koramangala** (South) - Vikram Singh (BJP)
7. **Jayanagar** (South) - Neelam Patel (INC)
8. **Rajajinagar** (West) - Deepak Nair (JDS)
9. **Bellandur** (East) - Sarah Khan (BJP)
10. **Yelahanka** (North) - Rajesh Verma (INC)

## Usage

### For Citizens

1. Visit the homepage
2. Click "Login as Citizen" or "Sign Up"
3. Select your ward
4. Report an issue by:
   - Providing a title
   - Selecting a problem category
   - Describing the issue
   - Uploading a photo
5. Track the status of your reports on the dashboard

### For Councillors

1. Visit the homepage
2. Click "Login as Councillor" or sign up as a councillor
3. Enter your ward details
4. Review pending reports from citizens
5. Verify or reject reports based on authenticity
6. Mark verified issues as resolved

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout

### Reports

- `POST /api/reports` - Create new report
- `GET /api/reports` - Get reports (with filtering)
- `GET /api/reports/:id` - Get specific report
- `PATCH /api/reports/:id/verify` - Verify a report
- `PATCH /api/reports/:id/resolve` - Mark as resolved
- `DELETE /api/reports/:id` - Delete a report

### Wards

- `GET /api/wards` - Get all wards
- `GET /api/wards/:id` - Get specific ward

## Environment Variables

Create a `.env` file in the root directory:

```env
# Optional: Add your own environment variables
VITE_API_URL=http://localhost:5173
```

## MongoDB Setup (Production)

To use MongoDB in production:

1. **Install MongoDB locally or use MongoDB Atlas**
   - Local: https://www.mongodb.com/try/download/community
   - Cloud: https://www.mongodb.com/cloud/atlas

2. **Update server/index.ts to connect MongoDB**:

   ```typescript
   import mongoose from "mongoose";

   mongoose.connect(
     process.env.MONGODB_URI || "mongodb://localhost:27017/fixmyward",
   );
   ```

3. **Update .env file**:

   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fixmyward
   ```

4. **Seed initial ward data** (optional):
   ```typescript
   import { Ward } from "./models/Ward";
   // Use the bengaluruWards data from server/routes/wards.ts
   ```

## Image Verification

The application includes a placeholder for AI-based image verification to detect:

- Fake or manipulated images
- Irrelevant content
- Image quality issues
- Content relevance to the reported category

To enable advanced verification, integrate with:

- **Google Cloud Vision API** for image analysis
- **AWS Rekognition** for object detection
- **Azure Computer Vision** for content analysis
- Custom ML models for ward-specific issue detection

Update `server/utils/imageVerification.ts` with your preferred service.

## Languages Supported

- **English** (en)
- **Hindi** (हिंदी) (hi)
- **Kannada** (ಕನ್ನಡ) (kn)

Language selection is persistent and stored in localStorage.

## Features in Development

- [ ] Real-time notifications
- [ ] Email notifications to councillors
- [ ] Advanced image verification using ML
- [ ] Mobile app (React Native)
- [ ] Social sharing of issues
- [ ] Issue trending and hotspots
- [ ] Integration with Bengaluru municipal services
- [ ] Video support for reports
- [ ] Advanced analytics dashboard

## Security Considerations

For production deployment:

1. **Authentication**: Implement JWT tokens with expiration
2. **Password**: Hash passwords using bcrypt
3. **HTTPS**: Use SSL/TLS certificates
4. **CORS**: Configure CORS properly
5. **Rate Limiting**: Implement rate limiting on API endpoints
6. **Input Validation**: Validate all user inputs
7. **Database**: Use MongoDB Atlas with network access controls
8. **File Upload**: Implement file size limits and virus scanning

## Troubleshooting

### Development Server Issues

- Clear node_modules and reinstall: `rm -rf node_modules pnpm-lock.yaml && pnpm install`
- Clear Vite cache: `rm -rf .vite`

### Build Issues

- Check Node version: `node --version` (should be 16+)
- Clear build cache: `rm -rf dist`

### Styling Issues

- Rebuild Tailwind CSS: The build process should handle this automatically
- Check `tailwind.config.ts` for proper content paths

## Deployment Options

### Netlify

1. Connect your GitHub repository
2. Set build command: `pnpm build`
3. Set publish directory: `dist`

### Vercel

1. Import your repository
2. Vercel auto-detects the build settings
3. Deploy automatically

### Docker

Create a `Dockerfile` for containerization:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Contact & Support

For support, issues, or questions:

- Create an issue on GitHub
- Contact the development team

## Acknowledgments

- Built with React, Express, and Tailwind CSS
- Icons by Lucide React
- Designed for Bengaluru, India

---

**Fix My Ward** - Making our communities better, one report at a time! 🏘️
