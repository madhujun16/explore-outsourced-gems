#!/bin/bash

# Supabase Deployment Script
# This script builds and deploys your Supabase functions

echo "🚀 Starting Supabase deployment..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Please install it first:"
    echo "npm install -g supabase"
    exit 1
fi

# Check if logged in
if ! supabase status &> /dev/null; then
    echo "❌ Not logged in to Supabase. Please run:"
    echo "supabase login"
    exit 1
fi

echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "🗄️ Pushing database changes..."
supabase db push --project-ref raqkxeahwupzhuyfnsew

echo "⚡ Deploying functions..."
supabase functions deploy --project-ref raqkxeahwupzhuyfnsew

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🌐 Your functions are available at:"
    echo "   https://raqkxeahwupzhuyfnsew.supabase.co/functions/v1/"
    echo ""
    echo "🧪 Test your contact function:"
    echo "   npm run supabase:test:contact"
else
    echo "❌ Deployment failed!"
    exit 1
fi
