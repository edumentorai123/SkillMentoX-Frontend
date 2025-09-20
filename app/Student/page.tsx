
import Dashboard from './Dashboard'
import AuthRedirect from '../AuthRedirect/AuthRedirect'


const Page = () => {
  return (
    <AuthRedirect>
    <Dashboard/>
    </AuthRedirect>
  )
}

export default Page
