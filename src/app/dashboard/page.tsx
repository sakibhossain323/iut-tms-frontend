import RequistionStatus from "./requistion";
import Trips from "./trips";

const UserDashboard = () => {
    return (
        <div className="my-5">
            <RequistionStatus />
            <Trips />
        </div>
    );
};

export default UserDashboard;
