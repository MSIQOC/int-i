// 백엔드는 기본적으로 /api 라우팅 사용.


const USER = "/user";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";

const USERINFO = "/userinfo";
const DELUSER = "/deluser";

const EDITPROFILE = "/editprofile";

const API = "/api";
const AUTH = "/auth";
const CALLBACK = "/callback";
const ADMIN = "/admin";
const INTI = "/inti";
const QUESTION = "/question";

const GITHUB = "/github";
const KAKAO = "/kakao";
const GOOGLE = "/google";
// const GLOBAL_SEARCH = "";

//질문게시판
const WRITEQUES = "/writeques";
const DELQUES = "/delques";
const EDITQUES = "/editques";
const ONEQUES = "/oneques";


const routes = {
	user: USER,
	login: LOGIN,
	logout: LOGOUT,
	join: JOIN,

	api: API,
	auth: AUTH,
	callback: CALLBACK,
	userinfo: USERINFO,
	admin: ADMIN,
	inti: INTI,
	question: QUESTION,
	deluser: DELUSER,
	editprofile: EDITPROFILE,

	github: GITHUB,
	kakao: KAKAO,
	google: GOOGLE,

	//질문게시판
	writeques: WRITEQUES,
	delques: DELQUES,
	editques: EDITQUES,
	oneques: ONEQUES

}

export default routes;