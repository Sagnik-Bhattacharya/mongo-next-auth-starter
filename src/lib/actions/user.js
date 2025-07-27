import User from "../models/user.model";
import { connectDB } from "../mongodb/mongoose";

export const createOrUpdateUser = async (
  id,
  email_addresses,
  username,
  image_url
) => {
  await connectDB();

  try {
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          clerkId: id,
          email: email_addresses[0].email_address,
          username: username,
          avatar: image_url,
        },
      },
      { new: true, upsert: true }
    );
  
    return user;
  } catch (error) {
    console.log("Error creating or updating user:", error);
  }
};

export const deleteUser = async (id) => {
  await connectDB();
  try {
    const user = await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.log("Error deleting user:", error);
  }
};