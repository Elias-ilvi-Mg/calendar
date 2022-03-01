const router = require('express').Router();
const {google} = require('googleapis')

const REFRESH_TOKEN = ""
const GOOGLE_CLIENT_ID = "380267844668-kads6f4jnk58bqbbirav72c21lc0ri92.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"
const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  'http://localhost:3000'
)

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.post('/create-tokens', async (req,res, next)=> {
  try {
    const {code} = req.body 
    const response = await oauth2Client.getToken(code)
    res.send(response)
  }catch(error){
    next(error)
  }
})


router.post('/create-event', async (req, res, next) => {
  try{
    const {summary, description, location, startDateTime, endDateTime} = 
    req.body

    oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

    const calendar = google.calendar('v3')
    const response = await calendar.event.insert({
      auth: oauth2Client,
      calendarId: 'primary',
      requestBody: {
        summary: summary,
        description: description,
        location: location,
        colorId:'2',
        start: {
          dateTime:new Date (startDateTime),
        },
        end: {
          dateTime: new Date(endDateTime),
        },
      },
    })
    res.send(response)
  }catch(error){
    next(error)
  }
})

module.exports = router;
