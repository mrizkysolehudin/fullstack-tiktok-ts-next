import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { GoVerified } from "react-icons/go";
import NoResults from "../../components/NoResults";
import VideoCard from "../../components/VideoCard";
import useAuthStore from "../../store/authStore";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";

const Search = ({ videos }: { videos: Video }) => {
	const router = useRouter();
	const { searchTerm }: any = router.query;
	const { allUsers } = useAuthStore();

	const [isAccounts, setIsAccounts] = useState(false);

	const searchAccounts = allUsers.filter((user: IUser) =>
		user.userName.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400";
	const isVideos = !isAccounts
		? "border-b-2 border-black font-bold"
		: "text-gray-400";

	return (
		<div className="w-full">
			<div className="flex gap-10 mb-10 border-b-2 border-gray-200 md:fixed z-50 bg-white w-full">
				<p
					onClick={() => setIsAccounts(true)}
					className={`text-xl  font-semibold cursor-pointer ${accounts} mt-2`}>
					Accounts
				</p>
				<p
					className={`text-xl font-semibold cursor-pointer ${isVideos} mt-2`}
					onClick={() => setIsAccounts(false)}>
					Videos
				</p>
			</div>
			{isAccounts ? (
				<div className="md:mt-16">
					{searchAccounts.length > 0 ? (
						searchAccounts.map((user: IUser, index: number) => (
							<Link key={index} href={`/profile/${user._id}`}>
								<div className=" flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
									<div>
										<Image
											width={50}
											height={50}
											className="rounded-full"
											src={user.image}
											alt="user-profile"
										/>
									</div>
									<div>
										<div>
											<p className="flex gap-1 items-center text-lg font-bold text-primary">
												{user.userName}{" "}
												<GoVerified className="text-blue-400" />
											</p>
											<p className="capitalize text-gray-400 text-sm">
												{user.userName}
											</p>
										</div>
									</div>
								</div>
							</Link>
						))
					) : (
						<NoResults
							text={`No Account Results for ${searchTerm}`}
						/>
					)}
				</div>
			) : (
				<div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
					{videos.length ? (
						videos.map((video: Video, index: number) => (
							<VideoCard key={index} post={video} />
						))
					) : (
						<NoResults
							text={`No Video Results for ${searchTerm}`}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export const getServerSideProps = async ({
	params: { searchTerm },
}: {
	params: { searchTerm: string };
}) => {
	const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

	return {
		props: {
			videos: res.data,
		},
	};
};

export default Search;
