import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Layout from './components/layout/Layout';
import {useStore} from './store/useStore';

import AIInput from './features/business/ai/AIInput.jsx';
import AIResult from './features/business/ai/AIResult.jsx';
import PortfolioDetail from './features/portfolio/detail/PortfolioDetail';
import NewProject from './features/artist/NewProject.jsx';
import NoProject from './features/artist/NoProject.jsx';
import StoreManagement from './features/business/store/StoreManagement.jsx';
import PaymentHistory from './features/payment/PaymentHistory';
import ProfileBusiness from './features/user/ProfileBusiness.jsx';
import RevenueHistory from './features/payment/RevenueHistory.jsx';
import ProfileArtist from './features/user/ProfileArtist.jsx';
import Portfolio from './features/portfolio/list/Portfolio.jsx';
import OngoingProjects from './features/project/list/ongoing/OngoingProjects';
import CompletedProjects from './features/project/list/completed/CompletedProjects.jsx';
import PortfolioAdd from './features/portfolio/add/PortfolioAdd.jsx';
import ProjectDetail from './features/project/detail/ProjectDetail';
import Login from './features/auth/Login.jsx';
import Signup from './features/auth/Signup.jsx';
import PortfolioEdit from './features/portfolio/edit/PortfolioEdit';
import LandingPage from './features/landing/LandingPage';
import NotFound from './features/common/NotFound';

function RequireAuth({children}) {
  const token = useStore((s) => s.token);
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route path="/dashboard/ai" element={<AIInput />} />
          <Route path="/dashboard/ai/result" element={<AIResult />} />

          <Route path="/new-project" element={<NewProject />} />
          <Route path="/no-project" element={<NoProject />} />
          <Route path="/profile/artist" element={<ProfileArtist />} />
          <Route path="/revenue" element={<RevenueHistory />} />

          <Route path="/store-management" element={<StoreManagement />} />
          <Route path="/payment" element={<PaymentHistory />} />
          <Route path="/profile/business" element={<ProfileBusiness />} />

          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/add" element={<PortfolioAdd />} />
          <Route path="/portfolio/item/:id" element={<PortfolioDetail />} />
          <Route path="/portfolio/item/:id/edit" element={<PortfolioEdit />} />

          {/* 디자이너 포트폴리오 보기 (소상공인용) - 기존 컴포넌트 재사용 */}
          <Route path="/designer/:designerId/portfolio" element={<Portfolio />} />
          <Route path="/designer/:designerId/portfolio/:portfolioId" element={<PortfolioDetail />} />

          <Route path="/projects/completed" element={<CompletedProjects />} />
          <Route path="/projects/ongoing" element={<OngoingProjects />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
