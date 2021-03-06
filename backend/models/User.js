import mongoose from 'mongoose';


// 스키마는 웬만해서 수정 X. 특히 unique 건드리면 DB 날라가는 상황 발생할 수 있음.
// 필드값 추가는 딱히 상관없음.
const userSchema = new mongoose.Schema({

    // (인트아이) 비회원 = -1 회원 = 1, 어드민 = 2
    role: Number,
    hash: String,
    
    // 관심분야, 자기소개, 개인 깃, 블로그 주소
    privateInterest: String,
    privateAbout: String,
    privateGitUri: String,
    privateBlogUri: String,
    avatarUri: String,

    githubId: String,
    kakaoId: String,
    googleId: String,

    nickname: {
        type: String,
        required: true,
        unique: true
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    studentId: {
        type: Number
    },

    // 리스트 형태로 추가하는 방법.
    // [ { document } ]
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "tag"
        }
    ]
})

// 스키마 대문자 단수형으로 통일.
const User = mongoose.model('users', userSchema);
export default User;