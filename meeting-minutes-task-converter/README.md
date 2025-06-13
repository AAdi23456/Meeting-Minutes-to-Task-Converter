# AI Meeting Minutes to Task Converter

An AI-powered application that automatically extracts actionable tasks from meeting transcripts. Built with Next.js, TypeScript, and OpenAI's GPT API.

## Features

- 🤖 AI-powered task extraction from natural language
- 📋 Parse meeting transcripts into structured tasks
- 👥 Automatic assignee detection
- 📅 Due date parsing and formatting
- 🏷️ Priority level assignment (P1, P2, P3)
- 🎨 Clean, responsive UI with shadcn/ui components
- ✨ Real-time task updates
- 🔒 Secure API key handling

## Tech Stack

- **Frontend:**
  - Next.js 15.3
  - React 19
  - TypeScript
  - Tailwind CSS
  - shadcn/ui components
  - Day.js (date formatting)

- **Backend:**
  - Next.js API Routes
  - OpenAI GPT API
  - Zod (validation)

## Project Structure

```
meeting-minutes-task-converter/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── api/            # API routes
│   │   │   └── tasks/      # Task extraction endpoint
│   │   ├── page.tsx        # Main application page
│   │   └── layout.tsx      # Root layout
│   ├── components/         # React components
│   │   ├── transcript/     # Transcript input components
│   │   ├── tasks/         # Task display components
│   │   └── ui/            # shadcn/ui components
│   ├── lib/               # Utility functions
│   │   ├── openai.ts      # OpenAI API wrapper
│   │   └── utils.ts       # Helper functions
│   └── types/             # TypeScript types
├── public/                # Static assets
└── tests/                # Test files
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/meeting-minutes-task-converter.git
   cd meeting-minutes-task-converter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the project root:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Paste your meeting transcript into the input field
2. Click "Extract Tasks"
3. View the extracted tasks with their:
   - Description
   - Assignee
   - Due date
   - Priority level

Example transcript:
```
Aman you take the landing page by 10pm tomorrow. Rajeev you take care of client follow-up by Wednesday. Shreya please review the marketing deck tonight.
```

## API Endpoints

### POST /api/tasks
Extracts tasks from a meeting transcript.

Request body:
```json
{
  "transcript": "string"
}
```

Response:
```json
{
  "tasks": [
    {
      "id": "string",
      "description": "string",
      "assignee": "string",
      "dueDate": "string",
      "priority": "P1" | "P2" | "P3"
    }
  ]
}
```

## Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Development

The project uses:
- ESLint for code linting
- Prettier for code formatting
- Jest and React Testing Library for testing
- Tailwind CSS for styling
- shadcn/ui for UI components

## Security

- API keys are stored in environment variables
- OpenAI API calls are made server-side
- Input validation using Zod
- Type safety with TypeScript

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for the GPT API
- shadcn/ui for the beautiful components
- Next.js team for the amazing framework
