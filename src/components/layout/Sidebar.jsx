import {NavLink} from 'react-router-dom';

import HomeIcon from '../../assets/icons/icon-home.svg?react';
import StoreIcon from '../../assets/icons/icon-store.svg?react';
import InProgressIcon from '../../assets/icons/icon-in-progress.svg?react';
import CompletedIcon from '../../assets/icons/icon-completed.svg?react';
import CreditCardIcon from '../../assets/icons/icon-credit-card.svg?react';
import UserIcon from '../../assets/icons/icon-user.svg?react';
import PortfolioIcon from '../../assets/icons/icon-portfolio.svg?react';
import PortfolioDetailIcon from '../../assets/icons/icon-portfolio-detail.svg?react';
import Logo from '../../assets/icons/logo.svg?react';

import '../common/style/icons.css';

// 아이콘 hover/active 공통
const itemBase = 'w-full flex items-center py-[8px] px-[16px] gap-[10px] rounded-[12px] transition';
const inactive = 'text-[#5F5E5B] text-[16px] leading-[24px]';
const active = 'bg-[#F1F0EF] text-black';

const items = (userType) =>
  userType === 'business'
    ? [
        {to: '/home-business', name: '홈', Icon: HomeIcon},
        {to: '/store-management', name: '매장 정보 관리', Icon: StoreIcon},
        {to: '/projects-list', name: '진행 중인 프로젝트', Icon: InProgressIcon},
        {to: '/completed-projects', name: '완료된 프로젝트', Icon: CompletedIcon},
        {to: '/payment-history', name: '결제 내역', Icon: CreditCardIcon},
        {to: '/profile-business', name: '내 정보', Icon: UserIcon},
      ]
    : [
        {to: '/home-artist', name: '홈', Icon: HomeIcon},
        {to: '/portfolio-artist', name: '내 포트폴리오', Icon: PortfolioIcon},
        {to: '/projects-list', name: '진행 중인 프로젝트', Icon: InProgressIcon},
        {to: '/completed-projects', name: '완료된 프로젝트', Icon: CompletedIcon},
        {to: '/revenue-history', name: '수입 내역', Icon: CreditCardIcon},
        {to: '/profile-artist', name: '내 정보', Icon: UserIcon},
      ];

export default function Sidebar({userType = 'business'}) {
  return (
    <aside className="w-[240px] bg-[#F8F7F6] border-r border-black/20 min-h-screen ">
      <Logo className="my-[12px] mx-[16px]" />
      <nav className="p-[8px] mt-[35px]">
        {items(userType).map(({to, name, Icon}) => (
          <NavLink key={to} to={to} end className={({isActive}) => `${itemBase} ${isActive ? active : inactive}`}>
            <span className="icon w-[24px] inline-flex justify-center">
              <Icon />
            </span>
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
