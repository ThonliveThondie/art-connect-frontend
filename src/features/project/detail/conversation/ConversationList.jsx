import React, {useState} from 'react';
import DraftPost from './DraftPost';
import CommentItem from './CommentItem';
import CommentInput from './CommentInput';

export default function ConversationList() {
  // 샘플 데이터
  const [conversations, setConversations] = useState([
    {
      id: 1,
      type: 'draft',
      username: {
        name: '박나리',
        profile: '/src/assets/images/default-profile-img.svg',
      },
      content: '첫 번째 시안을 업로드했습니다. 따뜻한 감성의 빈티지 스타일로 제작했습니다.',
      images: ['/src/assets/samples/image1.jpg', '/src/assets/samples/image2.jpg'],
    },
    {
      id: 2,
      type: 'comment',
      username: {
        name: '김철수',
        profile: '/src/assets/images/default-profile-img.svg',
      },
      content:
        '안녕하세요 :) 시안 잘 받아보았습니다! 전체적으로 너무 정성스럽게 작업해주셔서 감사드려요. 두 가지 안 중에서는 첫 번째 시안이 더 마음에 들어요. 전체적인 분위기나 컬러 조화가 가게 이미지와 잘 어울리는 것 같아요. 다만 몇 가지 수정 요청드리고 싶은 부분이 있어서 함께 전달드립니다: 가게 이름을 영문 버전(Pale Camel)으로 표기한 로고도 함께 확인해보고 싶습니다. 메뉴판 디자인에서 배경 색을 조금 더 밝게 조정해주시면 좋을 것 같아요. 로고 크기는 지금보다 살짝만 줄여주시면 더 균형이 맞을 것 같습니다. 메뉴 항목의 줄 맞춤이나 간격은 조금 더 깔끔하게 정리되면 좋겠어요. 전체적으로 정말 만족스럽고 정성이 느껴지는 시안이었습니다. 말씀드린 부분 반영해서 한번 더 수정 시안 확인해볼 수 있을까요? 감사합니다!',
    },
    {
      id: 3,
      type: 'comment',
      username: {
        name: '박나리',
        profile: '/src/assets/images/default-profile-img.svg',
      },
      content: '말씀드린 부분 반영해서 수정 시안 보내드리겠습니다 잠시만 기다려주세요!',
    },
    {
      id: 4,
      type: 'draft',
      username: {
        name: '박나리',
        profile: '/src/assets/images/default-profile-img.svg',
      },
      content: '두번째 시안입니다 요청해주신대로 배경색을 밝게 조정했고 로고 크기도 줄여서 피드백 사항을 반영했습니다',
      images: ['/src/assets/samples/image1.jpg', '/src/assets/samples/image2.jpg'],
    },
  ]);

  // 새 댓글 추가
  const addComment = (commentText) => {
    const text = (commentText || '').trim();
    if (!text) return;

    const newComment = {
      id: Date.now(),
      type: 'comment',
      username: {
        name: '박나리',
        profile: '/src/assets/images/default-profile-img.svg',
      },
      content: text,
    };

    setConversations((prev) => [...prev, newComment]);
  };

  return (
    <div className="w-full border border-black/20 rounded-[12px] px-[26px] py-[20px]">
      {/* 대화 목록 */}
      <div className="space-y-[30px]">
        {conversations.map((conversation) => (
          <div key={conversation.id}>
            {conversation.type === 'draft' ? (
              <DraftPost
                username={conversation.username}
                content={conversation.content}
                images={conversation.images || []}
              />
            ) : (
              <CommentItem username={conversation.username} content={conversation.content} />
            )}
          </div>
        ))}
      </div>

      {/* 댓글 입력 */}
      <div>
        <CommentInput onAddComment={addComment} />
      </div>
    </div>
  );
}
