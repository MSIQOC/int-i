import logo from "../../../assets/images/logo/logo.png";
import style from "./Header.module.scss"

const Header = () => {
	return (
		<header className={style.header}>
			<div className={style.contents}>
				<div className={style.logo}>
					<img src={logo}
					width="60"
					heigh="60"
					alt="인트아이 로고" />
					<div>인트아이</div>
				</div>

				<nav className={style.navigation}>
					<ul>
						<li>
							코드 저장소
						</li>
						<li>
							질문
						</li>
						<li>
							기술 뉴스
						</li>
						<li>
							정보 및 홍보
						</li>
						<li>
							공지사항
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}

export default Header