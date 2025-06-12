
import React, { useEffect, useState } from 'react';
import { Plus, MoreHorizontal, Calendar, MessageSquare, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CreateBoard from './CreateBoard';
import axios from 'axios';
import CreateList from './CreateList';
import { useParams } from 'react-router-dom';

interface TaskCard {
  id: string;
  title: string;
  description?: string;
  labels: string[];
  dueDate?: string;
}

interface Column {
  id: string;
  title: string;
  cards: TaskCard[];
}

interface ProjectBoardProps {
  boardId: string;
  boardName: string;
}

const ProjectBoard: React.FC<ProjectBoardProps> = ({ boardId, boardName }) => {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: 'To Do',
      cards: [
        {
          id: '1',
          title: 'Design new landing page',
          description: 'Create wireframes and mockups for the new homepage',
          labels: ['Design', 'High Priority'],
          dueDate: '2024-06-15'
        },
        {
          id: '2',
          title: 'Set up project repository',
          labels: ['Development'],
        }
      ]
    },
  ]);

    useEffect(() => {
    ;(async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/list/board/${boardId}`, {withCredentials: true})
          console.log("loggin the boards by id", res.data);
          setColumns([...columns, res.data]);
          console.log("logging the columns", columns);

          const formattedColumns: Column[] = res.data.map((list: any) => ({
          id: list.id,
          title: list.title,
          cards: list.cards.map((card : any) => ({
            id: card.id,
            title: card.title,
            description: card.description,
            labels: card.labels || [],
            dueDate: card.dueDate || null,
          })),
        }));
        setColumns(formattedColumns);
       
      } catch (error) {
        console.error(error);
        console.log("Could not fetch board Details")
      }
    })()
  }, [])


  const [isAddingCard, setIsAddingCard] = useState<string | null>(null);
  const [newCardTitle, setNewCardTitle] = useState('');
  const addColumn = async (title: string) => {
 
    try {
      const order = Math.floor(Math.random() * 10001);;
      const res = await axios.post("http://localhost:3000/api/list",{title, order, boardId},{ withCredentials: true });
      const newColumn: Column = {
      id: res.data.id,
      title: res.data.title,
      cards: res.data.cards
    };
      setColumns([...columns, newColumn]);
      //  console.log("logging the list response", res)
    } catch (error) {
      console.error(error);
      console.log("error while creating new list");
    }
  
    
  };

  const addCard = (columnId: string) => {
    if (newCardTitle.trim()) {
      const newCard: TaskCard = {
        id: `card-${Date.now()}`,
        title: newCardTitle,
        labels: []
      };

      setColumns(prev => prev.map(col => 
        col.id === columnId 
          ? { ...col, cards: [...col.cards, newCard] }
          : col
      ));

      setNewCardTitle('');
      setIsAddingCard(null);
    }
  };

  const getLabelColor = (label: string) => {
    const colors: { [key: string]: string } = {
      'Design': 'bg-purple-100 text-purple-800',
      'Development': 'bg-blue-100 text-blue-800',
      'Backend': 'bg-green-100 text-green-800',
      'High Priority': 'bg-red-100 text-red-800',
      'Setup': 'bg-gray-100 text-gray-800',
    };
    return colors[label] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-foreground mb-2">{boardName}</h2>
        <p className="text-muted-foreground">Organize your tasks and track progress</p>
      </div>
      
      <div className="flex gap-6 overflow-x-auto pb-6">
        {columns?.map((column) => (
          <div key={column.id} className="flex-shrink-0 w-72">
            <Card className="bg-card border border-border shadow-sm">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">{column.title}</h3>
                  <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-accent text-blue-400">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-3 mb-4">
                  {column?.cards.map((card) => (
                    <Card key={card.id} className="p-3 bg-background border border-border hover:shadow-md transition-all duration-200 cursor-pointer group">
                      <div className="space-y-3">
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

                        <h4 className="text-sm font-medium text-foreground leading-snug group-hover:text-blue-600 transition-colors">
                          {card.title}
                        </h4>

                        {card.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {card.description}
                          </p>
                        )}

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
                  ))}
                </div>

                {isAddingCard === column.id ? (
                  <div className="space-y-2">
                    <textarea
                      value={newCardTitle}
                      onChange={(e) => setNewCardTitle(e.target.value)}
                      placeholder="Enter a title for this card..."
                      className="w-full p-3 border border-input rounded-lg resize-none text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <Button onClick={() => addCard(column.id)} size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Add card
                      </Button>
                      <Button 
                        onClick={() => {
                          setIsAddingCard(null);
                          setNewCardTitle('');
                        }}
                        className='text-white hover:text-blue-400'
                        variant="ghost" 
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={() => setIsAddingCard(column.id)}
                    variant="ghost"
                    className="w-full text-white justify-start hover:bg-accent hover:text-foreground transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2 text-white" />
                    Add a card
                  </Button>
                )}
              </div>
            </Card>
          </div>
        ))}
        
        <div className="flex-shrink-0">
          {/* <Button
            onClick={addColumn}
            variant="ghost"
            className="w-72 h-12 text-white border-2 border-dashed border-muted-foreground/30 hover:text-blue-400 border-primary hover:bg-accent/50 transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add another list
          </Button> */}
          <CreateList onCreateList={addColumn}/>
        </div>
      </div>
    </div>
  );
};

export default ProjectBoard;
