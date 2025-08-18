import React, {useState} from 'react';
import SendBtnActive from '@/assets/images/send-btn-active.svg';
import SendBtnDefault from '@/assets/images/send-btn-default.svg';

export default function CommentInput({onAddComment}) {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (comment.trim()) {
      onAddComment(comment.trim());
      setComment('');
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

        <button type="button" className="self-end" disabled={!comment.trim()} onClick={handleSubmit}>
          <img src={comment.trim() ? SendBtnActive : SendBtnDefault} alt="댓글 작성" />
        </button>
      </div>
    </>
  );
}
