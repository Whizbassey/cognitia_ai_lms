# Cognitia - Real-time AI Teaching Platform

**An intelligent learning platform that creates personalized AI companions for interactive, voice-based education experiences.**

![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Supabase](https://img.shields.io/badge/Supabase-Database-green)
![Clerk](https://img.shields.io/badge/Clerk-Authentication-purple)
![VAPI](https://img.shields.io/badge/VAPI-Voice_AI-orange)

## 🚀 Overview

Cognitia is a sophisticated AI-powered learning management system that enables users to create and interact with personalized AI tutoring companions through real-time voice conversations. The platform combines modern web technologies with advanced AI services to deliver immersive educational experiences.

### 🎯 Key Features

- **AI Companion Builder**: Create custom AI tutors with personalized voices, subjects, and teaching styles
- **Real-time Voice Interaction**: Seamless voice conversations powered by VAPI AI and 11Labs
- **Dynamic Subject Management**: Support for multiple subjects (Math, Science, Language, Coding, History, Economics)
- **Session Tracking**: Comprehensive learning analytics and progress monitoring
- **User Authentication**: Secure authentication and subscription management via Clerk
- **Responsive Design**: Mobile-first design with Tailwind CSS

## 🏗️ Architecture & Tech Stack

### Frontend
- **Next.js 15.5.3** with App Router
- **React 19.1.0** with TypeScript
- **Tailwind CSS 4** for styling
- **Shadcn/UI** for component library
- **Lottie React** for animations

### Backend & AI Integration
- **VAPI AI** for voice conversation management
- **11Labs** for text-to-speech synthesis
- **OpenAI GPT-4** for intelligent tutoring responses
- **Deepgram Nova-3** for speech transcription

### Database & Authentication
- **Supabase** for PostgreSQL database and real-time features
- **Clerk** for user authentication and subscription management

### Monitoring & Analytics
- **Sentry** for error tracking and performance monitoring

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- Supabase account
- Clerk account
- VAPI AI API key
- Sentry account (optional)

### Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# VAPI AI
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_token

# Sentry (Optional)
SENTRY_DSN=your_sentry_dsn
```

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/cognitia.git
cd cognitia
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up database schema**
```sql
-- Companions table
CREATE TABLE companions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  voice TEXT NOT NULL,
  style TEXT NOT NULL,
  duration INTEGER NOT NULL,
  author TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Session history table
CREATE TABLE session_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  companion_id UUID REFERENCES companions(id),
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 Usage

### Creating AI Companions

1. Navigate to `/companions/new`
2. Fill out the companion details:
   - Name and subject area
   - Teaching topic and style (formal/casual)
   - Voice preference (male/female)
   - Session duration
3. Click "Build Your Companion"

### Starting Learning Sessions

1. Browse available companions on the homepage or `/companions`
2. Click "Launch Lesson" on any companion card
3. Click "Start Session" to begin voice interaction
4. Engage in real-time conversation with your AI tutor

### Managing Your Learning Journey

- View session history in `/my-journey`
- Track completed lessons and created companions
- Access personalized learning analytics

## 🔧 Key Components

### AI Integration (`lib/utils.ts`)
```typescript
export const configureAssistant = (voice: string, style: string) => {
  // Configures VAPI assistant with OpenAI GPT-4
  // Handles voice synthesis with 11Labs
  // Manages conversation context and flow
}
```

### Real-time Voice Component (`components/CompanionComponent.tsx`)
- Manages VAPI SDK integration
- Handles voice conversation state
- Real-time transcript display
- Session recording and analytics

### Database Actions (`lib/actions/companions.actions.ts`)
- Supabase integration for CRUD operations
- User session management
- Companion creation and retrieval
- Analytics data collection

## 📊 Database Schema

The application uses Supabase PostgreSQL with the following key tables:

- **companions**: Stores AI companion configurations
- **session_history**: Tracks user learning sessions
- **users**: Managed by Clerk authentication

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy with automatic CI/CD pipeline

### Manual Deployment

```bash
npm run build
npm start
```

## 🎯 AI Engineering Highlights

This project demonstrates key AI engineering competencies:

- **AI Service Integration**: Seamless integration of multiple AI services (VAPI, OpenAI, 11Labs)
- **Real-time AI Interactions**: Complex state management for live voice conversations
- **Prompt Engineering**: Sophisticated system prompts for educational contexts
- **AI Configuration Management**: Dynamic assistant configuration based on user preferences
- **Voice AI Optimization**: Fine-tuned voice parameters for natural conversation flow

## 📈 Performance & Monitoring

- **Error Tracking**: Comprehensive error monitoring with Sentry
- **Performance Optimization**: Next.js optimization with Turbopack
- **Real-time Updates**: Supabase real-time subscriptions
- **Analytics**: User engagement and session completion tracking

## 🛡️ Security Features

- **Authentication**: Secure user authentication via Clerk
- **API Security**: Protected API routes with authentication middleware
- **Data Validation**: Zod schema validation for all forms
- **Environment Security**: Secure environment variable handling

## 🔮 Future Enhancements

- [ ] Mobile application with React Native
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Group learning sessions
- [ ] Integration with educational APIs
- [ ] Custom AI model fine-tuning

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

**Your Name** - Wisdomemmanuelbassey@gmail.com

Project Link: https://github.com/Whizbassey/cognitia_ai_lms

---

*Built with passion for AI-driven education and modern web technologies.*
