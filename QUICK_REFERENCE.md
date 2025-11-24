# Membership Submission System - Quick Reference Guide

## 🚀 Quick Start

**Start the server:**
```bash
npm run dev
```

**Visit these pages:**
- User Form: http://localhost:3000/membership
- Admin Dashboard: http://localhost:3000/admin-applications

---

## 📝 Form Fields

| Field | Required | Validation |
|-------|----------|------------|
| Full Name | ✅ Yes | Min 2 characters |
| Email | ✅ Yes | Valid email format |
| Phone | ❌ No | Valid phone format (if provided) |
| Profession | ❌ No | Free text |
| Category | ✅ Yes | From dropdown |
| Message | ❌ No | Free text |

---

## 💰 Membership Categories

| Category | Fee | Description |
|----------|-----|-------------|
| Student | Free | For medical students |
| Full Member | $20/year | Full membership benefits |
| Associate | $15/year | Associate membership |
| Honorary | By invitation | Honorary members only |

---

## 🔄 Application Status Flow

```
NEW APPLICATION
    ↓
PENDING (yellow)
    ↓
    ├─→ APPROVED (green) → Send payment instructions
    └─→ REJECTED (red) → Send rejection email
```

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `pages/membership.js` | User-facing form |
| `pages/api/apply.js` | Submit application API |
| `pages/api/applications.js` | Get applications API |
| `pages/admin-applications.js` | Admin dashboard |
| `data/applications.json` | Database file |

---

## 🎯 Common Tasks

### Submit Test Application
1. Go to http://localhost:3000/membership
2. Fill out form
3. Click "Submit Application"
4. Note the Application ID

### View All Applications
1. Go to http://localhost:3000/admin-applications
2. See statistics and list
3. Filter by status if needed

### Check Saved Data
Open: `data/applications.json`

### View Email Logs
Check server console (terminal where you ran `npm run dev`)

---

## 🔧 API Endpoints

### POST /api/apply
**Submit new application**

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "profession": "Cardiologist",
  "category": "Full Member",
  "message": "I want to join..."
}
```

Response (success):
```json
{
  "status": "ok",
  "message": "Application submitted successfully",
  "applicationId": "APP-20251123-ABC123"
}
```

### GET /api/applications
**Get all applications**

Response:
```json
{
  "status": "ok",
  "applications": [...],
  "count": 47
}
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Form won't submit | Check browser console for errors |
| Data not saving | Check `data/` folder permissions |
| Admin page empty | Submit a test application first |
| Server won't start | Run `npm install` first |

---

## 🔐 Security Notes

⚠️ **Before going live:**

1. Add authentication to admin dashboard
2. Implement rate limiting on API
3. Add CAPTCHA to form
4. Use environment variables for secrets
5. Upgrade from JSON to real database

---

## 📊 Application Object Structure

```javascript
{
  id: "APP-20251123-ABC123",    // Unique identifier
  name: "John Doe",              // Full name
  email: "john@example.com",     // Email address
  phone: "+1234567890",          // Phone (optional)
  profession: "Doctor",          // Profession (optional)
  category: "Full Member",       // Membership type
  message: "...",                // Application message
  status: "pending",             // pending|approved|rejected
  submittedAt: "2025-11-23...",  // ISO timestamp
  ipAddress: "123.456.789.0"     // Submitter IP
}
```

---

## 🎨 Customization Quick Tips

### Change Colors
Edit inline styles in `membership.js` and `admin-applications.js`

### Add Form Field
1. Add to `formData` state
2. Add input in JSX
3. Add validation (if needed)
4. Field auto-sent to API

### Change Categories
Update dropdown options in `membership.js`:
```javascript
<select name="category">
  <option value="Your Category">Your Category</option>
</select>
```

Update fees in `apply.js`:
```javascript
const fees = {
  'Your Category': 'Fee description'
};
```

---

## 📧 Email Integration Options

| Service | Difficulty | Free Tier |
|---------|-----------|-----------|
| Nodemailer | Medium | Yes (with Gmail) |
| SendGrid | Easy | 100 emails/day |
| Resend | Easy | 3000 emails/month |
| Mailgun | Easy | 5000 emails/month |

**Recommended for beginners:** Resend or SendGrid

---

## 🗄️ Database Options

| Database | Best For | Setup |
|----------|----------|-------|
| JSON File | Testing, Small sites | ✅ Already setup |
| MongoDB | Medium-Large sites | Easy, cloud available |
| PostgreSQL | Large, complex sites | Medium difficulty |
| MySQL | Traditional apps | Medium difficulty |

**Current:** JSON file (good for testing)
**For production:** MongoDB or PostgreSQL

---

## ✅ Pre-Launch Checklist

- [ ] Test form submission
- [ ] Check validation works
- [ ] Verify data saves correctly
- [ ] Test admin dashboard
- [ ] Configure email service
- [ ] Add authentication
- [ ] Set up real database
- [ ] Add rate limiting
- [ ] Test on mobile
- [ ] SSL certificate installed
- [ ] Environment variables set
- [ ] Backup strategy in place

---

## 📞 Need Help?

1. Read `MEMBERSHIP_DOCUMENTATION.md` for detailed info
2. Check browser console for frontend errors
3. Check server console for backend errors
4. Inspect `data/applications.json` for saved data
5. Test each component individually

---

## 🎓 Learning Resources

**Next.js API Routes:**
- https://nextjs.org/docs/api-routes/introduction

**React Forms:**
- https://react.dev/reference/react-dom/components/form

**Email Services:**
- Resend: https://resend.com/docs
- SendGrid: https://docs.sendgrid.com/

**Databases:**
- MongoDB: https://www.mongodb.com/docs/
- PostgreSQL: https://www.postgresql.org/docs/

---

**Last Updated:** November 23, 2025
**Version:** 1.0.0
