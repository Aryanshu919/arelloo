
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import ProjectBoard from '../components/ProjectBoard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings, Share2, MoreHorizontal } from 'lucide-react';

const ProjectBoardView = () => {
  const { boardId } = useParams();
  
  // In a real app, you'd fetch the board data based on the ID
  const boardName = getBoardName(boardId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        {/* Board Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link to="/boards">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Boards
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Project Board Component */}
        <ProjectBoard boardId={boardId || ''} boardName={boardName} />
      </main>
    </div>
  );
};

// Helper function to get board name (in a real app, this would come from your data store)
const getBoardName = (boardId: string | undefined): string => {
  const boards: { [key: string]: string } = {
    '1': 'Website Redesign',
    '2': 'Mobile App Development'
  };
  return boards[boardId || ''] || 'Project Board';
};

export default ProjectBoardView;
