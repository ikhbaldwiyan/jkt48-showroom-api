const { HOME, LIVE, ROOM } = require("../utils/api");
const fetchService = require("../utils/fetchService");
const { MongoClient } = require("mongodb");

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
      return error;
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
          message: "Member Not Live",
          is_live: false,
        });
      }

      res.send(roomIsLive);
    } catch (error) {
      return error;
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
      res.send(error);
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
      res.send(error);
    }
  },

  getNewMember: async (req, res) => {
    const ACADEMY = {
      amanda: "400710",
      lia: "400713",
      callie: "400714",
      ela: "400715",
      indira: "400716",
      lyn: "400717",
      raisha: "400718",
    };

    const promises = Object.values(ACADEMY).map(async (room_id) => {
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
      res.send(error);
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
      res.send(error);
    }
  },

  getLastRoomLive: async (req, res) => {
    try {
      const uri = process.env.DB_URL;
      const client = new MongoClient(uri, { useUnifiedTopology: true });

      const db = client.db("showroom");
      const collection = db.collection("live_ids");
      const liveDatabase = await collection.find().toArray();

      res.send(liveDatabase);
    } catch (error) {
      res.send(error);
    }
  },
};

module.exports = Rooms;
