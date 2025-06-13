import { Task } from '@/types/task';

/**
 * Extracts structured tasks from a raw meeting transcript using the backend API.
 * @param transcript Full text of the meeting notes
 */
export async function parseTranscript(transcript: string): Promise<Task[]> {
  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transcript }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to parse transcript');
    }

    const data = await response.json();
    console.log('[Parsed Tasks]:', data.tasks);
    return data.tasks;
  } catch (error) {
    console.error('❌ Error parsing transcript:', error);
    throw error;
  }
}
