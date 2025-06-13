'use client';

import { useState } from 'react';
import { TranscriptInput } from '@/components/transcript/TranscriptInput';
import { TaskList } from '@/components/tasks/TaskList';
import { Task } from '@/types/task';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleTasksExtracted = (extractedTasks: Task[]) => {
    setTasks(extractedTasks);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Meeting Minutes to Task Converter</h1>
        <p className="text-gray-600">
          Extract tasks from meeting transcripts automatically using AI.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        <TranscriptInput onTasksExtracted={handleTasksExtracted} />
        
        {tasks.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Extracted Tasks</h2>
            <TaskList tasks={tasks} />
          </div>
        )}
      </div>
    </div>
  );
}
