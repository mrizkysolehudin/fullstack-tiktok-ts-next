import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import client from "../utils/client";
import { SanityAssetDocument } from "@sanity/client";
import { topics } from "../utils/constants";
import useAuthStore from "../store/authStore";
import axios from "axios";

const Upload = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [videoAsset, setVideoAsset] = useState<
		SanityAssetDocument | undefined
	>();
	const [wrongFileType, setWrongFileType] = useState(false);
	const [caption, setCaption] = useState("");
	const [topic, setTopic] = useState<String>(topics[0].name);
	const [savingPost, setSavingPost] = useState(false);

	const { userProfile }: { userProfile: any } = useAuthStore();

	const uploadVideo = async (e: any) => {
		const selectedFile = e.target.files[0];
		const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

		if (fileTypes.includes(selectedFile.type)) {
			client.assets
				.upload("file", selectedFile, {
					contentType: selectedFile.type,
					filename: selectedFile.name,
				})
				.then((data) => {
					setVideoAsset(data);
					setIsLoading(false);
				});
		} else {
			setIsLoading(false);
			setWrongFileType(true);
		}
	};

	const handlePost = async () => {
		if (caption && videoAsset?._id && topic) {
			setSavingPost(true);

			const document = {
				_type: "post",
				caption,
				video: {
					_type: "file",
					asset: {
						_type: "reference",
						_ref: videoAsset?._id,
					},
				},
				userId: userProfile?._id,
				postedBy: {
					_type: "postedBy",
					_ref: userProfile?._id,
				},
				topic: topic,
			};

			await axios.post("http://localhost:3001/api/post", document);

			router.push("/");
		}
	};

	return (
		<div className="flex w-full h-full absolute left-0 top-[60px] lg:top-[70px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center">
			<div className=" bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-center items-center p-14 pt-6">
				<div>
					<div>
						<p className="text-2xl font-bold">Upload Video</p>
						<p className="text-md text-gray-400 mt-1">
							Post a video to your account
						</p>
					</div>
					<div className=" border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center  outline-none mt-10 w-[260px] h-[458px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
						{isLoading ? (
							<p>Loading...</p>
						) : (
							<div>
								{videoAsset ? (
									<div>
										<video
											loop
											controls
											src={videoAsset.url}
											className="rounded-xl h-[462px] mt-16 bg-black"></video>
									</div>
								) : (
									<label className="cursor-pointer">
										<div className="flex flex-col items-center justify-center h-full">
											<div className="flex flex-col justify-center items-center">
												<p className="font-bold text-xl">
													<FaCloudUploadAlt className="text-gray-300 text-6xl" />
												</p>
												<p className="text-xl font-semibold">
													Select video to upload
												</p>
											</div>

											<p className="text-gray-400 text-center mt-10 text-sm leading-10">
												MP4 or WebM or ogg <br />
												720x1280 resolution or higher{" "}
												<br />
												Up to 10 minutes <br />
												Less than 2 GB
											</p>
											<p className="bg-[#F51997] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none">
												Select file
											</p>
										</div>
										<input
											type="file"
											name="upload-video"
											onChange={uploadVideo}
											className="w-0 h-0"
										/>
									</label>
								)}
							</div>
						)}
						{wrongFileType && (
							<p className="text-center text-xl text-red-500 font-semibold mt-4 w-[250px]">
								please select a video file
							</p>
						)}
					</div>
				</div>

				<div className="flex flex-col gap-3 pb-10">
					<label className="text-md font-medium">Caption</label>
					<input
						type="text"
						value={caption}
						onChange={(e) => setCaption(e.target.value)}
						className="rounded lg:after:w-650 outline-none text-md border-2 border-gray-200 p-2"
					/>
					<label className="text-md font-medium ">
						Choose a topic
					</label>

					<select
						onChange={(e) => {
							setTopic(e.target.value);
						}}
						className="outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer">
						{topics.map((item) => (
							<option
								key={item.name}
								className=" outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
								value={item.name}>
								{item.name}
							</option>
						))}
					</select>
					<div className="flex gap-6 mt-10">
						<button
							// onClick={handleDiscard}
							type="button"
							className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none">
							Discard
						</button>
						<button
							disabled={videoAsset?.url ? false : true}
							onClick={handlePost}
							type="button"
							className="bg-[#F51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none">
							{savingPost ? "Posting..." : "Post"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Upload;