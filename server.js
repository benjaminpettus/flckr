const express = require( 'express' )
const app = express()
const logger = require( 'morgan' )
const path = require( 'path' )
const bodyParser = require( 'body-parser' )
const pug = require('pug')
const PORT = 3000

app.use(logger( 'dev' ) )
app.use( bodyParser.urlencoded( { extended: false } ) )
app.use( express.static( path.join( __dirname, 'public' ) ) )

app.set( 'views', path.join(__dirname, 'views' ) )
app.set( 'view engine', 'pug' )


app.get('/', ( req, res ) => {
  res.render('index')
})





app.listen(PORT, () => {
  console.log('listening on port ' + PORT)
})
