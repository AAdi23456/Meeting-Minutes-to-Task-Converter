import { render, screen } from '@testing-library/react';
import { TaskCard } from '../TaskCard';
import { Task } from '@/types/task';

// Mock the formatDueDate function
jest.mock('@/lib/utils', () => ({
  formatDueDate: jest.fn((date) => `Formatted: ${date}`),
  cn: jest.fn((...args) => args.join(' ')),
}));

describe('TaskCard', () => {
  const mockTask: Task = {
    id: 'task-123',
    description: 'Complete project documentation',
    assignee: 'John Doe',
    dueDate: 'Tomorrow',
    priority: 'P2',
  };

  it('renders task details correctly', () => {
    render(<TaskCard task={mockTask} />);

    // Check if task description is rendered
    expect(screen.getByText('Complete project documentation')).toBeInTheDocument();

    // Check if assignee is rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();

    // Check if formatted due date is rendered
    expect(screen.getByText('Formatted: Tomorrow')).toBeInTheDocument();

    // Check if priority badge is rendered
    expect(screen.getByText('P2')).toBeInTheDocument();
  });

  it('applies correct priority color class', () => {
    render(<TaskCard task={mockTask} />);
    
    // Priority P2 should have yellow styling
    const priorityBadge = screen.getByText('P2');
    expect(priorityBadge.className).toContain('bg-yellow-100');
    expect(priorityBadge.className).toContain('text-yellow-700');
  });
}); 