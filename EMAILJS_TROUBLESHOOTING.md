# EmailJS Troubleshooting Guide

## 🔧 Fixed Issues

I've updated your EmailJS implementation to fix the email sending issues. Here's what was changed:

### 1. **Updated EmailJS API Usage**
- Changed from `emailjs.sendForm()` to `emailjs.send()` (modern API)
- Added proper template parameters structure
- Improved error handling with specific error codes

### 2. **Environment Variables Support**
- Added support for environment variables
- Created `env.example` file with template
- Fallback to hardcoded values if env vars not set

### 3. **Better Error Handling**
- Specific error messages for different HTTP status codes
- Clear user feedback with emojis and formatting
- Automatic clipboard copy of email as fallback

### 4. **Debug Information**
- Added development-only debug panel
- Shows current EmailJS configuration
- Helps identify configuration issues

## 🚀 How to Fix Your EmailJS Setup

### Step 1: Check Your EmailJS Dashboard
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Verify your service is active
3. Check your template configuration
4. Ensure your user ID is correct

### Step 2: Update Your Credentials
1. Copy `env.example` to `.env.local`
2. Update the values with your actual EmailJS credentials:
   ```
   VITE_EMAILJS_SERVICE_ID=your_actual_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
   VITE_EMAILJS_USER_ID=your_actual_user_id
   ```

### Step 3: Verify Template Variables
Your EmailJS template should include these variables:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{message}}` - Message content
- `{{to_name}}` - Your name (Aadithyan)
- `{{reply_to}}` - Reply-to email

### Step 4: Test the Configuration
1. Run your app in development mode
2. Check the debug panel at the bottom of the contact form
3. Verify all credentials are showing correctly
4. Test sending an email

## 🐛 Common Issues & Solutions

### Issue: "EmailJS authentication failed"
**Solution:** Check your User ID in the EmailJS dashboard

### Issue: "Service not found"
**Solution:** Verify your Service ID is correct

### Issue: "Template not found"
**Solution:** Check your Template ID and ensure the template is published

### Issue: "Too many requests"
**Solution:** You've hit the rate limit, wait a few minutes and try again

### Issue: Emails not being received
**Solution:** 
1. Check your spam folder
2. Verify the template is configured correctly
3. Check EmailJS logs in the dashboard

## 📧 Fallback Contact Methods

If EmailJS continues to fail, users can:
1. **Direct Email:** adithyanas2694@gmail.com (auto-copied to clipboard)
2. **Phone:** +91 8848673615
3. **LinkedIn:** https://www.linkedin.com/in/aadithyanas
4. **GitHub:** https://github.com/Aadithyanas

## 🔍 Debug Information

In development mode, you'll see a debug panel showing:
- Current Service ID
- Current Template ID  
- Whether User ID is set
- Troubleshooting tips

## 📝 Next Steps

1. Update your `.env.local` file with correct credentials
2. Test the contact form
3. Check the debug panel for any issues
4. If still having problems, check the EmailJS dashboard logs

The updated code should now provide much better error messages and help you identify exactly what's wrong with your EmailJS configuration.
