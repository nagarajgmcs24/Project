# Fix My Ward - Testing & Deployment Guide

## Testing the Application

### Manual Testing Checklist

#### Home Page
- [ ] Page loads correctly
- [ ] Language selector works (English, Hindi, Kannada)
- [ ] Features section displays all 3 feature cards
- [ ] "Login as Citizen" button navigates to citizen login
- [ ] "Login as Councillor" button navigates to councillor login
- [ ] "Sign Up" link navigates to signup page

#### Citizen Login
- [ ] Form validation works (error messages for missing fields)
- [ ] Ward dropdown shows all 10 Bengaluru wards
- [ ] Login button submits form correctly
- [ ] Successful login redirects to citizen dashboard
- [ ] "Login as Councillor" link works

#### Councillor Login
- [ ] Form validation works
- [ ] Ward dropdown shows all 10 Bengaluru wards
- [ ] Login button submits form correctly
- [ ] Successful login redirects to councillor dashboard
- [ ] "Login as Citizen" link works

#### Sign Up Page
- [ ] All form fields are present
- [ ] Password confirmation validation works
- [ ] Role selection (Citizen/Councillor) works
- [ ] Ward selection works
- [ ] Sign up button creates account
- [ ] Successful signup redirects to appropriate dashboard

#### Citizen Dashboard
- [ ] Ward information displays correctly
- [ ] Statistics show correct counts
- [ ] "Report Issue" button opens modal
- [ ] Photo upload works
- [ ] Form validation works
- [ ] Submitted reports appear in the list
- [ ] Report status badges display correctly
- [ ] Logout button clears localStorage and redirects to home

#### Councillor Dashboard
- [ ] Ward information displays correctly
- [ ] Statistics show correct counts
- [ ] Tabs (Pending, Verified, All) filter reports correctly
- [ ] Clicking verify button opens verification modal
- [ ] Verification notes can be added
- [ ] Reports can be approved/rejected
- [ ] Reports can be marked as resolved
- [ ] Status updates reflect in the list

### Browser Compatibility Testing

Test on:
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Responsive Design Testing

- [ ] Mobile (< 640px): All layouts stack correctly
- [ ] Tablet (640px - 1024px): Layouts adapt properly
- [ ] Desktop (> 1024px): Multi-column layouts display

### Language Testing

Test each language:
- [ ] English (en) - All text in English
- [ ] Hindi (hi) - All text translated to Hindi
- [ ] Kannada (kn) - All text translated to Kannada

Language persistence:
- [ ] Selected language persists across page reloads
- [ ] Language selector updates UI immediately

### Form Validation Testing

#### Login Form
```javascript
// Test cases
- Empty username → "Please enter your username"
- Empty email → "Please enter your email"
- Empty password → "Please enter your password"
- No ward selected → "Please select your ward"
```

#### Signup Form
```javascript
// Test cases
- Empty fields → Appropriate error messages
- Password mismatch → "Passwords do not match"
- Duplicate username/email → "User already exists"
```

#### Report Form
```javascript
// Test cases
- Empty title → "Please fill all fields"
- No category → "Please select a problem category"
- Empty description → "Please describe the problem"
- No photo uploaded → "Please upload a photo"
```

## API Testing

### Using cURL

```bash
# Test ping endpoint
curl http://localhost:5173/api/ping

# Test user login
curl -X POST http://localhost:5173/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password",
    "ward": "ward_1",
    "role": "citizen"
  }'

# Test ward retrieval
curl http://localhost:5173/api/wards

# Test report creation
curl -X POST http://localhost:5173/api/reports \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "wardId": "ward_1",
    "title": "Broken Road",
    "category": "road-damage",
    "description": "Main street has large pothole",
    "photoUrl": "data:image/jpeg;base64,...",
    "userName": "John Doe",
    "userPhone": "+91 9876543210"
  }'
```

### Using Postman

1. Create a new Postman collection
2. Add requests for all API endpoints
3. Set up environment variables for API base URL
4. Test each endpoint with various inputs

## Performance Testing

### Load Testing
- Use tools like Apache JMeter or k6
- Test with 100+ concurrent users
- Monitor response times and error rates

### Lighthouse Audit
```bash
# Run Lighthouse audit
# In Chrome DevTools: Ctrl+Shift+J → Right-click → Inspect → Lighthouse tab
```

Target scores:
- Performance: > 80
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

## Security Testing

### OWASP Top 10 Checks

- [ ] SQL Injection - Not applicable (no SQL used)
- [ ] Cross-Site Scripting (XSS) - Verify React escapes user input
- [ ] Cross-Site Request Forgery (CSRF) - Add CSRF tokens for production
- [ ] Broken Authentication - Implement proper JWT
- [ ] Sensitive Data Exposure - Use HTTPS in production
- [ ] XML External Entities (XXE) - Not applicable
- [ ] Broken Access Control - Check route protection
- [ ] Security Misconfiguration - Review CORS settings
- [ ] Insecure Deserialization - Review data parsing
- [ ] Using Components with Known Vulnerabilities - Run `npm audit`

### Input Validation Testing
```javascript
// Test malicious inputs
- "<script>alert('xss')</script>"
- "'; DROP TABLE users; --"
- "../../etc/passwd"
- Very long strings (1000+ characters)
- Special characters and unicode
```

## Deployment Testing

### Pre-Deployment Checklist

- [ ] All tests pass
- [ ] No console errors or warnings
- [ ] Build completes without errors
- [ ] Environment variables configured
- [ ] Database connection works (if using MongoDB)
- [ ] SSL/TLS certificate ready
- [ ] Backup strategy in place
- [ ] Rollback plan documented

### Staging Deployment
1. Deploy to staging environment
2. Run full test suite
3. Perform smoke tests
4. Get stakeholder approval

### Production Deployment
1. Deploy during low-traffic period
2. Monitor error rates and performance
3. Keep rollback plan ready
4. Gradual rollout (if possible)

## Deployment Guides

### Deploying to Netlify

1. **Connect Repository**
   - Go to https://netlify.com
   - Click "New site from Git"
   - Select your GitHub repository

2. **Configure Build Settings**
   - Build command: `pnpm build`
   - Publish directory: `dist`
   - Node version: 18.x

3. **Environment Variables**
   - Set any required environment variables in Netlify dashboard

4. **Deploy**
   - Netlify automatically deploys on push to main branch

### Deploying to Vercel

1. **Import Project**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your Git repository

2. **Configure Project**
   - Framework: Vite
   - Build command: auto-detected
   - Output directory: auto-detected

3. **Deploy**
   - Vercel automatically deploys

### Deploying to Docker

1. **Create Dockerfile**
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

2. **Build Image**
```bash
docker build -t fixmyward:latest .
```

3. **Run Container**
```bash
docker run -p 3000:3000 fixmyward:latest
```

### Deploying to AWS

1. **Using Amplify**
   - Connect GitHub repository
   - Configure build settings
   - Auto-deploy on push

2. **Using EC2**
   - Launch EC2 instance
   - Install Node.js and pnpm
   - Clone repository
   - Run `pnpm install && pnpm build && pnpm start`
   - Configure Nginx as reverse proxy

### Deploying to Google Cloud Platform

1. **Using Cloud Run**
   - Containerize application
   - Push image to Container Registry
   - Deploy to Cloud Run

2. **Using App Engine**
   - Create `app.yaml` configuration
   - Deploy with `gcloud app deploy`

## Monitoring & Logging

### Application Monitoring

- [ ] Set up error tracking (Sentry, Rollbar)
- [ ] Monitor uptime (StatusPage, Pingdom)
- [ ] Track performance metrics (New Relic, DataDog)

### Logging Setup

```javascript
// Server-side logging
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Use logger in routes
logger.info('User login attempt', { userId, timestamp });
```

### Client-side Error Tracking

```javascript
// Sentry integration
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: process.env.NODE_ENV,
});
```

## Backup & Recovery

### Database Backups

For MongoDB:
```bash
# Backup
mongodump --uri "mongodb+srv://user:pass@cluster.mongodb.net/fixmyward" --out ./backup

# Restore
mongorestore --uri "mongodb+srv://user:pass@cluster.mongodb.net/fixmyward" ./backup/fixmyward
```

### File Backups

- Automated daily backups
- Keep 30-day history
- Test restore procedures monthly

## Performance Optimization

### Frontend Optimization
- [ ] Code splitting implemented
- [ ] Images optimized and lazy-loaded
- [ ] CSS minified
- [ ] JavaScript minified and tree-shaken
- [ ] Caching headers configured

### Backend Optimization
- [ ] Database indexes created
- [ ] Query optimization done
- [ ] Caching implemented (Redis)
- [ ] Compression enabled (gzip)
- [ ] Load balancing configured

## Rollback Procedure

If issues occur after deployment:

1. **Identify Issue**
   - Check error logs
   - Review metrics
   - Gather user reports

2. **Decide on Rollback**
   - Critical issues → immediate rollback
   - Minor issues → hotfix

3. **Execute Rollback**
   ```bash
   # For Git-based deployments
   git revert <commit-hash>
   git push origin main
   
   # For Docker
   docker run -p 3000:3000 fixmyward:previous-version
   ```

4. **Post-Rollback**
   - Verify services are operational
   - Notify stakeholders
   - Post-mortem meeting

## Continuous Integration/Deployment

### GitHub Actions Example

```yaml
name: Deploy to Netlify

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm run build
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## Support & Maintenance

### Regular Maintenance Tasks
- [ ] Update dependencies monthly
- [ ] Security patches within 24 hours
- [ ] Database optimization
- [ ] Log cleanup
- [ ] Performance review

### Support Channels
- GitHub Issues for bugs
- Email for critical issues
- Discord/Slack for community support

---

**Remember**: Always test thoroughly before deploying to production!
