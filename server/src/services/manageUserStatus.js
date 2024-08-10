import User from "../models/user.model.js";
import createError from "http-errors";


const manageUserStatus = async(id, action, next)=>{
        try {
            const updateOptions = {
              new: true,
              runValidations: true,
              context: "query",
            };

            let updates = {};
            let successMessage = "";

            if (action === "ban") {
              updates = { isBanned: true };
              successMessage = "User was banned successfully";
            } else if (action === "unban") {
              updates = { isBanned: false };
              successMessage = "User was unbanned successfully";
            } else {
              throw createError(400, "Invalid action");
            }

            const userStatus = await User.findByIdAndUpdate(
              id,
              updates,
              updateOptions
            ).select("-password");

            if (!userStatus) {
              throw createError(404, "User not found");
            }

            

            return {successMessage, userStatus};

        } catch (error) {
            next(error);
        }
}

export default manageUserStatus;