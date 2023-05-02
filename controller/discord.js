const Discord = require("discord.js");
const axios = require("axios");
const cron = require("node-cron");
const { API } = require("../utils/api");
const getTimes = require("../utils/getTimes");
const { MongoClient } = require("mongodb");
const { bgCyanBright, redBright, green } = require("colorette");

const uri = "mongodb+srv://inzoid:AdeuGbgXBY7VVslz@cluster0.na5wqjb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

// Define a model for liveIds
const db = client.db("showroom");
const collection = db.collection("live_ids");

// Set up Discord webhook client
const webhookClient = new Discord.WebhookClient({
  id: "1095702123167105115",
  token: "z3ONxD7xwKFHybzMG0WNcGnoveXioHD1pQDFZGlnz-9BdMmf5tRnDNsOofaG1MxB63ZD",
});

// Function to send Discord webhook notification
function sendWebhookNotification(liveInfo, liveTime) {
  const name = liveInfo.url_key
    ? liveInfo.url_key.replace("JKT48_", "") + " JKT48"
    : liveInfo.room_url_key.replace("JKT48_", "") + " JKT48";
  const link = `https://jkt48-showroom.vercel.app/room/${
    liveInfo.url_key ?? liveInfo.room_url_key
  }/${liveInfo.id ?? liveInfo.room_id}`;

  const description = new Discord.EmbedBuilder()
    .setTitle(`${name} is now live on Showroom!`)
    .setURL(link)
    .addFields(
      {
        name: "Live started:",
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
    .setColor("#FF0000");

  webhookClient.send({
    username: "JKT48 SHOWROOM LIVE BOT",
    avatarURL:
      "https://image.showroom-cdn.com/showroom-prod/image/avatar/1028686.png?v=87",
    embeds: [description],
  });
}

async function getLiveInfo(roomType) {
  let url = roomType === "regular" ? `${API}/rooms` : `${API}/rooms/academy`;
  const response = await axios.get(url);
  const rooms = response.data;

  for (const member of rooms) {
    let name;

    const roomUrl = `${API}/rooms/profile/${member.room_id ?? member.id}`;
    const profile = await axios.get(roomUrl);
    const liveTime = profile.data.current_live_started_at;
    const liveId = profile.data.live_id;
    const liveDatabase = await collection.find().toArray();
    const liveIds = liveDatabase.map((obj) => obj.live_id);

    if (roomType === "regular") {
      name = member.url_key.replace("JKT48_", "") + " JKT48";

      if (member.is_live) {
        if (liveIds.includes(liveId)) {
          console.log(
            redBright(`Already notified for ${name} live ID ${liveId}`)
          );
        } else {
          // send notification discord and insert the live id into the database
          await sendWebhookNotification(member, liveTime);
          await collection.insertOne({
            roomId: member.room_id ?? member.id,
            name,
            live_id: liveId,
            date: getTimes(liveTime, true),
          });
          console.log(green(`Member ${name} is Live Sending notification...`));
        }
      } else {
        console.log(`${name} not live`);
      }
    } else if (roomType === "academy") {
      name = member.room_url_key.replace("JKT48_", "") + " JKT48";

      if (member.is_onlive) {
        if (liveIds.includes(liveId)) {
          console.log(
            redBright(`Already notified for ${name} live ID ${liveId}`)
          );
        } else {
          // send notification discord and insert the live id into the database
          await sendWebhookNotification(member, liveTime);
          await collection.insertOne({
            roomId: member.room_id ?? member.id,
            name,
            live_id: liveId,
            date: getTimes(liveTime, true),
          });
          console.log(green(`Member ${name} is Live Sending notification...`));
        }
      } else {
        console.log(`${name} not LIVE`);
      }
    }
  }
}

function getScheduledJobTime() {
  let now = new Date();
  let options = {
    timeZone: "Asia/Jakarta",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  let formattedDate = now.toLocaleString("id-ID", options);

  return console.log(bgCyanBright(`Job Running at ${formattedDate}`));
}

const DiscordApi = {
  getLiveNotification: async (req, res) => {
    try {
      cron.schedule("*/5 * * * *", async () => {
          await getLiveInfo("regular");
          await getLiveInfo("academy");
          getScheduledJobTime();
      });

      res.send("Live notification sent!");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error sending live notification");
    }
  },
};

module.exports = DiscordApi;
