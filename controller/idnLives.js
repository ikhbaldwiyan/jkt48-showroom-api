const axios = require('axios')
const idnUsernames = require('../utils/username')

const getAllLives = async (username = null) => {
  try {
    const liveInfo = await axios.post(
      "https://api.idn.app/graphql",
      {
        query:
          'query SearchLivestream { searchLivestream(query: "", limit:100) { next_cursor result { slug title image_url view_count playback_url room_identifier status live_at end_at scheduled_at gift_icon_url category { name slug } creator { uuid username name avatar bio_description following_count follower_count is_follow } } }}',
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const liveInfoData = liveInfo?.data?.data?.searchLivestream?.result || [];

    const liveData = liveInfoData.map(i => ({
      user: {
        id: i.creator?.uuid,
        name: i.creator?.name,
        username: i.creator?.username,
        avatar: i.creator?.avatar,
      },
      image: i.image_url,
      stream_url: i.playback_url,
      title: i.title,
      slug: i.slug,
      view_count: i.view_count,
      live_at: new Date(i.live_at).toISOString(),
    }));

    return liveData.filter(i => username ? username.includes(i.user.username || "0") : idnUsernames.includes(i.user.username || "0"))
  } catch (error) {
    return false
  }
}

const IndLiveController = {

  getLives: async (req,res) => {
    try {

      const liveData = await getAllLives()

      if(!liveData) throw new Error('no one is live')

      res.status(200).json({
        code: 200,
        success: true,
        message: null,
        data: liveData
      })

    } catch (error) {
      console.error("Error fetching IDN lives:", error.message);
      res.status(400).json({
        code : 400,
        success: false,
        message: error.message,
        data: {}
      })
    }
  },

  getMemberLive: async (req,res) => {
    try {

      const { username } = req.params

      const liveData = await getAllLives(username)

      if(!liveData) throw new Error('no one is live')


      res.status(200).json({
        code: 200,
        success: true,
        message: null,
        is_live: liveData[0] ? true : false,
        data: liveData[0]
      })

    } catch (error) {
      console.error("Error fetching IDN lives:", error.message);
      res.status(400).json({
        code : 400,
        success: false,
        message: error.message,
        data: {}
      })
    }
  },

}

module.exports = IndLiveController