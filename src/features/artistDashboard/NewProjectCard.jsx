import AcceptButton from '../../components/common/buttons/AcceptButton';
import RejectButton from '../../components/common/buttons/RejectButton';

export default function NewProjectCard({title, location, price, onAccept, onReject}) {
  return (
    <>
      <div
        className="m-auto border border-black/10 rounded-[13px] 
  w-full min-w-[920px] h-[144px]
  px-[26px] py-[20px] 
  flex justify-between items-center"
      >
        <div className="flex flex-col gap-[10px]">
          <h4 className="font-[600] text-[18px]">{title}</h4>
          <p className="text-[16px] text-[#5F5E5B]">{location}</p>
          <p className="text-[16px]">예상 수익: {price.toLocaleString()} 원</p>
        </div>

        <div className="flex flex-col justify-between h-[92px]">
          <div className="flex items-center justify-end gap-[10px]">
            <AcceptButton onClick={onAccept} />
            <RejectButton onClick={onReject} />
          </div>
          <button className="text-[16px] text-black/50 underline hover:text-black">작업 의뢰서 보기</button>
        </div>
      </div>
    </>
  );
}
