# TaskFlow - Modern Task Management Application

A powerful, secure task management application built with React, TypeScript, and Supabase. TaskFlow helps you organize your life with intuitive task creation, priority management, and progress tracking.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Features

- 🔐 **Secure Authentication** - User registration and login with Supabase Auth
- ✅ **Complete CRUD Operations** - Create, read, update, and delete tasks
- 🎯 **Priority Management** - Organize tasks with low, medium, and high priority levels
- 📊 **Progress Tracking** - Visual dashboard with completion statistics
- 🔄 **Task Status Management** - Move tasks between To Do and Completed states
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🎨 **Modern UI/UX** - Clean, intuitive interface with smooth animations
- 🔒 **Data Privacy** - Users can only access their own tasks
- ⚡ **Real-time Updates** - Instant synchronization across all views
- 🌈 **Visual Indicators** - Color-coded priority levels and status icons

## Demo

🌐 **Live Demo**: [https://astonishing-crostata-a55dbb.netlify.app](https://astonishing-crostata-a55dbb.netlify.app)

### Screenshots

The application features:
- **Dashboard**: Overview with statistics and task management
- **To Do Page**: Focused view of pending tasks with priority breakdown
- **Completed Page**: Progress tracking and completed task management
- **Authentication**: Secure login and registration system

## Installation

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- Supabase account (for database and authentication)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd taskflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Run the database migrations (see Configuration section)

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in your Supabase credentials in the `.env` file

5. **Start the development server**
   ```bash
   npm run dev
   ```

## Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Setup

The application includes SQL migrations in the `supabase/migrations/` directory. These will create:

- **todos table**: Stores all task data with user association
- **Row Level Security (RLS)**: Ensures users can only access their own tasks
- **Indexes**: Optimized for performance on common queries
- **Triggers**: Automatic timestamp updates

To apply migrations:
1. Install Supabase CLI
2. Run `supabase db push` to apply migrations to your project

### Database Schema

```sql
CREATE TABLE todos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text DEFAULT '',
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

## Usage

### Getting Started

1. **Register an Account**
   - Visit the application and click "Sign Up"
   - Enter your email and password (minimum 6 characters)
   - You'll be automatically logged in after registration

2. **Create Your First Task**
   - Navigate to the Dashboard
   - Fill out the "Create New Task" form
   - Set a title, optional description, and priority level
   - Click "Create Task"

3. **Manage Tasks**
   - **Mark Complete**: Click the circle icon next to any task
   - **Edit Task**: Click the edit icon to modify title, description, or priority
   - **Delete Task**: Click the trash icon (with confirmation)
   - **Move Back**: Use the rotate icon on completed tasks to move them back to To Do

### Navigation

- **Dashboard**: Overview with statistics and task creation
- **To Do**: View all pending tasks organized by priority
- **Completed**: View completed tasks with progress tracking

### Priority Levels

- 🔴 **High Priority**: Urgent tasks that need immediate attention
- 🟡 **Medium Priority**: Important tasks with moderate urgency
- 🟢 **Low Priority**: Tasks that can be completed when time allows

## Project Structure

```
src/
├── components/           # React components
│   ├── CreateTodoForm.tsx   # Task creation form
│   ├── TodoList.tsx         # Task list display
│   ├── TodoItem.tsx         # Individual task component
│   ├── TodoDashboard.tsx    # Main dashboard view
│   ├── TodoPage.tsx         # To Do page
│   ├── CompletedPage.tsx    # Completed tasks page
│   ├── Navigation.tsx       # App navigation
│   ├── Home.tsx            # Landing page
│   ├── Login.tsx           # Login form
│   ├── SignUp.tsx          # Registration form
│   └── PrivateRoute.tsx    # Route protection
├── context/              # React context providers
│   ├── AuthContext.tsx     # Authentication state management
│   └── TodoContext.tsx     # Todo state management
├── types/               # TypeScript type definitions
│   ├── auth.ts             # Authentication types
│   └── todo.ts             # Todo-related types
├── utils/               # Utility functions
│   └── validation.ts       # Form validation helpers
├── lib/                 # External service configurations
│   └── supabase.ts         # Supabase client setup
└── main.tsx            # Application entry point
```

## Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide React for consistent iconography
- **Routing**: React Router DOM for navigation
- **Backend**: Supabase (PostgreSQL database + Authentication)
- **Build Tool**: Vite for fast development and building
- **Deployment**: Netlify for hosting

## API Reference

### Todo Operations

The application uses Supabase client for all database operations:

```typescript
// Create a new todo
const { data, error } = await supabase
  .from('todos')
  .insert([{ title, description, priority, user_id }]);

// Update a todo
const { data, error } = await supabase
  .from('todos')
  .update({ completed: true })
  .eq('id', todoId);

// Delete a todo
const { error } = await supabase
  .from('todos')
  .delete()
  .eq('id', todoId);
```

## Contributing

We welcome contributions to TaskFlow! Here's how you can help:

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features when applicable
- Update documentation for any new functionality
- Ensure all existing tests pass before submitting

### Code Style

- Use TypeScript for all new code
- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling
- Maintain component modularity and reusability

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

### Getting Help

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs or request features via GitHub Issues
- **Discussions**: Join community discussions for questions and ideas

### Common Issues

**Authentication Problems**
- Ensure Supabase environment variables are correctly set
- Check that email confirmation is disabled in Supabase Auth settings

**Database Connection Issues**
- Verify your Supabase project URL and keys
- Ensure RLS policies are properly configured
- Check that migrations have been applied

**Build/Deployment Issues**
- Ensure all environment variables are set in your deployment platform
- Check that the build command completes without errors

### Performance Tips

- The application is optimized for performance with proper indexing
- Tasks are loaded efficiently with user-specific queries
- Real-time updates minimize unnecessary re-renders

---

**Built with ❤️ using React, TypeScript, and Supabase**

*TaskFlow - Organize Your Life, One Task at a Time*