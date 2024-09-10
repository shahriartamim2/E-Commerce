import { useGetSingleUserQuery, useSetUserStatusMutation } from "@/services/usersApi";
import  { useState } from "react";
import { useParams } from "react-router-dom";

function ActionDropdown() {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleUserQuery(id);
  const [setUserStatus] = useSetUserStatusMutation();
  const [action, setAction] = useState("");
  const [isPopoutVisible, setPopoutVisible] = useState(false); // State to control popout visibility

  const handleChange = (e) => {
    setAction(e.target.value);
  };

  const handleSave = () => {
    setPopoutVisible(true); // Show the confirmation popout
  };

  const handleConfirm = (confirmed) => {
    if (confirmed) {
      // Perform save action here
      console.log("User status changed to:", action);
      try {
        setUserStatus({action, id});
      } catch (error) {
        console.log(error);
      }
    }
    setPopoutVisible(false); // Hide the popout after confirmation or cancel
  };
  if(isLoading) return <div>Loading</div>

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto relative">
      <p>User name:{data.payload.user.name}</p>
      <p>User email:{data.payload.user.email}</p>
      <span className="block text-lg font-semibold mb-4">
        User Status:{" "}
        <span
          className={
            data.payload.user.isBanned ? "text-red-600" : "text-green-600"
          }
        >
          {data.payload.user.isBanned ? "Banned" : "Not-Banned"}
        </span>
      </span>

      <p className="text-sm mb-2 text-gray-700">Change User Status:</p>

      <label htmlFor="action" className="block mb-1 font-medium text-gray-800">
        Select Action:
      </label>
      <select
        name="action"
        value={action}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="ban">Ban</option>
        <option value="unban">Unban</option>
      </select>

      <button
        onClick={handleSave}
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Save
      </button>

      {/* Popout for confirmation */}
      {isPopoutVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4">
            <p className="text-xl font-semibold">Are you sure?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleConfirm(true)}
                className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
              >
                Yes
              </button>
              <button
                onClick={() => handleConfirm(false)}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ActionDropdown;
