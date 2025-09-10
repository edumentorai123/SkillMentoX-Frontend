import AuthRedirect from '@/app/AuthRedirect/AuthRedirect';
import MentorHomePage from './homePage'

export default function LoginPage() {
  return (
    <AuthRedirect>
      <MentorHomePage />
    </AuthRedirect>
  );
}