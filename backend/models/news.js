const mongoose = require('mongoose')

const newsSchema = mongoose.Schema({
    title:{
        type : String,
        required : [true, 'Title is required!']
    },
    contents:{
        type : String,
        required : [true, 'Content is required!']
    },
    author : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'user', 
        required: true
    }, // ref : user을 통해 user collection의 id와 연결됨을 mongoose에 알린다. 
    createdAt : {
        type : Date,
        default : Date.now
    }
});

const News = mongoose.model('News', newsSchema);
export default News;
// 모듈의 사용성을 늘리기 위한 exports