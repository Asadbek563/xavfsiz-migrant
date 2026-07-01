import { useApp } from '../context/AppContext.jsx';
import HomePage from './HomePage.jsx';
import LocationPage from './LocationPage.jsx';
import JobsPage from './JobsPage.jsx';
import ProfilePage from './ProfilePage.jsx';
import NewsPage from './NewsPage.jsx';
import SOSPage from './SOSPage.jsx';
import PensionPage from './PensionPage.jsx';
import ChatPage from './ChatPage.jsx';
import BottomNav from '../components/layout/BottomNav.jsx';

export default function UserAppShell() {
  const { tab, sosScreen } = useApp();

  if (sosScreen) return <SOSPage />;

  return (
    <div className="px-5 pb-28">
      {tab === 'home'     && <HomePage />}
      {tab === 'location' && <LocationPage />}
      {tab === 'jobs'     && <JobsPage />}
      {tab === 'kabinet'  && <ProfilePage />}
      {tab === 'news'     && <NewsPage />}
      {tab === 'pension'  && <PensionPage />}
      {tab === 'chat'     && <ChatPage />}
      <BottomNav />
    </div>
  );
}
