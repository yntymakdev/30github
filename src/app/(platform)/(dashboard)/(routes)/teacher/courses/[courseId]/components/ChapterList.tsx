'use client'

import {Chapter} from "@prisma/client";

interface  ChapterListFrom{
items: Chapter[];
onReorder: (updateData: { id:string;position:number }[]) => void;
onEdit: (id:string) => void;
}
export default function ChapterList ({items,onReorder,onEdit}:ChapterListFrom)  {
  return (
    <div>
    ChapterList
  
    </div>
  );
};


