# Supabase Scripts Guide

This document provides instructions for using the Supabase scripts in your project.

## Prerequisites

1. **Install Supabase CLI** (if not already installed):
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase**:
   ```bash
   supabase login
   ```

## Available Scripts

### 🚀 **Setup & Configuration**

```bash
# Initialize Supabase and link to your project
npm run supabase:setup

# Check Supabase status
npm run supabase:status
```

**Note**: The `supabase:setup` script will initialize Supabase and automatically link to the project with ID `raqkxeahwupzhuyfnsew`.

### 🗄️ **Database Management**

```bash
# Start local Supabase instance
npm run supabase:start

# Stop local Supabase instance
npm run supabase:stop

# Push database changes to remote
npm run supabase:db:push

# View database differences
npm run supabase:db:diff

# Reset local database
npm run supabase:reset

# Create new migration
npm run supabase:migration:new
```

### ⚡ **Edge Functions**

```bash
# Deploy all functions to production
npm run supabase:functions:deploy:all

# Deploy specific function (from supabase/functions directory)
npm run supabase:functions:deploy

# List all deployed functions
npm run supabase:functions:list

# View function logs
npm run supabase:functions:logs

# View specific function logs
npm run supabase:functions:logs:contact
```

### 🚀 **Deployment**

```bash
# Build and deploy everything
npm run supabase:deploy
```

### 🧪 **Testing**

```bash
# Test the contact email function
npm run supabase:test:contact
```

## Step-by-Step Usage

### 1. **Initial Setup**
```bash
# First time setup
npm run supabase:setup
```

### 2. **Local Development**
```bash
# Start local Supabase
npm run supabase:start

# Make changes to your functions
# Test locally at http://localhost:54321

# Stop when done
npm run supabase:stop
```

### 3. **Database Changes**
```bash
# Create a new migration
npm run supabase:migration:new add_phone_column

# Apply changes to remote database
npm run supabase:db:push
```

### 4. **Deploy Functions**
```bash
# Deploy all functions to production
npm run supabase:functions:deploy:all

# Or deploy specific function
cd supabase/functions/send-contact-email
npm run supabase:functions:deploy
```

### 5. **Monitor & Debug**
```bash
# Check function logs
npm run supabase:functions:logs:contact

# Test the deployed function
npm run supabase:test:contact
```

## Environment Variables

Make sure you have these environment variables set in your Supabase project:

- `RESEND_API_KEY` - For email sending
- `SUPABASE_URL` - Your project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key

## Troubleshooting

### Common Issues

1. **"Not logged in" error**:
   ```bash
   supabase login
   ```

2. **"Project not linked" error**:
   ```bash
   supabase link --project-ref raqkxeahwupzhuyfnsew
   ```

3. **Function deployment fails**:
   ```bash
   # Check logs
   npm run supabase:functions:logs:contact
   
   # Redeploy
   npm run supabase:functions:deploy:all
   ```

4. **Database migration issues**:
   ```bash
   # Reset local database
   npm run supabase:reset
   
   # Push changes again
   npm run supabase:db:push
   ```

## Project Reference

- **Project ID**: `raqkxeahwupzhuyfnsew`
- **Project URL**: `https://raqkxeahwupzhuyfnsew.supabase.co`
- **Functions URL**: `https://raqkxeahwupzhuyfnsew.supabase.co/functions/v1/`

## Project Structure

```
supabase/
├── functions/
│   └── send-contact-email/    # Contact form email function
├── migrations/                # Database migration files
└── config.toml               # Supabase configuration
```

The project includes:
- **Contact Form Function**: Handles contact form submissions via email
- **Database Migrations**: Manages database schema changes
- **Local Development**: Full local Supabase instance for development

## Quick Commands Reference

| Command | Description |
|---------|-------------|
| `npm run supabase:start` | Start local development |
| `npm run supabase:deploy` | Build & deploy everything |
| `npm run supabase:test:contact` | Test contact function |
| `npm run supabase:functions:logs:contact` | View contact function logs |
| `npm run supabase:db:push` | Push database changes |
