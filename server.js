var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path')
    router = require('./routes/router'),
    database = require('./lib/database'),
    favicon = require('serve-favicon'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    session = require('express-session'),    
    port = process.env.PORT || 3000,
    app = express()
    

class Server {
  
  constructor() {
          // this.initViewEngine();
           this.initExpressMiddleWare();
           this.initCustomMiddleware();
           this.initDbSeeder();
          this.initRoutes();
          this.start();
  }
  
      start() {
        app.use(passport.initialize());
        app.use(passport.session());
        require('./lib/passport')(passport);
          app.listen(port, (err) => {
              console.log('[%s] Listening on http://localhost:%d', process.env.NODE_ENV, port);
          });
      }
      initExpressMiddleWare() {

        app.use(cookieParser());
        
        app.use(session({
          secret: 'multi vision unicorns', 
          resave:false,
          saveUninitialized: false
        }));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(passport.authenticate('remember-me'));
        app.use(favicon(__dirname + '/src/favicon2.png'));
        app.use(express.static(__dirname + '/dist'));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
         
        
        process.on('uncaughtException', (err) => {
            if (err) console.log(err, err.stack);
        });
    }
          initRoutes() {
            router.load(app, './controllers');

            // redirect all others to the index (HTML5 history)
            app.all('*', (req, res) => {
              res.sendFile(__dirname + '/dist/index.html');
          });
          //   app.get('/home', function(req, res) {
          //     res.sendFile(path.join(__dirname, 'dist/index.html'));
          //   });
          // app.get('/home/*', function(req, res) {
          //     res.sendFile(path.join(__dirname, 'dist/index.html'));
          //   });
          //   app.get('/user/*', function(req, res) {
          //     res.sendFile(path.join(__dirname, 'dist/index.html'));
          //   });
          
          // app.get('/404', function(req, res) {
          //     res.sendFile(path.join(__dirname, 'dist/index.html'));
          //   });
            
          // app.get('*', function(req, res) {
          //     res.redirect('/404')
          //   });

        }
        
    initCustomMiddleware() {
        if (process.platform === "win32") {
            require("readline").createInterface({
                input: process.stdin,
                output: process.stdout
            }).on("SIGINT", () => {
                console.log('SIGINT: Closing MongoDB connection');
                database.close();
            });
        }

        process.on('SIGINT', () => {
            console.log('SIGINT: Closing MongoDB connection');
            database.close();
        });
    }
    initDbSeeder() {
        database.open(() => {
            //Set NODE_ENV to 'development' and uncomment the following if to only run
            //the seeder when in dev mode
            //if (process.env.NODE_ENV === 'development') {
            //  seeder.init();
            //} 
            
            //seeder.init();
        });
    }
}
var server = new Server();


// app.use(express.static(path.join(__dirname, 'dist')))

// app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.json())

// app.use('/api',api)

// app.get('*', (req, resp) => {
//     res.sendFile(path.join(__dirname, 'dist/index.html'))
// })

/*
app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
app.get('/home/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
  app.get('/user/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });

app.get('/404', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
  
app.get('*', function(req, res) {
    res.redirect('/404')
  });
app.listen(port, function(){
    console.log('Server running on localhost:',port)
})

*/