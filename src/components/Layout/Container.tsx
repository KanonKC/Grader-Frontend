import React from "react";
import NevigationBar from "../Navbar/NevigationBar";

type Props = {
	children: string | JSX.Element | JSX.Element[]
};

const Container = ({ children }: Props) => {
	return <div>
		<NevigationBar />
		<div className="pt-10 mx-[10%] md:pt-24">{children}</div>
	</div>;
};

export default Container;
