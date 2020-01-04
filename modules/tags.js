var setup = require('../setup.js');

var app = setup.app;
var CodeSnippet = setup.CodeSnippet;

// Get popular tags
app.get('/api/getTags', function(req, res){
    CodeSnippet.find({}, 'tags', function(err, codeSnippet){
        var tagsList = [];
        var length = codeSnippet.length;
        for(i =0; i< length; i++){
            if(codeSnippet[i].tags != null){
                
                var p = codeSnippet[i].tags.split(',')
                if(p.length > 0)
                {
                    for(j=0; j< p.length; j ++){
                        tagsList.push(p[j]);
                    }
                }
                else{
                    tagsList.push(p);
                }
            }
        }
        // Get unique tags
        var tags = tagsList.filter(function(tag, i, tagsList) {
            return tagsList.indexOf(tag) == i;
        });
        res.json(tags);
    });
});