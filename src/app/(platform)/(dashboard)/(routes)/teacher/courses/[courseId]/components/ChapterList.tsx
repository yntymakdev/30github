'use client'

import {Chapter} from "@prisma/client";
import {useEffect, useState} from "react";
import {DragDropContext, Draggable, Droppable} from "@hello-pangea/dnd";
import {cn} from "@/lib/utils";
import {Grid} from "lucide-react";

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
                             draggableId={chapter.id}
                  index={index}
                  >
                    {(provided) => (
                        <div className={cn(
                            'flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm',
                            chapter.isPublished && 'bg-sky-100 border-sky-200 text-sky-700'
                        )}
                        ref={provided.innerRef}
                             {...provided.draggableProps}>
                           <div className={cn('px2 py-3 border-r-slate-200 hover:bg-slate-300 rounded-l-md transition',
                               chapter.isPublished &&'border-r-sky-200 hover:bg-sky-200'
                               )}

                                {...provided.dragHandleProps}

                           ><Grid className='h-5 w-5'/>
                           </div>
                          {chapter.title}
                          <div className='ml-auto pr-2 flex items gap-x-2'>
                            {chapter.isFree &&(
                                <Badge>
Free
                                </Badge>
                            )}
                            <Badge className={cn(
                                'bg-slate-500',
                                chapter.isPublished?"P"
                            )}></Badge>
                          </div>

                        </div>

                    )}


                  </Draggable>
              ))}
            </div>
        )}

      </Droppable>
    ChapterList
  
    </div>
  );
};


