const express = require( 'express' )
const app = express()
require('dotenv').config()
const logger = require( 'morgan' )
const path = require( 'path' )
const cookieParser = require( 'cookie-parser' )
const bodyParser = require( 'body-parser' )
const pug = require('pug')
const PORT = process.env.PORT

const Flickr = require('flickrapi'),
  flickrOptions = {
    api_key: process.env.APIKEY,
    secret: process.env.SECRET,
    user_id: process.env.USER_ID,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  }


app.use( logger( 'dev' ) )
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded( { extended: false } ) )
app.use( cookieParser() )
app.use( require( 'express-session') ({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use( express.static( path.join( __dirname, 'public' ) ) )

app.set( 'views', path.join(__dirname, 'views' ) )
app.set( 'view engine', 'pug' )

app.get('/', (req, res) => {
  Flickr.authenticate(flickrOptions, function(error, flickr) {
    const app = express()
    flickr.proxy( app, "service/rest" )
    flickr.photos.search({
      user_id: flickr.options.user_id,
      page: 1,
      per_page: 500
    }, (err, result) => {
      const data = result.photos.photo
      console.log(data)
      res.render( 'index', { data : data } )
      // res.json(data)
    })
  })
})

app.get('/popular', (req, res) => {
  Flickr.authenticate(flickrOptions, function(error, flickr) {
    const app = express()
    flickr.proxy( app, "service/rest" )
    flickr.interestingness.getList({
      // user_id: flickr.options.user_id,
      api_key: flickr.options.api_key,
      page: 1,
      per_page: 500
    }, (err, result) => {
      const data = result.photos.photo
      console.log(data)
      res.render( 'index', { data : data } )
      // res.json(data)
    })
  })
})







app.listen(PORT, () => {
  console.log('listening on port ' + PORT)
})
