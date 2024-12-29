import { Community } from "../models/community.model.js"
import { User } from "../models/user.model.js"
import { v2 as cloudinary } from "cloudinary"


export const createCommunity = async (req, res) => {
    try {
        const { name, fullname, industry, type, size, headqurters, location, about } = req.body
        let { profileImg, coverImg } = req.body
        const user_id = req.user._id

        const user = await User.findById(req.user._id)

        if(!user) return res.status(404).json({error: "User was not found"})

        if(!name || !fullname) return res.status(400).json({error: "Name and fullname should be provided"})
        
        const newCommunity = new Community()
        
        if(profileImg){
            const res = await cloudinary.uploader.upload(profileImg)
            profileImg = res.secure_url
            newCommunity.profileImg = profileImg
        }

        if(coverImg){
            const res = await cloudinary.uploader.upload(coverImg)
            coverImg = res.secure_url
            newCommunity.coverImg = coverImg
        }

        newCommunity.name = name
        newCommunity.fullname = fullname
        newCommunity.admins = [user._id]
        newCommunity.industry = industry
        newCommunity.type = type
        newCommunity.companySize = size
        newCommunity.headqurters = headqurters
        newCommunity.location = location
        newCommunity.about = about

        await newCommunity.save()
        return res.status(201).json(newCommunity)
    } catch (e) {
        console.log("Error in createCommunity controller: ", e.message)
        return res.status(500).json({error: "Error in creating community"})
    }
}


export const getCommunity = async (req, res) => {
    try {
        const { name } = req.params
        const user_id = req.user._id

        const user = await User.findById(req.user._id)

        if(!user) return res.status(404).json({error: "User was not found"})

        const foundCommunity = await Community.findOne({name})
        .populate({
            path: "admins"
        })
        .populate({
            path: "followers"
        })

        if(!foundCommunity) return res.status(404).json({error: `Community was not found`})


        return res.status(200).json(foundCommunity)

    } catch (error) {
        console.log("Error in getCommunity controller: ", error.message)
        return res.status(500).json({error: "Error in fetching community"})
    }
}



export const getAllCommunities = async (req, res) => {
    try{

        const communities = await Community.find().sort({createdAt: -1})
        .populate({
            path: "admins"
        })
        .populate({
            path: "followers"
        })

        if(communities.length === 0) return res.status(200).json([])


        return res.status(200).json(communities)


    }catch(e){
        console.log("Error in getAllCommunities controller: ", e.message)
        return res.status(500).json({error: "Error in fetching all communities"})
    }
}



export const followUnfollowCommunity = async (req, res) => {
    try {
        const { name } = req.params
        const user = await User.findById(req.user._id)

        if(!user) return res.status(404).json({error: "User not found"})

        const community = await Community.findOne({name})

        if(!community) return res.status(404).json({error: "Community not found"})

        const isFollowing = community.followers.includes(user._id.toString())
        if(isFollowing){
            // UNFOLLOW
            await Community.findOneAndUpdate({name}, { $pull: {followers: user._id}})
            await User.findByIdAndUpdate(req.user._id, { $pull: { communities: community._id}})
            return res.status(200).json({message: "Community unfollowed successfully"})
        }else{
            await Community.findOneAndUpdate({name}, { $push: { followers: user._id}})
            await User.findByIdAndUpdate(req.user._id, { $push: { communities: community._id}})
            return res.status(200).json({message: "Community followed successfully"})
        }

    } catch (error) {
        console.log("Error in followUnfollowCommunity controller: ", error.message)
        return res.status(500).json({error: "Error in follow/unfollow community"})
    }
}



export const addCommunityAdmin = async (req, res) => {
    try {
        const {name, username} = req.body

        const user_id = req.user._id


        const user = await User.findById(user_id)
        if(!user) return res.status(404).json({error: "User not found"})

        let community = await Community.findOne({name})
        if(!community) return res.status(404).json({error: "Community not found"})

        if(!community.admins.includes(user_id.toString())) return res.status(400).json({error: "Only admins can do this"})
            

        const newAdmin = await User.findOne({username})
        if(!newAdmin) return res.status(404).json({error: "User not found"})

        if(community.admins.includes(newAdmin._id.toString())) return res.status(200).json({error: "This user is already an admin"})


        community = await Community.findOneAndUpdate({name}, { $push: { admins: newAdmin._id}})

        return res.status(200).json(community)
    } catch (error) {
        console.log("Error in followUnfollowCommunity controller: ", error.message)
        return res.status(500).json({error: "Error in follow/unfollow community"})
    }
}