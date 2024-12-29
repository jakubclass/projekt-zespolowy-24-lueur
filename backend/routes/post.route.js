import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { createPost, deletePost, commentOnPost, likeUnlikePost, getAllPosts, getLikedPosts, getFollowingPosts, getUserPosts, getCommunityPosts, repostPost } from "../controllers/post.controller.js"

const router = Router()

router.get('/all', protectRoute, getAllPosts)
router.get('/following', protectRoute, getFollowingPosts)
router.get('/user/:username', protectRoute, getUserPosts)
router.get('/community/:name', protectRoute, getCommunityPosts)
router.get('/likes/:id', protectRoute, getLikedPosts)
router.post('/create', protectRoute, createPost)
router.post('/like/:id', protectRoute, likeUnlikePost)
router.post('/comment/:id', protectRoute, commentOnPost)
router.delete('/:id', protectRoute, deletePost)
router.post('/repost/:id', protectRoute, repostPost)

export default router