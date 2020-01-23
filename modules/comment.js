var setup = require('../setup.js');

var app = setup.app;
var Comment = setup.Comment;

app.get('/api/getCodeSnippetComments/:codeSnipId', function(req, res){
    Comment.find({codeSnippetId : req.params.codeSnipId})
    .exec(function(err, comments){
        if(err){
            console.log(err);
        }
        res.json(comments);
    });
});

app.post('/api/addCodeSnippetComment', function(req, res){
    var newCodeSnippetComment = new Comment({
        codeSnippetId : req.body.codeSnippetId,
        comment : req.body.comment,
        userId: req.body.userId
    });

    Comment.create(newCodeSnippetComment, function(err, addedComment){
        if(err) console.log(err);
        return res.json(addedComment);
    });
});

// Delete Code Snippet
app.delete('/api/deleteCodeSnippetComment/:codeCommentId', function(req, res){
    Comment.findById(req.params.codeCommentId, function(err, codeSnippetComment){
        if(err){ console.log(err); }
        
        if(codeSnippetComment){
            codeSnippetComment.remove();
            res.send("Deleted");
        }
        else{
            res.send("Error deleting comment");
        }
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