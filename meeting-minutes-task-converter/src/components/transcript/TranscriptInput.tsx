'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { parseTranscript } from '@/lib/openai';
import { Task } from '@/types/task';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface TranscriptInputProps {
  onTasksExtracted: (tasks: Task[]) => void;
}

type APIError = {
  message?: string;
  code?: string;
  status?: number;
};

export function TranscriptInput({ onTasksExtracted }: TranscriptInputProps) {
  const [transcript, setTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExtractTasks = async () => {
    if (!transcript.trim()) {
      setError('Please enter a meeting transcript to parse.');
      return;
    }

    setIsLoading(true);
    setError(null);


    try {
      const tasks = await parseTranscript(transcript);
      console.log(tasks);
      if (tasks.length === 0) {
        setError('No tasks were found in the transcript. Try a different transcript or check your OpenAI API key.');
        return;
      }
      
      onTasksExtracted(tasks);
    } catch (err: unknown) {
      console.error('Error extracting tasks:', err);
      
      const error = err as APIError;
      
      // Handle specific error types
      if (error.message?.includes('API key')) {
        setError('Invalid or missing OpenAI API key. Please add your API key to the .env.local file.');
      } else if (error.message?.includes('network')) {
        setError('Network error. Please check your internet connection and try again.');
      } else {
        setError(`Failed to extract tasks: ${error.message || 'Unknown error'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Meeting Transcript Parser</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Textarea
          placeholder="Paste your meeting transcript here. For example: 'Aman you take the landing page by 10pm tomorrow. Rajeev you take care of client follow-up by Wednesday.'"
          className="min-h-[200px] mb-4"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
        />
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleExtractTasks} 
          disabled={isLoading || !transcript.trim()}
          className="w-full"
        >
          {isLoading ? 'Extracting Tasks...' : 'Extract Tasks'}
        </Button>
      </CardFooter>
    </Card>
  );
} 