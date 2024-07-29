import User from "../models/user.model.js"
import createError from "http-errors";


const getUsers = async (req,res,next) =>{
    try{
        const search = req.query.search || '';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) ||5;

        const searchRegExp = new RegExp('.*' + search + '.*' ,'i')

        const filter = {
          isAdmin: { $ne: true },
          $or: [
            { name: { $regex: searchRegExp } },
            { email: { $regex: searchRegExp } },
            { phone: { $regex: searchRegExp } },
          ],
        };

        const options = {password :0};


        const users = await User.find(filter,options).limit(limit).skip((page-1)*limit);
        const count = await User.find(filter).countDocuments();

        if(!users){
            return createError(404,"Users not found");
        }

        res.status(200).send({
          message: "Users retrieved successfully",

          pagination: {
            totalPage: Math.ceil(count / limit),
            currentPage: page,
            previousPage: page - 1 > 0 ? page - 1 : null,
            nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
          },
          data: users
        });
    }
    catch(error){
        next(error);
    }
}

export {getUsers};