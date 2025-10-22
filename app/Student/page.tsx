import Dashboard from './Dashboard/Dashboard'
import AuthRedirect from '../AuthRedirect/AuthRedirect'

const Page = () => {
  return (
    <AuthRedirect>
      <Dashboard />
    </AuthRedirect>
  );
};

export default Page;
