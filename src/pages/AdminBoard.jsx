import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, updateUser } from "../redux/UserList";

const AdminBoard = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const userList = useSelector(state=>state.list.list)
    const [newUserForm, setNewUserForm] = useState(false);
    const [newUserName, setNewUserName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');

    const saveUserHandler = () => {
        if (newUserEmail===""||newUserName==="") return;

        dispatch(addUser({name:newUserName, email:newUserEmail, permissions:{emailChange:false}, role:'user'}));
        setNewUserEmail("");
        setNewUserName("");
        setNewUserForm(false);
    }

    const deleteUserHandler = (email) => {
        dispatch(deleteUser(email));
    }

    const updateUserHandler = (email, key, value) => {
        dispatch(updateUser({email:email, key:key, value:value}));
    }
    
    return (
        <>
        <div className="grid grid-cols-5 gap-6">
            {/* Admin Information */}
            <div className="border border-gray-300 rounded-lg shadow-md p-4 bg-white col-span-2">
                <h4 className="text-xl font-semibold mb-4 text-gray-700">Information</h4>
                <p className="text-gray-600 mb-2">
                    <span className="font-medium">Name:</span> {user.name}
                </p>
                <p className="text-gray-600 mb-2">
                    <span className="font-medium">Email:</span> {user.email}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium">Role:</span> {user.role}
                </p>
            </div>

            {/* User List */}
            <div className="border border-gray-300 rounded-lg shadow-md p-4 bg-white col-span-3">
                <h4 className="text-xl font-semibold mb-4 text-gray-700">User List</h4>
                <ul className="divide-y divide-gray-200 max-h-[15rem] overflow-y-auto">
                    {userList.filter(user=>user.role==="user").map((user, index) => (
                        <li key={index} className="py-2 flex items-center justify-between">
                            <div>
                                <p className="text-gray-800 font-medium">{user.name}</p>
                                <p className="text-gray-500 text-sm">{user.email}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                {/* Toggle Input */}
                                <label className="flex items-center text-sm text-gray-600">
                                    <input
                                        onChange={()=>{updateUserHandler(user.email, "emailChange", !user.emailChange)}}
                                        checked={user.emailChange}
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-blue-600 rounded mr-2"
                                    />
                                    Enable Email Change
                                </label>
                                {/* Delete Button */}
                                <button
                                    className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
                                    onClick={()=>{deleteUserHandler(user.email)}}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                    
                    <li className="py-2 ">
                        <button className="text-white bg-blue-500 rounded px-3 py-1"
                        onClick={()=>(setNewUserForm(!newUserForm))}>
                            Add new user
                        </button>
                    </li>
                </ul>
            </div>

        </div>

        {/* Add New User Form */}
        {newUserForm && (
        <div className="absolute top-0 right-0 left-0 bottom-0 w-full h-full bg-black/40 flex justify-center items-center"
        onClick={()=>(setNewUserForm(false))}>
            <div className=" border-gray-400 p-4 border pt-4 max-w-96 rounded z-10 bg-white 
            shadow-xl"
            onClick={(event)=>{event.stopPropagation()}}>
                <h5 className="text-lg font-medium text-gray-700 mb-2">Add New User</h5>
                <div className="space-y-4">
                    <input
                        value={newUserName}
                        onChange={(e)=>setNewUserName(e.target.value)}
                        type="text"
                        placeholder="Name"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
                    />
                    <input
                        value={newUserEmail}
                        onChange={(e)=>setNewUserEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
                    />
                    <button
                        onClick={saveUserHandler}
                        className="text-white bg-green-500 rounded px-4 py-2 hover:bg-green-600"
                    >
                        Save User
                    </button>
                </div>
            </div>
        </div>
        )}
        </>
    );
};

export default AdminBoard;
