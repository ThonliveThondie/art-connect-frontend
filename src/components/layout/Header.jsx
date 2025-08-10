import MessageIcon from '../../assets/icons/icon-message.svg?react';
import DefaultProfile from '../../assets/icons/default-profile.svg?react';

const Header = () => {
  return (
    <header className="h-[51px] px-[16px] py-[12px] ">
      {/* 오른쪽 정렬 : 프로필 이미지 + 메시지 아이콘 */}
      <div className="flex items-center justify-end gap-4">
        <div className="w-9 h-9 rounded-full border border-gray-200">
          <DefaultProfile />
        </div>
        <div>
          <MessageIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
