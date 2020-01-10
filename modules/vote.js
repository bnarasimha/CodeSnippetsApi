var setup = require('../setup.js');

var app = setup.app;
var Vote = setup.Vote;

app.get('/api/getVotes/:codeSnipId', function(req, res){
    Vote.find({codeSnippetId : req.params.codeSnipId})
    .exec(function(err, Vote){
        if(err){
            console.log(err);
        }
        res.json(Vote);
    });
});