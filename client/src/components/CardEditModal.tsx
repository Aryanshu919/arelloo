import React, { useEffect, useState } from 'react'
import { CircleX } from 'lucide-react';
import axios from 'axios';

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

    const [card, setCard] = useState<Card[]>([]);

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
    <div className='absolute flex justify-center inset-0 top-40 left-96 items-center w-2xl h-1/2 bg-gray-300 rounded-sm'>
        <div onClick={() => onClose()} className='absolute top-0 right-0 bg-gray-300 rounded-sm'>
            <CircleX className='pt-1'/>
            <div></div>
        </div>
    </div>
  )
}

export default CardEditModal