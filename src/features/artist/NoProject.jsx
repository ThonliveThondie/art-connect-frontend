import {useNavigate} from 'react-router-dom';

export default function NoProject() {
  const navigate = useNavigate();
  return (
    <div className="px-[140px] py-[50px] ">
      <h3 className="text-[18px] font-[600] w-40">새 프로젝트 제안</h3>
      <div
        className="m-auto flex flex-col items-center justify-center text-center 
      w-[610px] p-[10px] gap-[24px] mt-[42px]"
      >
        <h3 className="text-[24px] font-[600]">아직 제안받은 프로젝트가 없어요.</h3>
        <p className="text-[18px] text-black/40">
          소상공인 사장님의 마음을 사로잡을 멋진 포트폴리오를 준비해 보세요.
          <br />
          포트폴리오를 잘 작성해 두면, 사장님께 더 많은 제안을 받을 수 있어요!
        </p>
        <button
          type="button"
          onClick={() => navigate('/portfolio-artist')}
          className="px-[20px] py-[16px] w-[240px] h-[60px] mt-[40px] rounded-[8px] bg-[#9E9692] text-[20px] text-white"
        >
          포트폴리오 작성하기
        </button>
      </div>
    </div>
  );
}
