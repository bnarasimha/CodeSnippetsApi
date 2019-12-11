var setup = require('../setup.js');

var app = setup.app;
var User = setup.User;

// Get User
app.get('/api/getUser/:userId', function(req, res){
    User.findOne({ 'userId' : req.params.userId}, function(err, user){
        if(err){
            console.log(err);
        }
        res.json(user);
    });
}); 

//Add User
app.post('/api/addUser', function(req, res){

    var user = new User({
        userId: req.body.userId,
        isAdmin: req.body.isAdmin
    });

    User.create(user, function(err, user){
        if(err) return handleError(err);
    });
});
