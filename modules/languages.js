var setup = require('../setup.js');

var app = setup.app;
var Language = setup.Language;

// Get all languages
app.get('/api/languages', function(req, res){
    Language.find(function(err, languages){
        if(err){
            console.log(err);
        }
        res.json(languages);
    })
});

// Get Language Detail
app.get('/api/languageDetail/:languageId', function(req, res){
    Language.findById(req.params.languageId, function(err, language){
        if(err){
            console.log(err);
        }
        res.json(language);
    });
});

// Add Category
app.post('/api/addCategory', function(req, res){
    var newCategory = new Language(
        {
            languageName:req.body.languageName,
            categoryType:req.body.categoryType
        });
    Language.create(newCategory, function(err, codeSnippets){
        if(err) return handleError(err);
    });
});

// Updated Category
app.post('/api/updateCategory', function(req, res){
    var newCategory = 
        {
            languageName:req.body.languageName,
            categoryType:req.body.categoryType 
        };
    var query = { _id : req.body._id }
    Language.findByIdAndUpdate(query, { $set : newCategory }, {new :true }, function(err, category){
        if(err) {
            console.log(err);
            return handleError(err);
        }
    });
});

// Delete Code Snippet
app.delete('/api/deleteCategory/:languageId', function(req, res){
    Language.findById(req.params.languageId, function(err, Language){
        if(err){
            console.log(err);
        }
        if(Language)
            Language.remove();
    });
}); 