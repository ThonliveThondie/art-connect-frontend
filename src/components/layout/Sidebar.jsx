import {NavLink} from 'react-router-dom';
import {useStore} from '@/store/useStore';

import StoreIcon from '../../assets/icons/icon-store.svg?react';
import InProgressIcon from '../../assets/icons/icon-in-progress.svg?react';
import CompletedIcon from '../../assets/icons/icon-completed.svg?react';
import CreditCardIcon from '../../assets/icons/icon-credit-card.svg?react';
import UserIcon from '../../assets/icons/icon-user.svg?react';
import PortfolioIcon from '../../assets/icons/icon-portfolio.svg?react';
import AIICon from '../../assets/icons/icon-ai4.svg?react';
import IdeaIcon from '../../assets/icons/icon-idea.svg?react';

import Logo from '../../assets/images/logo.svg?react';

// 아이콘 hover/active
const itemBase = 'w-full flex items-center py-[8px] px-[16px] gap-[10px] rounded-[12px] transition';
const inactive = 'text-[#5F5E5B] text-[16px] leading-[24px]';
const active = 'bg-[#F1F0EF] text-black';

const items = (userType) =>
  userType === 'business'
    ? [
        {to: '/dashboard/ai', name: 'AI 추천', Icon: AIICon},
        {to: '/store-management', name: '매장 정보 관리', Icon: StoreIcon},
        {to: '/projects/ongoing', name: '진행 중인 프로젝트', Icon: InProgressIcon},
        {to: '/projects/completed', name: '완료된 프로젝트', Icon: CompletedIcon},
        {to: '/payment', name: '결제 내역', Icon: CreditCardIcon},
        {to: '/profile/business', name: '내 정보', Icon: UserIcon},
      ]
    : [
        {to: '/new-project', name: '새 프로젝트 제안', Icon: IdeaIcon},
        {to: '/portfolio', name: '내 포트폴리오', Icon: PortfolioIcon},
        {to: '/projects/ongoing', name: '진행 중인 프로젝트', Icon: InProgressIcon},
        {to: '/projects/completed', name: '완료된 프로젝트', Icon: CompletedIcon},
        {to: '/revenue', name: '수입 내역', Icon: CreditCardIcon},
        {to: '/profile/artist', name: '내 정보', Icon: UserIcon},
      ];

export default function Sidebar() {
  const userType = useStore((s) => s.userType);

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
