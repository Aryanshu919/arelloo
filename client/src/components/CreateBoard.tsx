import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';

interface CreateBoardProps {
  onCreateBoard: (boardName: string, boardDescription: string) => void;
}

const CreateBoard: React.FC<CreateBoardProps> = ({ onCreateBoard }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [boardDescription, setBoardDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (boardName.trim()) {
      onCreateBoard(boardName, boardDescription);
      setBoardName('');
      setBoardDescription('');
      setIsCreating(false);
    }
  };

  if (!isCreating) {
    return (
      <Card 
        className="p-6 border-2 border-dashed border-muted-foreground/30 hover:border-primary hover:bg-accent/50 transition-all duration-200 cursor-pointer"
        onClick={() => setIsCreating(true)}
      >
        <div className="flex flex-col items-center text-center">
          <Plus className="w-8 h-8 text-muted-foreground mb-2" />
          <h3 className="font-semibold text-foreground mb-1">Create new board</h3>
          <p className="text-sm text-muted-foreground">Start organizing your project</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="boardName">Board Name</Label>
          <Input
            id="boardName"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            placeholder="Enter board name"
            required
            autoFocus
          />
        </div>
        
        <div>
          <Label htmlFor="boardDescription">Description (Optional)</Label>
          <Input
            id="boardDescription"
            value={boardDescription}
            onChange={(e) => setBoardDescription(e.target.value)}
            placeholder="Enter board description"
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit" size="sm">
            Create Board
          </Button>
          <Button 
            type="button"
            variant="ghost" 
            size="sm"
            onClick={() => {
              setIsCreating(false);
              setBoardName('');
              setBoardDescription('');
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CreateBoard;