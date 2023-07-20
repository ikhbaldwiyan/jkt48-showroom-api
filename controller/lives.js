const { LIVE, ROOM } = require("../utils/api");
const fetchService = require("../utils/fetchService");

const Lives = {
  getStreamUrl: async (req, res) => {
    try {
      const { roomId, cookies } = req.params;
      const url = `${LIVE}/streaming_url?room_id=${roomId}`;

      const response = await fetchService(url, res, {
        headers: {
          Cookie: cookies,
        },
      });
      const streamUrl = response.data.streaming_url_list;
      res.send(streamUrl);
    } catch (error) {
      return error;
    }
  },

  getComments: async (req, res) => {
    try {
      const { roomId, cookies } = req.params;
      const url = `${LIVE}/comment_log?room_id=${roomId}`;

      const response = await fetchService(url, res, {
        headers: {
          Cookie: cookies,
        },
      });
      const comments = response.data.comment_log;

      res.send(comments);
    } catch (error) {
      return error;
    }
  },

  getLiveInfo: async (req, res) => {
    try {
      const { roomId, cookies } = req.params;

      const profileUrl = `${ROOM}/profile?room_id=${roomId}`;
      const profileApi = await fetchService(profileUrl, res);
      const profile = profileApi.data;

      const titleUrl = `${LIVE}/telop?room_id=${roomId}`;
      const infoUrl = `${LIVE}/live_info?room_id=${roomId}`;
      const titleApi = await fetchService(titleUrl, res, {
        headers: {
          Cookie: cookies,
        },
      });
      const infoApi = await fetchService(infoUrl, res, {
        headers: {
          Cookie: cookies,
        },
      });
      const title = titleApi.data.telop;
      const live_info = infoApi.data

      // Destrurct response profile and title
      const profileData = (profile, title) => {
        const name = `${profile.room_name}is Live on JKT48 SHOWROOM`;
        const share = `https://twitter.com/intent/tweet?text=${name}%0ahttps://jkt48-showroom.vercel.app/room/${profile.room_url_key}/${roomId}`;
        return {
          roomId: profile.room_id,
          room_name: profile.room_name,
          room_url_key: profile.room_url_key,
          title: title,
          views: profile.view_num,
          is_onlive: profile.is_onlive,
          current_live_started_at: profile.current_live_started_at,
          share_url_live: profile.share_url_live,
          share_url_local: share,
          websocket: {
            host: live_info.bcsvr_host,
            key: live_info.bcsvr_key,
            live_id: live_info.live_id
          }
        };
      };
      const data = profileData(profile, title);

      res.send(data);
    } catch (error) {
      return error;
    }
  },

  getRank: async (req, res) => {
    try {
      const { roomId, cookies } = req.params;

      const getRank = await fetchService(
        `${LIVE}/stage_user_list?room_id=${roomId}`,
        res,
        {
          headers: {
            Cookie: cookies,
          },
        }
      );
      const totaGift = getRank.data.stage_user_list;

      res.send(totaGift);
    } catch (error) {
      res.send(error);
    }
  },

  getAllGift: async (req, res) => {
    try {
      const { roomId, cookies } = req.params;

      const getAllGift = await fetchService(
        `${LIVE}/gift_log?room_id=${roomId}`,
        res,
        {
          headers: {
            Cookie: cookies,
          },
        }
      );
      const totaGift = getAllGift.data.gift_log;

      res.send(totaGift);
    } catch (error) {
      res.send(error);
    }
  },
};

module.exports = Lives;
