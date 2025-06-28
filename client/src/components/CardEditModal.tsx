import React, { useEffect, useState } from 'react'
import { CircleX } from 'lucide-react';
import axios from 'axios';
import { MessageSquareMore } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { toast } from 'sonner';
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

const CardEditModal = ({isVisible, cardId , onClose}) => {

    const [card, setCard] = useState<Card>();
      const [comments, setComments] = useState<Comment[]>([]);
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(true);

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
  }, [content])
  
  const handleAddComment = async () => {
    console.log("adding comment ")
    console.log(user)
   try {
     if(user){
      const authorId = user.id
      const res = await axios.post(`http://localhost:3000/api/comment`,{content, cardId, authorId }, {withCredentials: true});
      console.log("comment created", res)
      toast.success("comment created successfully");
      setContent("")
    }
    
   } catch (error) {
      console.error(error)
    
   }
     
  }

  if(!isVisible) return null;

  return (
    <div className='absolute flex flex-col inset-0 top-40  max-w-2xl h-1/2 bg-gray-300 rounded-sm mx-auto border-4 border-gray-400'>
        <div onClick={() => onClose()} className='flex flex-row-reverse'>
           <CircleX className='pt-1'/>  
        </div>
        {
          loading ? (<div className='w-full text-center'> Loading.... </div>) : (
                    <div className='flex w-full'>
          <div className='basis-1/2 p-1.5'>
            <div className='ml-2'>
              <h2 className=' text-2xl font-bold'>{card?.title}</h2>
            </div>
            <div className='flex gap-1 items-center ml-2 mt-2'>
              <NotebookText/>
              <h2 className='font-semibold text-xl'>Description</h2>
            </div>
            <div>
              
            </div>
            
          </div>
          <div className='basis-1/2 overflow-auto p-2'> 
          <div className='flex gap-x-2'>
            <MessageSquareMore/>
            <h2 className='text-base font-semibold '>Comments & activity</h2>
          </div>
            <div className='mt-2'>
                <Input value={content} onChange={(e) => setContent(e.target.value)} placeholder='Write a comment....' className='outline-neutral-500 border-2 border-gray-600'/>
                <Button onClick={handleAddComment} className='mt-2'>add</Button>
            </div>
            <div className='overflow-scroll max-h-[200px] '>
             <ul>
              {
                comments?.map((comment, index) =>(
                    <div key={index}>
                     <li className='bg-blue-100 mt-1 p-2 rounded-lg' >{comment?.content}</li>
                     <span className='italic'>comment added by : {comment?.author?.name}</span>
                  </div>
                ) )
              }
             </ul>
            </div>
     
          </div>
        
        </div>
          )
        }

    </div>  
  )
}

export default CardEditModal