import React, {useState, useEffect} from 'react';
import DraftPost from './DraftPost';
import CommentItem from './CommentItem';
import CommentInput from './CommentInput';

export default function ConversationList({submissions = [], workRequestId, onUpdate}) {
  // API 데이터를 기반으로 대화 목록 생성
  const [conversations, setConversations] = useState([]);

  // submissions 데이터를 대화 목록으로 변환
  useEffect(() => {
    const convertedConversations = [];
    
    submissions.forEach((submission) => {
      // 시안 게시물 추가
      convertedConversations.push({
        id: `submission-${submission.id}`,
        type: 'draft',
        username: {
          name: submission.designerName,
          profile: submission.designerProfileImageUrl || '/src/assets/images/default-profile-img.svg',
        },
        content: submission.comment,
        images: submission.images?.map(img => img.imageUrl) || [],
        createdAt: submission.createdAt,
      });

      // 피드백 댓글들 추가
      if (submission.feedbacks && submission.feedbacks.length > 0) {
        submission.feedbacks.forEach((feedback) => {
          convertedConversations.push({
            id: `feedback-${feedback.id}`,
            type: 'comment',
            username: {
              name: feedback.authorName || '사용자', // API 응답의 authorName 사용
              profile: feedback.imageUrl || '/src/assets/images/default-profile-img.svg', // API 응답의 imageUrl 사용
            },
            content: feedback.content,
            createdAt: feedback.createdAt,
            authorType: feedback.authorType, // 작성자 유형 추가
          });
        });
      }
    });

    // 생성일자 순으로 정렬
    convertedConversations.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    
    setConversations(convertedConversations);
  }, [submissions]);

  // 새 댓글 추가 (피드백 작성)
  const addComment = async (commentText) => {
    const text = (commentText || '').trim();
    if (!text) return;

    // workSubmissionId가 없으면 로컬 상태만 업데이트
    if (!submissions.length) {
      const newComment = {
        id: `temp-${Date.now()}`,
        type: 'comment',
        username: {
          name: '사용자',
          profile: '/src/assets/images/default-profile-img.svg',
        },
        content: text,
        createdAt: new Date().toISOString(),
      };

      setConversations((prev) => [...prev, newComment]);
      return;
    }

    // workSubmissionId가 있으면 API 호출 (CommentInput에서 처리됨)
    // 여기서는 로컬 상태만 업데이트
    const newComment = {
      id: `temp-${Date.now()}`,
      type: 'comment',
      username: {
        name: '사용자',
        profile: '/src/assets/images/default-profile-img.svg',
      },
      content: text,
      createdAt: new Date().toISOString(),
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
              <CommentItem 
                username={conversation.username} 
                content={conversation.content} 
                authorType={conversation.authorType}
              />
            )}
          </div>
        ))}
      </div>

      {/* 댓글 입력 */}
      <div>
        <CommentInput 
          onAddComment={addComment} 
          workSubmissionId={submissions.length > 0 ? submissions[submissions.length - 1]?.id : null}
          onFeedbackSuccess={onUpdate}
          submissions={submissions}
        />
      </div>
    </div>
  );
}
