const { LIVE, ROOM } = require("../utils/api");
const fetchService = require("../utils/fetchService");

const Lives = {
    getStreamUrl: async (req, res) => {
        try {
            const roomId = req.params.roomId;
            const url = `${LIVE}/streaming_url?room_id=${roomId}`
            const response = await fetchService(url, res);
            const streamUrl = response.data.streaming_url_list;
            
            res.send(streamUrl);

        } catch (error) {
            return error
        }
    },

    getComments: async (req, res) => {
        try {
            const roomId = req.params.roomId;
            const url = `${LIVE}/comment_log?room_id=${roomId}`
            const response = await fetchService(url, res);
            const comments = response.data.comment_log;
            
            res.send(comments);

        } catch (error) {
            return error
        }
    },

    getTitle: async (req, res) => {
        try {
            const roomId = req.params.roomId;
            const profileUrl = `${ROOM}/profile?room_id=${roomId}`;
            const profileApi = await fetchService(profileUrl, res);
            const profile = profileApi.data;

            const titleUrl = `${LIVE}/telop?room_id=${roomId}`;
            const titleApi = await fetchService(titleUrl, res);
            const title = titleApi.data.telop;

            // Destrurct response profile and title
            const profileData = (profile, title) => {
                const name = `${profile.room_name}is Live on JKT48 SHOWROOM`
                const share = `https://twitter.com/intent/tweet?text=${name}%0ahttps://jkt48-showroom.vercel.app/live-stream/${roomId}`
                return {
                    roomId: profile.room_id,
                    room_name: profile.room_name,
                    room_url_key: profile.room_url_key,
                    title: title,
                    views: profile.view_num,
                    is_onlive: profile.is_onlive,
                    current_live_started_at: profile.current_live_started_at,
                    share_url_live: profile.share_url_live,
                    share_url_local: share
                }
            }
            const data = profileData(profile, title)
            
            res.send(data);

        } catch (error) {
            return error
        }
    },
  
}

module.exports = Lives;