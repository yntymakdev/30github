'use client'

import {Chapter} from "@prisma/client";
import {useEffect, useState} from "react";
import {Droppable} from "@hello-pangea/dnd";

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
      <Droppable droppableId={} items={items}
    ChapterList
  
    </div>
  );
};


