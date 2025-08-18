import React from 'react';
import MySwiper from '@/components/common/swiper/MySwiper';

export default function DraftPost({username, content, images}) {
  return (
    <div>
      {/* 작성자 정보 */}
      <div className="flex items-center mb-4">
        <img src={username.profile} alt={`${username.name} 프로필`} className="w-6 h-6 rounded-full mr-3" />
        <div>
          <div className="font-semibold text-gray-900">{username.name}</div>
        </div>
      </div>

      {/* 시안 내용 */}
      <div className="mb-4">
        <p className="text-gray-800 leading-relaxed">{content}</p>
      </div>

      {/* 이미지 스와이퍼 */}
      {images && images.length > 0 && (
        <div className="mb-4 w-full">
          <MySwiper images={images} />
        </div>
      )}
    </div>
  );
}
