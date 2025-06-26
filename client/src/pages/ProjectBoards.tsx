import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import CreateBoard from '../components/CreateBoard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderKanban, Users, Calendar, AlertTriangle } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import axios from 'axios';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

interface Board {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

const ProjectBoards = () => {
  const {user,  isAuthenticated} = useSelector((state: RootState) => state.auth);
  const [deleteBoard, setDeleteBoard] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/board`, {withCredentials: true})
        setBoards(res.data);
        setLoading(false);
       
      } catch (error) {
        console.error(error);
        console.log("Could not fetch board Details")
      }
    })()
  }, [deleteBoard])

   if(loading){
    return(
      <div className='flex justify-center items-center'>loading........</div>
    )
  }

  const handleCreateBoard = async (title: string, description: string) => {
    try {
        const response = await axios.post("http://localhost:3000/api/board",{title,description},{ withCredentials: true })
        console.log(response.data);
        console.log('creating a board', response);
        const newBoard: Board = {
        id: response.data.id,
        title: title,
        description: description,
        createdAt: response.data.createdAt
        };
        setBoards([...boards, newBoard]);
        toast.success("board created");
    } catch (error) {
        console.error(error);
        toast.success("board failed success");
        
    }
   
  };

  const handleDelete = async (boardId: string) => {
    setDeleteBoard(boardId);
      try {
        const res = await axios.delete(`http://localhost:3000/api/board/${boardId}`,{ withCredentials: true })
        console.log("board delete Successfully")
        
      } catch (error) {
        console.error(error)
      }
    setDeleteBoard(null);
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Project Boards
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage all your projects in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Create New Board Card */}
          <CreateBoard onCreateBoard={handleCreateBoard} />

          {/* Existing Boards */}
          {boards.map((board) => (
            <Card key={board.id} className="p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <FolderKanban className="w-5 h-5 text-blue-500" />
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {formatDate(board.createdAt)}
                    <div >
                      <Trash2 onClick={() => handleDelete(board.id)} className='size-5 hover:shadow-lg transition-shadow duration-200'/>
                    </div>
                  </div>
                </div>

                <div className="flex-1 mb-4">
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                    {board.title}
                  </h3>
                  {board.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {board.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span>3 members</span>
                  </div>
                  <Link to={`/board/${board.id}`}>
                    <Button size="sm" className='text-white hover:text-blue-400' variant="outline">
                      Open Board
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProjectBoards;