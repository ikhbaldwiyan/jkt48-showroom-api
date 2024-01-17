const fetchService = require("../utils/fetchService");
const axios = require('axios')


let idnUsernames = [
  "jkt48_freya",
  "jkt48_ashel",
  "jkt48_amanda",
  "jkt48_gita",
  "jkt48_lulu",
  "jkt48_jessi",
  "jkt48_shani",
  "jkt48_raisha",
  "jkt48_muthe",
  "jkt48_chika",
  "jkt48_christy",
  "jkt48_lia",
  "jkt48_cathy",
  "jkt48_cynthia",
  "jkt48_daisy",
  "jkt48_indira",
  "jkt48_eli",
  "jkt48_michie",
  "jkt48_gracia",
  "jkt48_ella",
  "jkt48_adel",
  "jkt48_feni",
  "jkt48_marsha",
  "jkt48_zee",
  "jkt48_lyn",
  "jkt48_indah",
  "jkt48_elin",
  "jkt48_chelsea",
  "jkt48_danella",
  "jkt48_gendis",
  "jkt48_gracie",
  "jkt48_greesel",
  "jkt48_flora",
  "jkt48_olla",
  "jkt48_kathrina",
  "jkt48_oniel",
  "jkt48_fiony",
  "jkt48_callie",
  "jkt48_alya",
  "jkt48_anindya",
  "jkt48_jeane",
];

const IndLiveController = {

  getLives: async (req,res) => {
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
  
      const data = liveInfo.data?.data.searchLivestream?.result
  
      if(data.length){
        const liveResult = data.filter((i) => {
          
          return idnUsernames.includes(i.creator?.username || "0");
        })
  
        let liveData = liveResult.map((i) => {
              return {
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
              };
            })

        res.status(200).json({
          code: 200,
          success: true,
          message: null,
          data: liveData
        })
      }

      throw new Error('no one is live')
  
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