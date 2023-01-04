import Image from "next/image";
import Link from "next/link";
import Logo from "../utils/tiktik-logo.png";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetUser } from "../utils";
import useAuthStore from "../store/authStore";
import { AiOutlineLogout } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";

const Navbar = () => {
	const {
		userProfile,
		addUser,
		removeUser,
	}: { userProfile: any; addUser: any; removeUser: any } = useAuthStore();

	return (
		<div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
			<Link href="/">
				<div className="w-[100px] md:w-[129px] md:h-[30px] h-[38px]">
					<Image
						src={Logo}
						alt="tiktik-logo"
						className="cursor-pointer"
					/>
				</div>
			</Link>

			<div>SEARCH</div>

			<div>
				{userProfile ? (
					<div className="flex gap-5 md:gap-10">
						<Link href="/upload">
							<button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
								<IoMdAdd className="text-xl" />{" "}
								<span className="hidden md:block">Upload </span>
							</button>
						</Link>
						{userProfile.image && (
							<Link href="/">
								<div className="w-[30px] relative rounded-full md:w-[42px] md:h-[42px] h-[30px]">
									<Image
										src={userProfile.image}
										alt="profile photo"
										fill
										className="rounded-full cursor-pointer"
									/>
								</div>
							</Link>
						)}
						<button
							type="button"
							className="px-2"
							onClick={() => {
								googleLogout();
								removeUser();
							}}>
							<AiOutlineLogout color="red" fontSize={21} />
						</button>
					</div>
				) : (
					<div>
						<GoogleLogin
							onSuccess={(response) =>
								createOrGetUser(response, addUser)
							}
							onError={() => console.log("Error")}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
