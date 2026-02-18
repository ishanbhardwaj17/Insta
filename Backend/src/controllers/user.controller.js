const followModel = require("../model/follow.model")
const userModel = require("../model/user.model")

async function followUserController(req, res) {
    const followerUserName = req.user.username;
    const followeeUserName = req.params.username;

    if (followerUserName === followeeUserName) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        })
    }
    const isfolloweeExists = await userModel.findOne({ username: followeeUserName });
    if (!isfolloweeExists) {
        return res.status(404).json({
            message: "User you are trying to follow does not exist"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUserName,
        followee: followeeUserName
    })

    if (isAlreadyFollowing) {
        return res.status(400).json({
            message: `You are already following ${followeeUserName}`
        })
    }

    const followRecord = await followModel.create({
        follower: followerUserName,
        followee: followeeUserName
    })

    res.status(201).json({
        message: `You are now following ${followerUserName}`,
        follow: followRecord
    })
}

async function unfollowUserController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    })

    if (!isUserFollowing) {
        return res.status(200).json({
            message: `You are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message: `You have unfollowed ${followeeUsername}`
    })
}

module.exports = {
    followUserController,
    unfollowUserController
}