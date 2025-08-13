import DefaultProfile from '../../assets/icons/default-profile.svg?react';

const Header = () => {
  return (
    <header className="h-[51px] px-[16px] py-[12px] ">
      <div className="flex items-center justify-end gap-4">
        <div className="w-9 h-9 rounded-full border border-gray-200">
          <DefaultProfile />
        </div>
      </div>
    </header>
  );
};

export default Header;
