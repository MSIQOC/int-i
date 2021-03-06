import CodeRepositoryQ from "../models/CodeRepositoryQ";
import CodeRepositoryA from "../models/CodeRepositoryA";
import Like from "../models/Like";

// create : 문제 작성이 끝나고 클라이언트가 등록 버튼을 눌렀을 때 데이터 전달
export const PostQuestion = async (req, res, next) => {
	const user = req.user;
	const { title, contents, recommend, createdAt, users } = req.body;

	// 제목, 내용이 없거나 유저가 인트아이 멤버가 아니면 에러호출.
    if (!title || !contents) {
		console.log("400: title or contents is blank in question of code repository. (PostQuestion in codeQController)");
        return res.status(400).json({ addQuestion: false, reason: "title and contents both are required" });
    }
	// else if (user.role !== 1) {
	// 	console.log("403: uploader of code repository question must be the member of IntI (PostQuestion in codeQController)");
	// 	return res.status(403).json({ addQuestion: false, reason: "uploader must be the member of IntI" })
	// }

	// 등록이 잘 됐을 때 성공 메세지 보내고 안되면 에러 메세지 보내기.
	try {
		//CodeRepositoryQ.dropIndex({ users: users._id });
		const codeQ = await CodeRepositoryQ.create({
            author: req.user.id,
			user: [],
			title,
			contents,
			recommend,
			createdAt
        });
		//await CodeRepositoryQ.findByIdAndUpdate( _id, { $pull: { users: user._id } });
		res.locals.post = codeQ;
		res.locals.schema = CodeRepositoryQ;
		next();
	} catch (error) {
		console.log("400: error occurred while creating CodeRepositoryQ schema. (PostQuestion in codeQController) ", error);
		res.status(400).send({ error: error.message })
	}
}

// read: 모든 질문들 다 보여주기
export const GetAllQuestions = async (req, res) => {
	try {
		const questions = await CodeRepositoryQ.find({});
		res.status(200).json({ questions: questions });
	} catch (error) {
		console.log("404: Cannot get the page of showing all questions of code repository (GetAllQuestions in codeQController) ", error);
		res.status(404).send({ error: error.message });
	}
}

// read : 게시판에서 특정 게시글을 눌렀을 때 해당 게시글 정보 보여주기.
 export const GetOneQuestion = async (req, res) => {

	try {
        const question = await Question.findById({ _id: req.params.id });
        return res.status(200).json({ question: question });
    } catch (err) {
		console.log("404: Cannot get page of showing specific one question of code repository (GetOneQuestion in codeQController) ", err);
        next(err);
    }
};

/*
 * update : 게시글 수정 완료 후 저장 버튼을 눌렀을 때.
 * 변경사항 : 작성자 본인만 수정이 가능하도록 구현.
 */
export const PostEditQuestion = async (req, res, next) => {
	const user = req.user;
	const { _id, title, contents, anonymous, createdAt } = req.body;

	if (!title || !contents) {
		console.log( "400: title and contents both are required in code repository question (PostEditQuestion in codeQController) " );
        return res.status(400).json({ updateQuestion: false, reason: "title and contents both are required" });
    }

	try {
		const checkauthor = await CodeRepositoryQ.findOne({ _id });

		if (checkauthor.author !== user.nickname) {
			console.log("403: This user does not have authority to edit question. (PostEditQuestion in codeQController) ");
			return res.status(403).json({ updateQuestion: false, reason: "only author of the post has authority to edit."});
		}

        const rawData = await CodeRepositoryQ.findByIdAndUpdate( _id, { $set: { author: user.nickname, anonymous: anonymous, title: title, contents: contents, createdAt: createdAt }});
		res.locals.schema = CodeRepositoryQ;
		res.locals.rawData = rawData;
		next();
	} catch (error) {
		console.log("error occured while updating a question of code repository (PostEditQuestion in codeQController): "+error);
		res.status(400).send({ error: error.message });
	}
};

/*
 * update : 추천수 올리기
 * delete와 똑같이 클릭을 하면 _id값을 전달해서 추천수를 올리는게 가능하도록 post방식으로 구현
 */
export const PostRecommend = async (req, res, next) => {
	console.log("hello");
	const user = req.user;
	const { _id } = req.body;

	try {
		//const isLiked = await CodeRepositoryQ.findOne({ users: users });
		console.log(user._id);
		const question = await CodeRepositoryQ.findOne({ _id });


		const isLiked = await CodeRepositoryQ.find({ $and : [{ _id : {$eq : _id }}, { user: user._id }] });////
		
		console.log(isLiked);

		// $pull 기능은 잘 안되는 상태
		if (isLiked) {
			await CodeRepositoryQ.findByIdAndUpdate( _id, { $pull: { user: user._id }}, {$set: { recommend: question.recommend - 1 }});
			console.log(question.users, "pull");
			console.log(question.users);
			return res.status(200).json({ recommendUpdate: true, recommendation: question.recommend - 1});
		}
		else {
			await CodeRepositoryQ.findByIdAndUpdate( _id, { $addToSet : { user: user._id }, $set: { recommend: question.recommend + 1 } });
			console.log(question.users, "added");
			console.log(question.users);
			return res.status(200).json({ recommendUpdate: true, recommendation: question.recommend + 1});
		}
			
	} catch (err) {
		console.log("400: Failed in updating number of likes in code repository question. (PostRecommend in codeQController)");
        next(err);
    }
};


/*
 * delete : 하나의 코드저장소 질문을 삭제하는 것. 관련된 답변들도 다 삭제해야한다. 
 * 변경사항 : 작성자 본인만 삭제가 가능하도록 구현
 */
export const PostDeleteQuestion = async (req, res, next) => {
	const user = req.user;
	const { _id } = req.body;

	try {
		const checkauthor = await CodeRepositoryQ.findOne({ _id });
		res.locals.rawData = checkauthor;
		res.locals.schema = CodeRepositoryQ;
		
		if (checkauthor.author !== user.nickname) {
			return res.status(400).json({ deleteQuestion: false, reason: "only author of the post has authority to edit."});
		}

		await CodeRepositoryA.deleteMany({ codeq: _id });
        await CodeRepositoryQ.deleteOne({ _id });
		next();
    } catch (err) {
		console.log("400: Failed in deleting question. (PostDeleteQuestion in codeQController) ", err);
        next(err);
    }
};


