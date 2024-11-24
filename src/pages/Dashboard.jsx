import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import AdminBoard from "./AdminBoard";
import UserBoard from "./UserBoard";


const Dashboard = () => {
    const user = useSelector((state)=>state.user.user);
    const navigate = useNavigate();
    //console.log(user);

    // To handle reload/ unauthorised access
    useEffect(() => {
        if (user===null) {
            navigate('/')
        }
    }, []);

    return (
        <div className="w-[60rem] min-h-[30rem] border border-gray-300 rounded-lg shadow-lg p-6 bg-gray-50">
            <h3 className="text-2xl font-bold text-center text-blue-700 mb-6">Dashboard</h3>

            {
                user.role === 'admin' && 
                <AdminBoard/>
            }

            {
                user.role === 'user' && 
                <UserBoard/>
            }

        </div>
    )
}

export default Dashboard;