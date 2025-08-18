import React from 'react';

export default function CommentItem({username, content}) {
  return (
    <div>
      <div className="flex items-center mb-[16px]">
        <img src={username.profile} alt={`${username.name} 프로필`} className="w-6 h-6 rounded-full mr-[8px]" />
        <div>
          <div className="font-semibold">{username.name}</div>
        </div>
      </div>

      <div>
        <p>{content}</p>
      </div>
    </div>
  );
}
