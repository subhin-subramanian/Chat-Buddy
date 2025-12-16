import mongoose, { Document, Model, Schema } from "mongoose";

// --------------- FrndRqst Interface -------------- //
export interface IFrndRqst extends Document{
    sender: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    status: string;
}

// --------------- FrndRqst Model -------------- //
const FrndRqstSchema = new Schema<IFrndRqst>({
    sender:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status:{
        type: String,
        enum: ["pending","accepted"],
        default: "pending"
    }
},{timestamps:true});

// ------------ Model Creation ------------- //
const FrndRqst: Model<IFrndRqst> = mongoose.models.FrndRqst || mongoose.model<IFrndRqst>("FrndRqst", FrndRqstSchema);
export default FrndRqst;

