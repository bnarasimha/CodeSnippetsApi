var config = require('./config.local')
config.env = 'prod'
config.MongoUri = 'mongodb://bnarasimha21:1nvin$ible@cluster0-shard-00-00-shwiy.mongodb.net:27017/CodeSnippets?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'

module.exports = config;