const { HOME, LIVE, ROOM, BASE_URL } = require("../utils/api");
const fetchService = require("../utils/fetchService");
const getCustomRoom = require("../utils/customRoom");

const Rooms = {
  getRoomList: async (req, res) => {
    let roomList = [];
    try {
      const response = await fetchService(HOME, res);
      const rooms = response.data;

      for (let i = 0; i < rooms.length; i++) {
        const index = rooms[i];
        if (
          index.name.includes("JKT48") &&
          !index.url_key.includes("JKT48_Eve") &&
          !index.url_key.includes("JKT48_Ariel") &&
          !index.url_key.includes("JKT48_Anin") &&
          !index.url_key.includes("JKT48_Cindy")
        ) {
          roomList.push(index);
        }
      }

      res.send(roomList);
    } catch (error) {
      console.log('error getRoomList', error);
      res.status(400).json({
        code: 400,
        success: false,
        message: error?.message ?? "Server Error",
      });
    }
  },

  getRoomLive: async (req, res) => {
    try {
      let onLive = [];
      let roomIsLive = [];
      let findSisca = [];

      const response = await fetchService(`${LIVE}/onlives`, res);
      const data = response.data.onlives;

      // Find Member Live
      for (let i = 0; i < data.length; i++) {
        const index = data[i];
        if (index.genre_name === "Idol") {
          onLive.push(index);
        }
      }

      if (onLive.length) {
        const roomLive = onLive[0].lives;

        roomLive.forEach((item) => {
          if (item.room_url_key.includes("JKT48")) {
            roomIsLive.push(item);
          }
        });
      }

      // Find Sisca
      for (let i = 0; i < data.length; i++) {
        const index = data[i];
        if (index.genre_name === "Music") {
          findSisca.push(index);
        }
      }

      if (findSisca.length) {
        const siscaLive = findSisca[0].lives;

        siscaLive.forEach((item) => {
          if (item.room_url_key.includes("JKT48")) {
            roomIsLive.push(item);
          }
        });
      }

      if (roomIsLive.length === 0) {
        res.send({
          message: "Room Not Live",
          is_live: false,
          data: [],
        });
      }

      res.send({
        message: "Room Is Live",
        is_live: true,
        data: roomIsLive,
      });
    } catch (error) {
      console.log('error getRoomLive', error);
      res.status(400).json({
        code: 400,
        success: false,
        message: error?.message ?? "Server Error",
      });
    }
  },

  getProfile: async (req, res) => {
    try {
      const { roomId, cookies } = req.params;
      const config = {
        headers: {
          Cookie: cookies,
        },
      };
      const getProfile = await fetchService(
        `${ROOM}/profile?room_id=${roomId}`,
        res,
        config
      );
      const profile = getProfile.data;

      res.send(profile);
    } catch (error) {
      console.log('error getProfile', error);
      res.status(400).json({
        code: 400,
        success: false,
        message: error?.message ?? "Server Error",
      });
    }
  },

  getNextLive: async (req, res) => {
    try {
      const { roomId } = req.params;
      const getNextLive = await fetchService(
        `${ROOM}/next_live?room_id=${roomId}`,
        res
      );
      const nextLive = getNextLive.data;

      res.send(nextLive);
    } catch (error) {
      res.send(error);
    }
  },

  getTotalRank: async (req, res) => {
    try {
      const { roomId } = req.params;
      const getTotalRank = await fetchService(
        `${LIVE}/summary_ranking?room_id=${roomId}`,
        res
      );
      const totalRank = getTotalRank.data.ranking;

      res.send(totalRank);
    } catch (error) {
      console.log('error getTotalRank', error);
      res.status(400).json({
        code: 400,
        success: false,
        message: error?.message ?? "Server Error",
      });
    }
  },

  getGen10Member: async (req, res) => {
    const ROOMS = getCustomRoom("gen_10");
    const promises = Object.values(ROOMS).map(async (room_id) => {
      const response = await fetchService(
        `${ROOM}/profile?room_id=${room_id}`,
        res
      );
      return response.data;
    });

    try {
      const newMember = await Promise.all(promises);
      res.send(newMember);
    } catch (error) {
      console.log('error getGen10Member', error);
      res.status(400).json({
        code: 400,
        success: false,
        message: error?.message ?? "Server Error",
      });
    }
  },

  getTrainee: async (req, res) => {
    const ROOMS = getCustomRoom("trainee");
    const promises = Object.values(ROOMS).map(async (room_id) => {
      const response = await fetchService(
        `${ROOM}/profile?room_id=${room_id}`,
        res
      );
      return response.data;
    });

    try {
      const newMember = await Promise.all(promises);
      res.send(newMember);
    } catch (error) {
      console.log('error getTrainee', error);
      res.status(400).json({
        code: 400,
        success: false,
        message: error?.message ?? "Server Error",
      });
    }
  },

  getFanLetter: async (req, res) => {
    try {
      const { roomId } = req.params;
      const getFanLetter = await fetchService(
        `${ROOM}/recommend_comments?room_id=${roomId}`,
        res
      );
      const fanLetter = getFanLetter.data.recommend_comments;

      res.send(fanLetter);
    } catch (error) {
      console.log('error getFanLetter', error);
      res.status(400).json({
        code: 400,
        success: false,
        message: error?.message ?? "Server Error",
      });
    }
  },

  getTheaterSchedule: async (req, res) => {
    try {
      const data = await fetchService(
        `${BASE_URL}/premium_live/search?page=1&count=24&is_pickup=0`,
        res
      );
      const schedule = data.data.result.filter(
        (room) => room.room_name === "JKT48 Official SHOWROOM"
      );

      res.send(schedule);
    } catch (error) {
      console.log('error getTheaterSchedule', error);
      res.status(400).json({
        code: 400,
        success: false,
        message: error?.message ?? "Server Error",
      });
    }
  },
};

module.exports = Rooms;
