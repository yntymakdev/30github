'use client'

import {Chapter} from "@prisma/client";
import {useEffect, useState} from "react";
import {DragDropContext, Droppable} from "@hello-pangea/dnd";

interface  ChapterListFrom{
items: Chapter[];
onReorder: (updateData: { id:string;position:number }[]) => void;
onEdit: (id:string) => void;
}
export default function ChapterList ({items,onReorder,onEdit}:ChapterListFrom)  {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters,setChapters] = useState(items);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    setChapters(items);
  }, [items]);



  if(!isMounted){
    return null
  }
  return (
    <div>
      <DragDropContext onDragEnd={() => {}}/>
      <Droppable droppableId='chapters'>
        {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {chapters.map((chapter,index) => (
                  <Draggable key={chapter.id}
                  dra/>
              ))}
            </div>
        )}

      </Droppable>
    ChapterList
  
    </div>
  );
};


