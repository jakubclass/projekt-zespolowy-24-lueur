import { model, Schema } from "mongoose";



const communitySchema = new Schema({
    name: { type: String, required: true, unique: true},
    fullname: { type: String, required: true},
    location: { type: String, default: ''},
    headqurters: { type: String, default: ''},
    companySize: { type: Number, default: 0},
    type: {type: String, default: ''},
    industry: {type: String, default: ''},
    about: { type: String, default: ''},
    profileImg: { type: String, default: ''},
    coverImg: {type: String, default: ''},
    followers: [{ type: Schema.Types.ObjectId, ref: "User", default: []}],
    admins: [{ type: Schema.Types.ObjectId, ref: 'User', required: true}]
}, { timestamps: true})

export const Community = model("Community", communitySchema)