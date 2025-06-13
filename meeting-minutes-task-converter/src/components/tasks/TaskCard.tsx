'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/types/task';
import { formatDueDate } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  // Get the appropriate color for priority
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P1':
        return 'bg-red-100 text-red-700 hover:bg-red-100';
      case 'P2':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'P3':
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-base line-clamp-2">{task.description}</h3>
          <Badge className={`ml-2 ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <span className="font-medium mr-2">Assigned to:</span>
            <Badge variant="outline">{task.assignee}</Badge>
          </div>
          <div className="flex items-center text-sm">
            <span className="font-medium mr-2">Due:</span>
            <span className="text-gray-600">{formatDueDate(task.dueDate)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 