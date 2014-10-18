// These two lines are required to initialize Express in Cloud Code.
var Settings = require("cloud/util/settings")
var express = require('express')
var app = express()

// Set Master Key
Parse.Cloud.useMasterKey()

// Routes
routes = {
  core: require("cloud/express/routes/index"),
  confession: require("cloud/express/routes/confession"),
  twilio: require("cloud/express/routes/twilio"),
  moderator: require("cloud/express/routes/moderator"),
  spam: require("cloud/express/routes/spam"),
  search: require("cloud/express/routes/search")
}

// Global app configuration section
app.set('views', 'cloud/express/views')
app.set('view engine', 'ejs')

app.use(express.bodyParser())
app.use(express.cookieParser())
app.use(express.cookieSession({
  secret: 'ursid',
  cookie: {
    httpOnly: true
  }
}))
app.use(express.csrf())
app.use(function(req, res, next) {
  // Auth
  req.basicAuth = express.basicAuth
  res.locals.csrf = req.session._csrf

  // Locals
  res.locals.admin = !!req.session.user
  res.locals.school = null
  res.locals.schools = req.session.schools || []

  if(req.session.gaTracking == undefined) {
    Settings().then(function(settings) {
      req.session.gaTracking = settings.get("gaTracking")
      res.locals.gaTracking = req.session.gaTracking
      next()
    }, function(error) {
      console.log(error)
      next()
    })
  } else {
    res.locals.gaTracking = req.session.gaTracking
    next()
  }
})

// Landing
app.get('/', routes.core.home)
app.post('/tester', routes.core.tester)
app.post('/download', routes.core.download)

// Terms
app.get('/terms', routes.core.terms)

// Privacy
app.get('/privacy', routes.core.privacy)

// Robots
app.get('/robots', routes.core.robots)
app.get('/robots.txt', routes.core.robots)

// Sitemap
app.get('/sitemap', routes.core.sitemap)
app.get('/sitemap.xml', routes.core.sitemap)

// Search
app.get('/search', routes.search.home)
app.post('/search', routes.search.search)

// Confessions
app.get('/confession', routes.confession.redirect)
app.get('/confessions', routes.confession.redirect)
app.get('/confession/:school', routes.confession.home)
app.get('/confessions/:school', routes.confession.redirect)
app.post('/confession', routes.confession.post)

// TWILIO INBOUND: Juicy Posts
app.get('/twilio/juicy', routes.twilio.auth, routes.twilio.post, routes.twilio.response)

// TWILIO INBOUND: Facebook Confessions
app.get('/twilio/confession', routes.twilio.auth, routes.twilio.confession, routes.twilio.post, routes.twilio.response)

// Moderator Route
app.get('/moderator', routes.moderator.auth, routes.moderator.home)
app.get('/moderator/confessions', routes.moderator.auth, routes.moderator.confessions)
app.post('/moderator/confession', routes.moderator.auth, routes.moderator.post)
app.delete('/moderator/confession', routes.moderator.auth, routes.moderator.delete)
app.put('/moderator/confession', routes.moderator.auth, routes.moderator.spam, routes.moderator.delete)

app.get('/moderator/spam', routes.moderator.auth, routes.spam.home)
app.get('/moderator/spam/confessions', routes.moderator.auth, routes.spam.confessions)
app.post('/moderator/spam/confession', routes.moderator.auth, routes.spam.revert)
app.delete('/moderator/spam/confession', routes.moderator.auth, routes.moderator.delete)

app.get('/moderator/:school/writer', routes.moderator.auth, routes.moderator.writer)
app.get('/moderator/:school/spam', routes.moderator.auth, routes.spam.home)
app.get('/moderator/:school', routes.moderator.auth, routes.moderator.home)

// Not Found Redirect
app.all("*", routes.core.notfound)

// Listen to Parse
app.listen()
