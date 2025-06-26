import React, { useEffect, useState } from 'react'
import { CircleX } from 'lucide-react';
import axios from 'axios';
import { MessageSquareMore } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

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

const CardEditModal = ({isVisible, cardId , onClose}) => {

    const [card, setCard] = useState<Card>();

    console.log("logging the card : ", card);

    useEffect(() => {
    ;(async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/card/${cardId}`, {withCredentials: true})
          console.log("loggin the boards by id", res.data);
          setCard(res.data);  
      } catch (error) {
        console.error(error);
        console.log("Could not fetch board Details")
      }
    })()
  }, [])


  if(!isVisible) return null;

  return (
    <div className='absolute flex flex-col inset-0 top-40  max-w-2xl h-1/2 bg-gray-300 rounded-sm mx-auto border-4 border-gray-400'>
        <div onClick={() => onClose()} className='flex flex-row-reverse'>
           <CircleX className='pt-1'/>  
        </div>
        <div className='flex w-full'>
          <div className='basis-1/2 bg-gray-400'>
            <div className='ml-2'>
              <h2 className=' text-xl font-bold'>{card?.title}</h2>
            </div>
            <div className='flex gap-x-4 pt-4 ml-2'>
              <div>
                <h2>Members</h2>
              </div>
              <div>labers</div>
            </div>
          </div>
          <div className='basis-1/2 overflow-auto p-2'> 
          <div className='flex gap-x-2'>
            <MessageSquareMore/>
            <h2 className='text-base font-semibold '>Comments & activity</h2>
          </div>
            <div className='mt-2'>
              <form>
                <Input placeholder='Write a comment....' className='font-bold outline-neutral-500 border-2 border-gray-600'/>
                <Button type="submit" className='mt-2'>add</Button>
              </form>
            </div>
            <div className='mt-2'>
              All comments are here 
            </div>
     
          </div>
        
        </div>
    </div>  
  )
}

export default CardEditModal