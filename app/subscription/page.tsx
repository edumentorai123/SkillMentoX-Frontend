import AuthRedirect from "../AuthRedirect/AuthRedirect";
import SubscriptionPage from "./subscription";

const page = () => {
    return (
        <AuthRedirect>
            <SubscriptionPage/>
        </AuthRedirect>
    );
}

export default page;