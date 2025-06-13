import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';

// Validate request body
const RequestSchema = z.object({
  transcript: z.string().min(1, 'Transcript cannot be empty'),
});

// Validate task data
const TaskSchema = z.object({
  description: z.string().min(1, 'Description cannot be empty'),
  assignee: z.string().default('Unassigned'),
  dueDate: z.string().default('Unspecified'),
  priority: z.enum(['P1', 'P2', 'P3']).default('P3'),
});

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const { transcript } = RequestSchema.parse(body);

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that extracts tasks from meeting transcripts.',
        },
        {
          role: 'user',
          content: `
Extract tasks from this transcript. Format each task like this:
Task: [description]
Assigned To: [name]
Due Date: [natural language or date/time]
Priority: [P1–P3, default P3]

Transcript:
"""${transcript}"""
          `,
        },
      ],
      temperature: 0.3,
    });

    const content = response.choices[0]?.message?.content?.trim();

    if (!content) {
      return NextResponse.json(
        { error: 'No response from OpenAI' },
        { status: 500 }
      );
    }

    // Parse the response into tasks
    const taskBlocks = content
      .split(/(?:^|\n)Task:\s*/i)
      .map(block => block.trim())
      .filter(Boolean);

    const tasks = taskBlocks
      .map((block, index) => {
        try {
          const descriptionMatch = block.match(/^(.+?)(?=\nAssigned To:)/i);
          const assigneeMatch = block.match(/Assigned To:\s*(.+?)(?=\n|$)/i);
          const dueDateMatch = block.match(/Due Date:\s*(.+?)(?=\n|$)/i);
          const priorityMatch = block.match(/Priority:\s*(P1|P2|P3)/i);

          const description = descriptionMatch?.[1]?.trim() || '';
          const assignee = assigneeMatch?.[1]?.trim() || 'Unassigned';
          const dueDate = dueDateMatch?.[1]?.trim() || 'Unspecified';
          const priority = (priorityMatch?.[1]?.trim() || 'P3') as 'P1' | 'P2' | 'P3';

          if (!description) return null;

          const taskData = {
            id: `task-${Date.now()}-${index}`,
            description,
            assignee,
            dueDate,
            priority,
          };

          return TaskSchema.parse(taskData);
        } catch (err) {
          console.error('❌ Task block parsing error:', err);
          return null;
        }
      })
      .filter((task): task is NonNullable<typeof task> => task !== null);

    return NextResponse.json({ tasks });
  } catch (error) {
    console.error('❌ API Error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 