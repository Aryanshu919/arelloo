import { useEffect, useState } from 'react'
import { CircleX } from 'lucide-react';
import axios from 'axios';
import { MessageSquareMore } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
// import { toast } from 'sonner';
import { NotebookText } from 'lucide-react';

interface Card {
  id: string;
  title: string;
  listId: string;
  description?: string;
  labels: string[];
  comments: string[];
  members: string[];
  dueDate?: string;
}

interface Comment {
  id: string;
  content: string;
  cardId: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
  };
}

type CardEditModalProps = {
  isVisible: boolean;
  cardId: string;
  onClose: () => void;
};

const CardEditModal: React.FC<CardEditModalProps> = ({ isVisible, cardId, onClose }) => {

    const [card, setCard] = useState<Card>();
    const [comments, setComments] = useState<Comment[]>([]);
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(true);
    // const [description, setDescription] = useState<string | null>(null);
    const [isDesEditing, setIsDesEditing] = useState(false);
    const [tempDescription, setTempDescription] = useState(card?.description || '');

    const { user } = useSelector((state: RootState) => state.auth);
    

    useEffect(() => {
    ;(async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/card/${cardId}`, {withCredentials: true})
        const commentRes = await axios.get(`http://localhost:3000/api/comments/card/${cardId}`, {withCredentials: true})
          setCard(res.data);  
          setComments(commentRes.data);
          console.log("logging the comment response", commentRes.data);
          setLoading(false)
      } catch (error) {
        console.error(error);
        console.log("Could not fetch board Details")
      }
    })()
  }, [loading, content])
  
  const handleAddComment = async () => {
    console.log("adding comment ")
    console.log(user)
   try {
     if(user){
      const authorId = user.id
      const res = await axios.post(`http://localhost:3000/api/comments`,{content, cardId, authorId }, {withCredentials: true});
      console.log("comment created", res)
      // toast.success("comment created successfully");
      setContent("")
    }
    
   } catch (error) {
      console.error(error)
    
   }
     
  }

  const handleDescription = async () => {
    try {
      const res = await axios.patch(`http://localhost:3000/api/card/${cardId}`, { description: tempDescription } , { withCredentials: true})
      console.log(res)
      console.log("description" , tempDescription)
      // setTempDescription(card?.description);
      
    } catch (error) {
      console.error(error)
    }
      setIsDesEditing(false)
      
  }

  if(!isVisible) return null;

  return(
    <div className="absolute inset-0 top-40 mx-auto max-w-3xl h-[60vh] bg-white rounded-2xl border border-gray-300 shadow-xl overflow-hidden flex flex-col">
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <CircleX
          className="w-6 h-6 cursor-pointer hover:text-red-500 transition"
          onClick={onClose}
        />
      </div>

      {loading ? (
        <div className="w-full text-center text-lg font-medium text-gray-500">
          Loading...
        </div>
      ) : (
        <div className="flex flex-1 px-6 pb-6 gap-6 overflow-hidden">
          {/* Left Panel */}
          <div className="w-1/2 space-y-6 overflow-y-auto pr-2">
            {/* Title */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{card?.title}</h2>
            </div>

            {/* Description */}
             <div className="flex items-center gap-2 text-gray-700">
                <NotebookText className="w-5 h-5" />
                <h3 className="text-xl font-semibold">Description</h3>
             </div>
            {
              (card?.description === null || isDesEditing || card?.description === "") ?
              <div>
                            <div>
              <div className="mt-2">
                <textarea
                  value={tempDescription}
                   onChange={(e) => setTempDescription(e.target.value)}
                  className="ml-4 w-[90%] h-40 resize-none p-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Add a description..."
                ></textarea>
              </div>
              <Button onClick={handleDescription} className="mt-3 w-full">Save</Button>
            </div>
              </div>  : <div className='flex justify-between mx-1'>
                <div>{card?.description}</div>
                <div>
                  <Button 
                  size="sm"
                  onClick={()=> setIsDesEditing(true)}
                  className='text-white '>
                    edit</Button></div>
              </div>
            }

          </div>

          {/* Right Panel */}
          <div className="w-1/2 flex flex-col overflow-hidden">
            {/* Comments Header */}
            <div className="flex items-center gap-2 text-gray-700">
              <MessageSquareMore className="w-5 h-5" />
              <h3 className="text-base font-semibold">Comments & Activity</h3>
            </div>

            {/* Add Comment Input */}
            <div className="mt-3">
              <Input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write a comment..."
                className="border border-gray-400"
              />
              <Button onClick={handleAddComment} className="mt-2 w-full">
                Add Comment
              </Button>
            </div>

            {/* Comments List */}
            <div className="mt-4 overflow-y-auto space-y-3 pr-1 max-h-56">
              {comments?.map((comment, index) => (
                <div key={index} className="bg-gray-100 p-3 rounded-lg shadow-sm">
                  <p className="text-gray-800">{comment?.content}</p>
                  <span className="text-xs text-gray-500 italic">
                    Commented by: {comment?.author?.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardEditModal