import React from 'react';

export default function CompletedListCard({title, designerName}) {
  return (
    <div className="flex flex-col gap-[10px] w-full px-[26px] py-[20px] rounded-[13px] border border-black/10">
      <h4 className="text-[18px] font-[700]">{title}</h4>
      <div className="flex gap-1">
        <p>{designerName}</p>
        <span className="text-black/50">디자이너</span>
      </div>
    </div>
  );
}
