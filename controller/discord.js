const Discord = require("discord.js");
const axios = require("axios");
const cron = require("node-cron");
const { API } = require("../utils/api");
const { getTimes } = require("../utils/getTimes");

// Set up Discord webhook client
const webhookClient = new Discord.WebhookClient({
  id: "1091719267726139444",
  token: "GoodxS-yAsGlD7l0ntn8rgqISJ8l9pFqeDaNQ2234gw1vUaDRqLVAFi8a2cyiyoT8EvQ",
});

// Function to send Discord webhook notification
function sendWebhookNotification(liveInfo, liveTime) {
  const name = liveInfo.url_key
    ? liveInfo.url_key.replace("JKT48_", "") + " JKT48"
    : liveInfo.room_url_key.replace("JKT48_", "") + " JKT48";
  const link = `https://www.jkt48-showroom.com/room/${
    liveInfo.url_key ?? liveInfo.room_url_key
  }/${liveInfo.id ?? liveInfo.room_id}`;

  const description = new Discord.EmbedBuilder()
    .setTitle(`${name} is now live on Showroom!`)
    .setURL(link)
    .addFields(
      {
        name: "Stream started:",
        value: getTimes(liveTime),
      },
      {
        name: "Watch On JKT48 Showroom:",
        value: `[Here](${link})`,
        inline: true,
      },
      {
        name: "Watch On Showroom:",
        value: `[Here](https://www.showroom-live.com/r/${
          liveInfo.url_key ?? liveInfo.room_url_key
        })`,
        inline: true,
      }
    )
    .setDescription(`Silahkan Pilih Link Streaming`)
    .setImage(liveInfo.image_url ?? liveInfo.image)
    .setColor("#FF0000")
    .setTimestamp();

  webhookClient.send({
    username: "JKT48 SHOWROOM LIVE BOT",
    avatarURL:
      "https://image.showroom-cdn.com/showroom-prod/image/avatar/1028686.png?v=87",
    embeds: [description],
  });
}

async function getLiveInfo(roomType) {
  const notifiedLiveIds = new Set();

  let url = roomType === "regular" ? `${API}/rooms` : `${API}/rooms/academy`;
  const response = await axios.get(url);
  const rooms = response.data;

  for (const member of rooms) {
    let name;

    const roomUrl = `${API}/rooms/profile/${member.room_id ?? member.id}`;
    const profile = await axios.get(roomUrl);
    const liveTime = profile.data.current_live_started_at;
    const liveId = profile.data.live_id;

    if (roomType === "regular") {
      name = member.url_key.replace("JKT48_", "") + " JKT48";

      if (member.is_live) {
        if (!notifiedLiveIds.has(liveId)) {
          await sendWebhookNotification(member, liveTime);
          notifiedLiveIds.add(liveId);
        } else {
          console.log(`Already notified for ${name} live ID ${liveId}`);
        }
      } else {
        console.log(`${name} not live`);
        notifiedLiveIds.delete(liveId);
      }
    } else if (roomType === "academy") {
      name = member.room_url_key.replace("JKT48_", "") + " JKT48";

      if (member.is_onlive) {
        if (!notifiedLiveIds.has(liveId)) {
          await sendWebhookNotification(member, liveTime);
          notifiedLiveIds.add(liveId);
        } else {
          console.log(`Already notified for ${name} live ID ${liveId}`);
        }
      } else {
        console.log(`${name} not live`);
        notifiedLiveIds.delete(liveId);
      }
    }
  }
}

const DiscordApi = {
  getLiveNotification: async (req, res) => {
    try {
      // cron.schedule("*/5 * * * *", async () => {
      if (req.params.type === "regular") {
        await getLiveInfo("regular");
      } else {
        await getLiveInfo("academy");
      }
      // });

      res.send("Live notification sent!");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error sending live notification");
    }
  },
};

module.exports = DiscordApi;
