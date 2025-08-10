// src/App.jsx
import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Layout from './components/layout/Layout';

// 홈
import HomeBusiness from './features/home/HomeBusiness.jsx';
import HomeArtist from './features/home/HomeArtist.jsx';

// 비즈니스 전용
import StoreManagement from './features/store/StoreManagement.jsx';
import PaymentHistory from './features/payment/PaymentHistory.jsx';
import ProfileBusiness from './features/profile/ProfileBusiness.jsx';

// 아티스트 전용
import RevenueHistory from './features/revenue/RevenueHistory.jsx';
import ProfileArtist from './features/profile/ProfileArtist.jsx';
import PortfolioArtist from './features/portfolio/PortfolioArtist.jsx';

// 공용(프로젝트)
import ProjectsList from './features/project/ProjectsList.jsx';
import CompletedProjects from './features/project/CompletedProjects.jsx';

const App = () => {
  const userType = 'business'; // artist로 변경하면 아티스트 홈으로 리다이렉트

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout userType={userType} />}>
          {/* 진입 시 대시보드로 리다이렉트 */}
          <Route index element={<Navigate to={userType === 'artist' ? '/home-artist' : '/home-business'} replace />} />

          {/* 대시보드 */}
          <Route path="/home-business" element={<HomeBusiness />} />
          <Route path="/home-artist" element={<HomeArtist />} />

          {/* 비즈니스 메뉴 */}
          <Route path="/store-management" element={<StoreManagement />} />
          <Route path="/projects-list" element={<ProjectsList />} />
          <Route path="/completed-projects" element={<CompletedProjects />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/profile-business" element={<ProfileBusiness />} />

          {/* 아티스트 메뉴 */}
          <Route path="/portfolio-artist" element={<PortfolioArtist />} />
          <Route path="/revenue-history" element={<RevenueHistory />} />
          <Route path="/profile-artist" element={<ProfileArtist />} />

          {/* 404 */}
          <Route path="*" element={<div className="p-6 text-xl">페이지를 찾을 수 없습니다</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
