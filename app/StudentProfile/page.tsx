import AuthRedirect from "../AuthRedirect/AuthRedirect";
import SetupProfilePage from "./SetupProfilePage";

const page = () => {
    return (
        <AuthRedirect>
            <SetupProfilePage/>
        </AuthRedirect>
    );
}

export default page;