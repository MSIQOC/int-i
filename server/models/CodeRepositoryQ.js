import mongoose from 'mongoose';

// 코드 저장소의 
const codeRepositoryQSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    
    // 작성자, 제목, 내용, 질문올려진날짜, 추천수, 사람당 추천 여부
    author: String, 

    title: {
        type: String,
        required: true
    },
    contents: {
        type: String,
        required: true
    },
    recommend: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "tag"
        }
    ]
});

const CodeRepositoryQ = mongoose.model('coderepositoryq', codeRepositoryQSchema);
export default CodeRepositoryQ;
