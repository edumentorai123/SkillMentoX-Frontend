import MentorDashboardWrapper from "./MentorDashboardWrapper";
import StudentMentorDashboard from "./StudentMentorDashboard";

const page = () => {
  return (
    <div>
      <MentorDashboardWrapper>
      <StudentMentorDashboard/>
      </MentorDashboardWrapper>
    </div>
  );
}

export default page;