import React from 'react';

export default function StatusBadge({status = 'pending', className = ''}) {
  const STATUS = {
    pending: {dot: 'bg-[#F59E0B]', text: '시안 제출 대기 중'},
    reviewing: {dot: 'bg-[#3B82F6]', text: '피드백 대기 중'},
    done: {dot: 'bg-[#10B981]', text: '피드백 전달 완료'},
  };

  const current = STATUS[status] ?? STATUS.pending;

  return (
    <span
      className={[
        'inline-flex items-center rounded-full bg-[#F1F0EF]/70',
        'px-[10px] py-[4px] gap-[10px] font-[600] text-[14px]',
        className,
      ].join(' ')}
      role="status"
    >
      <span className={['inline-block rounded-full w-[10px] h-[10px]', current.dot].join(' ')} />
      <span>{current.text}</span>
    </span>
  );
}
