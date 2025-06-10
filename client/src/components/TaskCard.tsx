
import React from 'react';
import { Calendar, MessageSquare, Paperclip } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TaskCardProps {
  card: {
    id: string;
    title: string;
    description?: string;
    labels: string[];
    dueDate?: string;
  };
}

const TaskCard: React.FC<TaskCardProps> = ({ card }) => {
  const getLabelColor = (label: string) => {
    const colors: { [key: string]: string } = {
      'Design': 'bg-purple-100 text-purple-800 hover:bg-purple-200',
      'Development': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      'Backend': 'bg-green-100 text-green-800 hover:bg-green-200',
      'Documentation': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
      'Research': 'bg-orange-100 text-orange-800 hover:bg-orange-200',
      'Review': 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
      'Critical': 'bg-red-100 text-red-800 hover:bg-red-200',
      'High Priority': 'bg-red-100 text-red-800 hover:bg-red-200',
      'Setup': 'bg-gray-100 text-gray-800 hover:bg-gray-200',
      'HR': 'bg-pink-100 text-pink-800 hover:bg-pink-200',
    };
    return colors[label] || 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Card className="p-3 bg-background border border-border hover:shadow-md transition-all duration-200 cursor-pointer group">
      <div className="space-y-3">
        {/* Labels */}
        {card.labels.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {card.labels.map((label, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={`text-xs px-2 py-1 ${getLabelColor(label)} border-0`}
              >
                {label}
              </Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <h4 className="text-sm font-medium text-foreground leading-snug group-hover:text-blue-600 transition-colors">
          {card.title}
        </h4>

        {/* Description */}
        {card.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {card.description}
          </p>
        )}

        {/* Footer with icons and due date */}
        <div className="flex items-center justify-between text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs">
              <MessageSquare className="w-3 h-3" />
              <span>2</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <Paperclip className="w-3 h-3" />
              <span>1</span>
            </div>
          </div>
          
          {card.dueDate && (
            <div className="flex items-center gap-1 text-xs">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(card.dueDate)}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
