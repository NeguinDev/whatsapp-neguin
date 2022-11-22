import ReactLoading from "react-loading";

import "../../style.css";

export default function Loading() {
	return (
		<div className="app">
			<ReactLoading type="spinningBubbles" color="#fff" />
		</div>
	);
}