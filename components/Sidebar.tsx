import Link from "next/link";
import React, { useState } from "react";
// import GoogleLogin from "react-google-login";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import Discover from "./Discover";
import Footer from "./Footer";
import SuggestedAccounts from "./SuggestedAccounts";

const Sidebar = () => {
	const [showSidebar, setShowSidebar] = useState(true);
	const userProfile = false;

	const normalLink =
		"flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded";

	return (
		<div>
			<div
				onClick={() => setShowSidebar((prev) => !prev)}
				className="block xl:hidden m-2 ml-4 mt-3 text-xl">
				{showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
			</div>
			{showSidebar && (
				<div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3 ">
					<div className="xl:border-b-2 border-gray-200 xl:pb-4">
						<Link href="/">
							<div className={normalLink}>
								<p className="text-2xl">
									<AiFillHome />
								</p>
								<span className="capitalize text-xl hidden xl:block">
									For You
								</span>
							</div>
						</Link>
					</div>

					<Discover />
					<SuggestedAccounts />
					<Footer />
				</div>
			)}
		</div>
	);
};

export default Sidebar;
