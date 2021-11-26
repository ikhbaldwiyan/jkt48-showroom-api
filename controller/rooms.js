const { HOME, LIVE } = require("../utils/api");
const fetchService = require("../utils/fetchService");

const Rooms = {
    getRoomList: async (req, res) => {
        let roomList = []
        try {
            const response = await fetchService(HOME, res);
            const rooms = response.data

            for (let i = 0; i < rooms.length; i++) {
                const index = rooms[i];
                if (index.name.includes("JKT48")) {
                    roomList.push(index)
                }
            }
            
            res.send(roomList);

        } catch (error) {
            return error
        }
    },

    getRoomLive: async (req, res) => {
        try {
            let onLive = [];
            let roomIsLive = [];
            let findSisca = [];

            const response = await fetchService(`${LIVE}/onlives`, res);
            const data = response.data.onlives

            // Find Member Live
            for (let i = 0; i < data.length; i++) {
                const index = data[i];
                if (index.genre_name === "Idol") {
                    onLive.push(index)
                }
            }

            if (onLive.length) {
                const roomLive = onLive[0].lives;
            
                roomLive.forEach(item => {
                    if (item.room_url_key.includes('JKT48')) {
                        roomIsLive.push(item)
                    }
                });
            }

            // Find Sisca
            for (let i = 0; i < data.length; i++) {
                const index = data[i];
                if (index.genre_name === "Music") {
                    findSisca.push(index)
                }
            }

            if (findSisca.length) {
                const siscaLive = findSisca[0].lives;
            
                siscaLive.forEach(item => {
                    if (item.room_url_key.includes('JKT48')) {
                        roomIsLive.push(item)
                    }
                });
            }

            res.send(roomIsLive);

        } catch (error) {
            return error
        }
    }
}

module.exports = Rooms;