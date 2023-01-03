import { NextPage } from "next";
import React, { useState, useRef } from "react";
import { Video } from "../types";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { BsPlay } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

interface IProps {
	post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
	const [isHover, setIsHover] = useState(false);
	const [playing, setPlaying] = useState(false);
	const [isVideoMuted, setIsVideoMuted] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);

	const onVideoPress = () => {
		if (playing) {
			videoRef?.current?.pause();
			setPlaying(false);
		} else {
			videoRef?.current?.play();
			setPlaying(true);
		}
	};
	return (
		<div className="flex flex-col border-b-2 border-gray-200 pb-6">
			<div>
				<div className="flex gap-3 p-2 cursor-pointer font-semibold rounded mb-2">
					<div className="md:w-16 md:h-16 w-10 h-10">
						<Link href="/">
							<>
								{/* <div className="md:w-16 md:h-16 w-10 h-10 relative">
									<Image
										src={post.postedBy.image}
										alt="porfile photo"
										fill
										className="rounded-full"
									/>
								</div> */}
								<Image
									src={post.postedBy.image}
									alt="porfile photo"
									width={62}
									height={62}
									className="rounded-full md:w-16 md:h-16 w-10 h-10"
								/>
							</>
						</Link>
					</div>

					<div>
						<Link href={`/`}>
							<div className="flex items-center gap-2">
								<p className="flex gap-2 items-center md:text-md font-bold text-primary">
									{post.postedBy.userName}{" "}
									<GoVerified className="text-blue-400 text-md" />
								</p>
								<p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
									{post.postedBy.userName}
								</p>
							</div>
						</Link>
						<Link href={`/`}>
							<p className="mt-2 font-normal ">{post.caption}</p>
						</Link>
					</div>
				</div>
			</div>
			<div className="lg:ml-20 flex gap-4 relative">
				<div
					onMouseEnter={() => setIsHover(true)}
					onMouseLeave={() => setIsHover(false)}
					className="rounded-3xl">
					<Link href="/">
						<video
							loop
							ref={videoRef}
							src={post.video.asset.url}
							className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"></video>
					</Link>

					{isHover && (
						<div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] lg:w-[600px] py-3 px-7 ">
							{playing ? (
								<button onClick={onVideoPress}>
									<BsFillPauseFill />
								</button>
							) : (
								<button onClick={onVideoPress}>
									<BsFillPlayFill />
								</button>
							)}
							{isVideoMuted ? (
								<button onClick={() => setIsVideoMuted(false)}>
									<HiVolumeOff />
								</button>
							) : (
								<button onClick={() => setIsVideoMuted(true)}>
									<HiVolumeUp />
								</button>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default VideoCard;
