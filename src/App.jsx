import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Layout from './components/layout/Layout';

import AIInput from './features/businessDashboard/AIInput.jsx';
import AIResult from './features/businessDashboard/AIResult.jsx';
import PortfolioDetail from './features/portfolio/PortfolioDetail.jsx';
import NewProject from './features/artistDashboard/NewProject.jsx';
import NoProject from './features/artistDashboard/NoProject.jsx';
import StoreManagement from './features/store/StoreManagement.jsx';
import PaymentHistory from './features/payment/PaymentHistory.jsx';
import ProfileBusiness from './features/profile/ProfileBusiness.jsx';
import RevenueHistory from './features/revenue/RevenueHistory.jsx';
import ProfileArtist from './features/profile/ProfileArtist.jsx';
import PortfolioArtist from './features/portfolio/PortfolioArtist.jsx';
import OngoingProjects from './features/project/OngoingProjects.jsx';
import CompletedProjects from './features/project/CompletedProjects.jsx';

const App = () => {
  const userType = 'business'; // artist로 변경하면 아티스트 홈으로 리다이렉트

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout userType={userType} />}>
          {userType === 'business' ? (
            <Route index element={<Navigate to="/dashboard/ai" replace />} />
          ) : (
            <Route index element={<Navigate to="/new-project" replace />} />
          )}

          <Route index element={<Navigate to="/dashboard/ai" replace />} />

          <Route path="/dashboard/ai" element={<AIInput />} />
          <Route path="/dashboard/ai/result" element={<AIResult />} />
          <Route path="/portfolio/detail" element={<PortfolioDetail />} />

          <Route path="/new-project" element={<NewProject />} />
          <Route path="/no-project" element={<NoProject />} />
          <Route path="/portfolio/artist" element={<PortfolioArtist />} />
          <Route path="/profile/artist" element={<ProfileArtist />} />
          <Route path="/revenue" element={<RevenueHistory />} />

          <Route path="/store-management" element={<StoreManagement />} />
          <Route path="/payment" element={<PaymentHistory />} />
          <Route path="/profile/business" element={<ProfileBusiness />} />

          <Route path="/projects/completed" element={<CompletedProjects />} />
          <Route path="/projects/ongoing" element={<OngoingProjects />} />

          {/* 404 */}
          <Route path="*" element={<div className="p-6 text-xl">페이지를 찾을 수 없습니다</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
