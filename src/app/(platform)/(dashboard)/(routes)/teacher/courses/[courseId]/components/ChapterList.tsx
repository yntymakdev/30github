'use client'

import {Chapter} from "@prisma/client";
import {useState} from "react";

interface  ChapterListFrom{
items: Chapter[];
onReorder: (updateData: { id:string;position:number }[]) => void;
onEdit: (id:string) => void;
}
export default function ChapterList ({items,onReorder,onEdit}:ChapterListFrom)  {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters,setChapters] = useState(items);

  return (
    <div>
    ChapterList
  
    </div>
  );
};


