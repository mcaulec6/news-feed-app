#News feed app

Lightweight fullstack app for coding challenge with Storyful.

Users can:
- Register and sign in 
- Save keyword preferences
- View articles from NewsAPI.org based on keywords

# Tech
- Backend: Node.js, Typescript, Express, JWT Auth
- Frontend: React, Typescript, Tailwind
- API: News API
- Testing: Jest, Supertest, Nock

## Setup
Prereq:
- Node.js 20+
- NewsAPI.org API key -> visit (https://newsapi.org/), sign up and retrieve API key to insert into .env variables
Backend:
- cd backend
- npm install
- Enure .env is set up with correct variables. (View .env.example for ref)
- npm run dev
- backend runs on localhost:4000

Frontend:
- cd frontend
- npm install
- ensure .env is setup (View .env.example for ref)
npm run dev

Testing:
- cd backend
- npm test

## Assumptions
- User data and keywords are stored in memory and reset on server restart
- No refresh tokens, user must reauthenticate when JWT expires

## Keyword filtering
- Each authenticated user has a list of saved keywords.
- When articles are requested, the backend loads the user’s saved keywords and builds a NewsAPI query using an OR expression
- Example:
  ukraine OR election
- Fetches matching articles from NewsAPI’s everything endpoint
- The response is mapped to a simplified Article structure and returned to the frontend.
