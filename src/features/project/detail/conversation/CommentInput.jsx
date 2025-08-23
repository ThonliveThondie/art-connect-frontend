import React, {useState} from 'react';
import SendBtnActive from '@/assets/images/send-btn-active.svg';
import SendBtnDefault from '@/assets/images/send-btn-default.svg';
import {submitFeedback} from '@/api/work-request/workRequest';

export default function CommentInput({onAddComment, workSubmissionId, onFeedbackSuccess, submissions = []}) {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 가장 최근 submission의 ID를 자동으로 사용
  const latestSubmissionId = submissions.length > 0 ? submissions[submissions.length - 1]?.id : workSubmissionId;

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    
    if (!latestSubmissionId) {
      // latestSubmissionId가 없으면 기존 방식으로 처리
      onAddComment(comment.trim());
      setComment('');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 피드백 작성 API 호출
      await submitFeedback(latestSubmissionId, {
        content: comment.trim()
      });
      
      // 성공 시 콜백 호출
      if (onFeedbackSuccess) {
        onFeedbackSuccess();
      }
      
      // 입력 필드 초기화
      setComment('');
    } catch (error) {
      console.error('피드백 작성 실패:', error);
      alert('피드백 작성에 실패했습니다: ' + (error.message || '알 수 없는 오류'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && comment.trim()) {
      handleSubmit();
    }
  };

  return (
    <>
      <p className="font-[600] text-black/50 mb-[10px] px-[10px]">피드백 작성</p>
      
      <div className="flex items-end w-full rounded-[12px] px-[26px] py-[20px] gap-[10px] border border-black/20">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onInput={(e) => {
            e.target.style.height = '24px';
            e.target.style.height = e.target.scrollHeight + 'px'; // 내용에 맞게 높이 조절
          }}
          onKeyPress={handleKeyPress}
          className="flex-1 w-full text-[16px] outline-none resize-none overflow-hidden"
          rows={1}
        />

        <button 
          type="button" 
          className="self-end" 
          disabled={!comment.trim() || isSubmitting || !latestSubmissionId} 
          onClick={handleSubmit}
        >
          <img 
            src={comment.trim() && !isSubmitting && latestSubmissionId ? SendBtnActive : SendBtnDefault} 
            alt="댓글 작성" 
          />
        </button>
      </div>
    </>
  );
}
