var passport = require('passport');
var models = require('../models/index');
const fs = require('fs');
const path = require('path');

const path_To_Key = path.join(__dirname, '..', 'id_rsa256_pub.key');
const PUB_KEY = fs.readFileSync(path_To_Key, 'utf8');

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = PUB_KEY;
opts.algorithms = ['RS256'];

module.exports = function(passport){
  
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
  }));

passport.serializeUser(function(user, done) {
    done(null, {id: user.id, email: user.email, role: user.role});
  });
  
passport.deserializeUser(function(user, done) {
done(null, {id: user.id, email: user.email, role: user.role});
});

}
