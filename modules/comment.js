var setup = require('../setup.js');

var app = setup.app;
var Comment = setup.Comment;

app.get('/api/getCodeSnippetComments/:codeSnipId', function(req, res){
    Comment.find({codeSnippetId : req.params.codeSnipId})
    .exec(function(err, comments){
        if(err){
            console.log(err);
        }
        console.log(comments);
        res.json(comments);
    });
});

app.post('/api/addCodeSnippetComment', function(req, res){
    var newCodeSnippetComment = new Comment({
        codeSnippetId : req.body.codeSnippetId,
        comment : req.body.comment
    });

    Comment.create(newCodeSnippetComment, function(err, addedComment){
        if(err) console.log(err);
    });
});

app.post('/api/updateCodeSnippetComment', function(req, res){
    var updateCodeSnippetComment = new Comment({
        codeSnippetId : req.body.codeSnippetId,
        comment : req.body.comment
    });

    comment.findOne({ codeSnippetId : req.body.codeSnippetId }, function(err, resultComment){
        if(resultComment == null)
            res.send("Could not find Comment record");
        
        resultComment.comment = req.body.comment;
        resultComment.save();

        if(err)  return handleError(err);
        return res.json(updateCodeSnippetComment);
    });
})