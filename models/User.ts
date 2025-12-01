import mongoose, { Document,Schema, Model } from "mongoose";
import bcrypt, { genSalt } from "bcryptjs";

// --------------------- User Interface ---------------------  //
export interface IUser extends Document {
    userName: string;
    email: string;
    password?: string;
    bio?: string;
    profilePic?: string;
    friends: mongoose.Types.ObjectId[];
    isPasswordMatch(enteredPassword:string):Promise<boolean | string>;
}

// --------------------- User Schema ---------------------  //

const userSchema = new Schema<IUser>(
    {
        userName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        bio: {
            type: String,
            default: "A nice bio can help you to increase the connections"
        },
        profilePic: {
            type: String,
            default: ""
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }, { timestamps:true }
);

// --------------------- Password hash prehook ---------------------  //
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    if(!this.password) return;

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
        console.error("Password hashing failed:", err);
        throw new Error("Failed to hash password, try again later");
  }
});

// --------------------- Password checking ---------------------  //
userSchema.methods.isPasswordMatch = async function (enteredPassword: string):Promise<boolean | string>{
     try {

        if (!enteredPassword || enteredPassword.length < 7) {
        return ("Error: Enter a valid password");
        }

        return await bcrypt.compare(enteredPassword, this.password);

  } catch (err) {
        return ("Error: Enter a valid password");
  }
};

// --------------------- Model creation ---------------------  //
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;





