import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { createCommunity, getCommunity, getAllCommunities, followUnfollowCommunity, addCommunityAdmin } from "../controllers/community.controller.js";



const router = Router()

router.post('/create', protectRoute, createCommunity)
// router.post('/:name/update', protectRoute, updateCommunity)
router.post('/:name/follow', protectRoute, followUnfollowCommunity)
// router.delete('/:name', protectRoute, deleteCommunity)
router.post('/addAdmin', protectRoute, addCommunityAdmin)
router.get('/:name', protectRoute, getCommunity)
router.get('/', protectRoute, getAllCommunities)

export default router