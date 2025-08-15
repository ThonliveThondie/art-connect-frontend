import {useNavigate} from 'react-router-dom';
import {ChevronLeft} from 'lucide-react';

export default function BackButton() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleGoBack}
      className="mb-[32px] flex items-center gap-[4px] text-[14px] text-black/50 hover:text-black"
    >
      <ChevronLeft size="14px" />
      돌아가기
    </button>
  );
}
