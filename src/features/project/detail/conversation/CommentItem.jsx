import React from 'react';

export default function CommentItem({username, content, authorType}) {
  // 작성자 유형에 따른 배경색 설정
  const getAuthorTypeStyle = () => {
    switch (authorType) {
      case 'DESIGNER':
        return 'bg-blue-100 text-blue-800';
      case 'BUSINESS_OWNER':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex items-center mb-[16px]">
        <img 
          src={username.profile} 
          alt={`${username.name} 프로필`} 
          className="w-6 h-6 rounded-full mr-[8px]"
          onError={(e) => {
            e.target.src = '/src/assets/images/default-profile-img.svg';
          }}
        />
        <div className="flex items-center gap-2">
          <div className="font-semibold">{username.name}</div>
          {authorType && (
            <span className={`px-2 py-1 text-xs rounded-full ${getAuthorTypeStyle()}`}>
              {authorType === 'DESIGNER' ? '디자이너' : 
               authorType === 'BUSINESS_OWNER' ? '소상공인' : '사용자'}
            </span>
          )}
        </div>
      </div>

      <div>
        <p className="text-gray-800">{content}</p>
      </div>
    </div>
  );
}
