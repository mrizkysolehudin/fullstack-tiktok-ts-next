import React, { Dispatch, SetStateAction } from "react";
import useAuthStore from "../store/authStore";
import NoResults from "./NoResults";
import { IUser } from "../types";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";

interface IProps {
	isPostingComment: Boolean;
	comment: string;
	setComment: Dispatch<SetStateAction<string>>;
	addComment: (e: React.FormEvent) => void;
	comments: IComment[];
}

interface IComment {
	comment: string;
	length: number;
	_key: string;
	postedBy: { _ref: string; _id: string };
}

const Comments = ({
	isPostingComment,
	comment,
	setComment,
	addComment,
	comments,
}: IProps) => {
	const { userProfile, allUsers } = useAuthStore();

	return (
		<div className="border-t-2 border-gray-200 pt-4 px-10 mt-4 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
			<div className="overflow-scroll lg:h-[457px]">
				{comments?.length ? (
					comments.map((item, index) => (
						<>
							{allUsers.map(
								(user: IUser) =>
									user._id ===
										(item.postedBy._id ||
											item.postedBy._ref) && (
										<div
											className=" p-2 items-center"
											key={index}>
											<Link href={`/profile/${user._id}`}>
												<div className="flex items-start gap-3">
													<div className="w-12 h-12">
														<Image
															width={34}
															height={34}
															className="rounded-full cursor-pointer"
															src={user.image}
															alt="user-profile"
														/>
													</div>

													<div className="-ml-4 -mt-1">
														<p className="flex cursor-pointer gap-1 items-center  font-bold leading-6 text-primary">
															{user.userName
																.toLocaleLowerCase()
																.substring(
																	0,
																	16
																)
																.replace(
																	/\s+/g,
																	""
																)}{" "}
															<GoVerified className="text-blue-400" />
														</p>
														<p className="capitalize text-gray-400 text-xs">
															{user.userName}
														</p>
													</div>
												</div>
											</Link>
											<div>
												<p className="-mt-2 mb-3 mr-8 capitalize">
													{item.comment}
												</p>
											</div>
										</div>
									)
							)}
						</>
					))
				) : (
					<NoResults text="No Comments Yet! Be First to do add the comment." />
				)}
			</div>

			{userProfile && (
				<div className="absolute bottom-0 left-0  pb-6 px-2 md:px-10 ">
					<form onSubmit={addComment} className="flex gap-4">
						<input
							value={comment}
							onChange={(e) => setComment(e.target.value.trim())}
							className="bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
							placeholder="Add comment.."
						/>
						<button
							className="text-md text-gray-400 "
							onClick={addComment}>
							{isPostingComment ? "Commenting..." : "Comment"}
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default Comments;
