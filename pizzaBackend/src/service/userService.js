const { findUser, createUser } = require("../repository/userRepository");
const {createcart} = require('../repository/cartRepository')

    async function registerUser(userDetails) {

        //1. check if the user already exists
         const user = await findUser({
            email: userDetails.email,
            mobileNumber: userDetails.mobileNumber
         });
            
            if(user){
                // we found a user
                throw {reason: 'User already exists', status: 409};
            }

            //2. if not then create the user in the database
            const newUser = await createUser({
                email: userDetails.email,
                mobileNumber: userDetails.mobileNumber,
                password: userDetails.password,
                firstName: userDetails.firstName, 
                lastName: userDetails.lastName
            });

            if(!newUser){
                throw {reason: 'User not created, something went wrong', status: 500};
            }

            await createcart(newUser._id);

        //3. return the user
        return newUser;    
    }

module.exports = {
    registerUser
};
