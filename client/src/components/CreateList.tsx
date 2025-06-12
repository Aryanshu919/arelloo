import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';

interface CreateListProps {
  onCreateList: (titile: string) => void;
}
const CreateList:React.FC<CreateListProps> = ({onCreateList}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [list, setList] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("creating a list")
    if (list.trim()) {
      onCreateList(list);
      setList('');
      setIsCreating(false);
    }
  }

  if(!isCreating){
    return (<Button
            onClick={() => setIsCreating(true)}
            variant="ghost"
            className="w-72 h-12 text-white border-2 border-dashed border-muted-foreground/30 hover:text-blue-400 border-primary hover:bg-accent/50 transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add another list
          </Button>)
  }
  return (
    <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                id="list"
                value={list}
                onChange={(e) => setList(e.target.value)}
                placeholder="Enter list name"
                required
                autoFocus
              />
            </div>
            
    
            <div className="flex gap-2">
              <Button type="submit" size="sm">
                Add list
              </Button>
              <Button 
                className='text-white'
                type="button"
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setIsCreating(false);
                  setList("")
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
           
  )
}

export default CreateList