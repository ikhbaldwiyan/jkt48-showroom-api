const { HOME, LIVE, ROOM } = require("../utils/api");
const fetchService = require("../utils/fetchService");

const Rooms = {
    getRoomList: async (req, res) => {
        let roomList = []
        try {
            const response = await fetchService(HOME, res);
            const rooms = response.data

            for (let i = 0; i < rooms.length; i++) {
                const index = rooms[i];
                if (index.name.includes("JKT48") && !index.url_key.includes('JKT48_Eve') && !index.url_key.includes('JKT48_Ariel') && !index.url_key.includes('JKT48_Anin') && !index.url_key.includes('JKT48_Cindy')) 
                {
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

            if (roomIsLive.length === 0) {
                res.send({
                    message : 'Member Not Live',
                    is_live: false
                });
            }

            res.send(roomIsLive);

        } catch (error) {
            return error
        }
    },

    getProfile: async (req, res) => {
        try {
            const { roomId } = req.params
            const getProfile = await fetchService(`${ROOM}/profile?room_id=${roomId}`, res)
            const profile = getProfile.data

            res.send(profile)

        } catch (error) {
            res.send(error)
        }
    },

    getNextLive: async (req, res) => {
        try {
            const { roomId } = req.params
            const getNextLive = await fetchService(`${ROOM}/next_live?room_id=${roomId}`, res)
            const nextLive = getNextLive.data

            res.send(nextLive)

        } catch (error) {
            res.send(error)
        }
    },

    getTotalRank: async (req, res) => {
        try {
            const { roomId } = req.params
            const getTotalRank = await fetchService(`${LIVE}/summary_ranking?room_id=${roomId}`, res)
            const totalRank = getTotalRank.data.ranking

            res.send(totalRank);

        } catch (error) {
            res.send(error)
        }
    },

    getNewMember: async(req, res) => {
        try {
            let newMember = [];

            const ACADEMY = {
                amanda: '400710',
                lia: '400713',
                giselle : '400712',
                callie: '400714',
                ela: '400715',
                indira:  '400716',
                lyn: '400717',
                raisha:  '400718'
            }

            const amanda = await fetchService(`${ROOM}/profile?room_id=${ACADEMY.amanda}`, res)
            const lia = await fetchService(`${ROOM}/profile?room_id=${ACADEMY.lia}`, res)
            const giselle = await fetchService(`${ROOM}/profile?room_id=${ACADEMY.giselle}`, res)
            const callie = await fetchService(`${ROOM}/profile?room_id=${ACADEMY.callie}`, res)
            const ela = await fetchService(`${ROOM}/profile?room_id=${ACADEMY.ela}`, res)
            const indira = await fetchService(`${ROOM}/profile?room_id=${ACADEMY.indira}`, res)
            const lyn = await fetchService(`${ROOM}/profile?room_id=${ACADEMY.lyn}`, res)
            const raisha = await fetchService(`${ROOM}/profile?room_id=${ACADEMY.raisha}`, res)

            newMember.push(amanda.data)
            newMember.push(callie.data)
            newMember.push(ela.data)
            newMember.push(giselle.data)
            newMember.push(lia.data)
            newMember.push(indira.data)
            newMember.push(lyn.data)
            newMember.push(raisha.data)
            
            res.send(newMember)
        } catch (error) {
            res.send(error)
        }
    },

    getFanLetter: async (req, res) => {
        try {
            const { roomId } = req.params
            const getFanLetter = await fetchService(`${ROOM}/recommend_comments?room_id=${roomId}`, res)
            const fanLetter = getFanLetter.data.recommend_comments

            res.send(fanLetter);

        } catch (error) {
            res.send(error)
        }
    },

}

module.exports = Rooms;