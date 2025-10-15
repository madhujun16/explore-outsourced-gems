# NovalSquad Outsourcing - Expert Business Process Outsourcing Services

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in your deployment.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/your-username/explore-outsourced-gems.git

# Step 2: Navigate to the project directory.
cd explore-outsourced-gems

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React 18** - Modern React with hooks and concurrent features
- **shadcn/ui** - Beautiful, accessible UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase** - Backend-as-a-Service (Database, Auth, Edge Functions)
- **React Router** - Client-side routing
- **i18next** - Internationalization support
- **Lottie React** - Animation support
- **React Hook Form** - Form handling with validation

## Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build in development mode
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Supabase Integration
```bash
npm run supabase:setup                    # Initialize and link Supabase project
npm run supabase:start                    # Start local Supabase instance
npm run supabase:stop                     # Stop local Supabase instance
npm run supabase:db:push                  # Push database changes to remote
npm run supabase:functions:deploy:all     # Deploy all edge functions
npm run supabase:deploy                   # Build and deploy everything
```

For detailed Supabase usage, see [SUPABASE_SCRIPTS.md](./SUPABASE_SCRIPTS.md).

## Environment Setup

### Prerequisites
- Node.js 18+ and npm
- Supabase CLI (for backend development)
- Git

### Environment Variables
Create a `.env.local` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Setup
1. Install Supabase CLI: `npm install -g supabase`
2. Login: `supabase login`
3. Initialize: `npm run supabase:setup`

## How can I deploy this project?

You can deploy this project using various platforms:

### Vercel (Recommended)
```sh
npm install -g vercel
vercel
```

### Netlify
```sh
npm run build
# Upload the dist folder to Netlify
```

### GitHub Pages
```sh
npm run build
# Configure GitHub Actions for automatic deployment
```

## Can I connect a custom domain to my project?

Yes, you can!

To connect a domain:
1. Deploy your project to your preferred hosting platform
2. Navigate to your hosting platform's domain settings
3. Add your custom domain (e.g., novalsquad.com)
4. Configure DNS settings as required by your hosting provider

## Contact

For any questions or support, contact us at contact@novalsquad.com
