import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/UserList";
import { updateCurrUser } from "../redux/User";

const UserBoard = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [newEmail, setNewEmail] = useState(user.email);
    const [editing, setEditing] = useState(false);

    const saveEmailHandler = () => {
        if (newEmail === "" || newEmail === user.email) return;
        dispatch(updateUser({ email: user.email, key: "email", value: newEmail }));
        dispatch(updateCurrUser({key:'email', value:newEmail}));
        setEditing(false);
    };

    return (
        <div className="grid grid-cols-5 gap-6">
            {/* User Information */}
            <div className="border border-gray-300 rounded-lg shadow-md p-4 bg-white col-span-2">
                <h4 className="text-xl font-semibold mb-4 text-gray-700">Information</h4>
                <p className="text-gray-600 mb-2">
                    <span className="font-medium">Name:</span> {user.name}
                </p>
                <p className="text-gray-600 mb-2">
                    <span className="font-medium">Email:</span>{" "}
                    {editing ? (
                        <input
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 focus:ring focus:ring-blue-200"
                        />
                    ) : (
                        user.email
                    )}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium">Role:</span> {user.role}
                </p>
            </div>

            {/* Email Change Option */}
            {user.emailChange && (
                <div className="col-span-3 flex items-center justify-center">
                    <button
                        onClick={() => (editing ? saveEmailHandler() : setEditing(true))}
                        className={`${
                            editing
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-blue-500 hover:bg-blue-600"
                        } text-white text-sm px-4 py-2 rounded`}
                    >
                        {editing ? "Save Email" : "Change Email"}
                    </button>
                    {editing && (
                        <button
                            onClick={() => {
                                setEditing(false);
                                setNewEmail(user.email);
                            }}
                            className="ml-4 bg-gray-300 hover:bg-gray-400 text-sm px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserBoard;
