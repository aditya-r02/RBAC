import { useDispatch, useSelector } from "react-redux";
import data from "../data/users";
import { setUser } from "../redux/User";
import { useNavigate } from "react-router";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const clickHandler = (user) => {
        dispatch(setUser(user));
        navigate('/dashboard');
    }

    const userList = useSelector((state)=>state.list.list);


    return (
        <div className="w-[60rem] min-h-[30rem] border border-gray-300 rounded-lg shadow-lg p-6 bg-gray-50">
            <h3 className="text-2xl font-bold text-center text-blue-700 mb-6">Login to Dashboard</h3>

            <div className="flex justify-around">
                {/* Admin list */}
                <div className="w-1/2 max-w-sm p-4 bg-white rounded-md shadow-md border border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-700 mb-4">Login as Admin</h4>
                    <div className="space-y-2">
                        {userList.filter(user=>user.role==='admin').map((admin, index) => (
                            <div
                                key={index}
                                className="p-2 bg-blue-100 text-blue-700 rounded-md text-center hover:bg-blue-200 cursor-pointer"
                                onClick={()=>{clickHandler(admin)}}
                            >
                                {admin.name}
                            </div>
                        ))}
                    </div>
                </div>

                {/* User list */}
                <div className="w-1/2 max-w-sm p-4 bg-white rounded-md shadow-md border border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-700 mb-4">Login as User</h4>
                    <div className="space-y-2">
                        {userList.filter(user=>user.role==='user').map((user, index) => (
                            <div
                                key={index}
                                className="p-2 bg-green-100 text-green-700 rounded-md text-center hover:bg-green-200 cursor-pointer"
                                onClick={()=>{clickHandler(user)}}
                            >
                                {user.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
