const express = require('express');
const { google } = require('googleapis');
  
const app = express();
  
  
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
const GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCpacTUSPpAU8vj\n3QhnstE/i5jiVTCHbuKnsGWPwwLmtCwWrUNV/kB+HZTu25VEy5U8aOqDS0pxaSy3\nqMF5liFEXCVmOh0/nV84D+wDU8Ori8pQm7tcgObgHOlpL2gbx/3wiuc8rhledD3D\no1FG30JACVqCHWHMXFDXvWEvSz2YmaloozImofyTZv4Z6ACKEwFVZDolE4fxjGPC\njUoa3M8aLiaeJZLXT55Pizt+Fp8mAscx0MOrax59u5KllLBQ3+mq7lrayFYSzCQU\nDMzyhVJNruhbTDb7xbUxeo5JzlCHtnEaiK/ISRg4JYE6Ic0dRgAB2xSG8UU3qhEr\noXYsYQ0xAgMBAAECggEAKV7O1hhMJFFSRP7BArHEL4RjfUHYa/pEFzcYVhcFKllt\nOsxs2R8RmLqYmAu/U+FzPCFSw2UrdK5+YQsw1AQ5c3wdFe2zHsnLauFYfSeDbOzi\nJvUgt+IyfyAQT8Nn5QDdnlQNS+AoCczRGGlVe70hbIncNFIAg+s3QrfYd7gj/pOB\nZWfGykAhJp49tbUWKWcj80KAMw0czLIldN26kQm0XxgT9BcKVozi88XrEKtB95tD\nfvqhK/R7Q8DuUN6lCOhv1wp4HEIdSxBZGKn+n9KNqzmN4t1PBYt9btIEfyIdnJMT\nvFTqUBCzF/rufegh2aeSoAla9RU6+7gs4g9kvChZ0QKBgQDnof2beJxTlyaT5Hfj\ngo/p/ufIMbpPCIntkO8ka/xiv8jSaLc0VBjZhI4zcL8uHFHu96CuPu23ZyXkLHvS\ngnccuzdgJmJYHwcupj5/Wub95cNodB31mCRooEgyYhwhtpYh0/1apZ8fWk3fejgu\nAvnJKL461E085FdRaotqz1kVSwKBgQC7PCqsFP1aDJPH4dSBouiMU4DuwjAVPf9K\nw7TOfh3TSmSDK5f740Qua4KmDRzKP+32tjgD6jElb9bZHx7JVqv4xhaVwh6Pn/zx\nMJZ02XBt6Dhj/9PQ3BJgC5teIEezmsrzNkgryTroy7PTQoakYoNMzQUg332Tuz8p\nCUFx33ol8wKBgQDIa6/GUEvjQAvPN4ZMwvHHJBplbDGqpNbDSf7B4vXUc+FNvfGX\nQ5Tk0P9BnzKssTBrtrO/UQ/a+1Mb5SmWcfCiWZOGjG/Xk7FhOdMl2v+3fJDh1mb9\n1BDcvqL5hU6WFSg+SPEU9+2A8WAkF9p4ZXbACZLf0Easg17SQYA0gQixlQKBgGbK\n5XKMI3uopAl8xjpVwe4oegSav+Mpolrdjwo+2wkBMqWA7XPwlaIWjCe10zSGXJKx\n/5bGoCy5de7F0xUebFOsDQIzDKw1XZzc2/1S0xLEBxF/hj6IU94/ARFwD21fckSM\nbJr9Y0Yjb5pwT5M4MnWbqVEe4caValuRJUjrNBhZAoGBAMyx7HWxN9V9iVyvD+UZ\n/A+jLqZX1hGNCXkr2tGqrE16LNXH5cnXyPVsRuoydPAwW+oZdBdEb3G1//Mcn6MD\nTb8Dxej3XAQPbBB5E+//zwI/FEYHf4CamDvgFO+givzPxgXi1F7wJPvv7ZDo3PdR\ngl5YrO00gLY7cqKQD53uR1Au\n-----END PRIVATE KEY-----\n";
const GOOGLE_CLIENT_EMAIL = "attendance@attendance-361007.iam.gserviceaccount.com"
const GOOGLE_PROJECT_NUMBER = "1084528027482"
const GOOGLE_CALENDAR_ID = "sjrflit1ph9n8q8mnv1nuqhs24@group.calendar.google.com"
  
const jwtClient = new google.auth.JWT(
  GOOGLE_CLIENT_EMAIL,
  null,
  GOOGLE_PRIVATE_KEY,
  SCOPES
);
  
const calendar = google.calendar({
  version: 'v3',
  project: GOOGLE_PROJECT_NUMBER,
  auth: jwtClient
});
  
app.get('/', (req, res) => {
  calendar.events.list({
    calendarId: GOOGLE_CALENDAR_ID,
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (error, result) => {
    if (error) {
      res.send(JSON.stringify({ error: error }));
    } else {
      if (result.data.items.length) {
        res.send(JSON.stringify({ events: result.data.items }));
      } else {
        res.send(JSON.stringify({ message: 'No upcoming events found.' }));
      }
    }
  });
});
  
app.get("/createEvent",(req,res)=>{
  var event = {
    'summary': 'My first event!',
    'location': 'Hyderabad,India',
    'description': 'First event with nodeJS!',
    'start': {
      'dateTime': '2022-01-12T09:00:00-07:00',
      'timeZone': 'Asia/Dhaka',
    },
    'end': {
      'dateTime': '2022-01-14T17:00:00-07:00',
      'timeZone': 'Asia/Dhaka',
    },
    'attendees': [],
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
  };
    
  const auth = new google.auth.GoogleAuth({
    keyFile: 'calendar.json',
    scopes: 'https://www.googleapis.com/auth/calendar',
  });
  auth.getClient().then(a=>{
    calendar.events.insert({
      auth:a,
      calendarId: GOOGLE_CALENDAR_ID,
      resource: event,
    }, function(err, event) {
      if (err) {
        console.log('There was an error contacting the Calendar service: ' + err);
        return;
      }
      console.log('Event created: %s', event.data);
      res.jsonp("Event successfully created!");
    });
  })
})
  
app.listen(3500, () => console.log(`App listening on port 3000!`));