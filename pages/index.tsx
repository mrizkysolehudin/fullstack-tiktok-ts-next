import axios from "axios";
import NoResults from "../components/NoResults";
import VideoCard from "../components/VideoCard";
import { Video } from "../types";
import { BASE_URL } from "../utils";

interface IProps {
	videos: Video[];
}

const Home = ({ videos }: IProps) => {
	return (
		<div className="flex flex-col gap-10 videos h-full">
			{videos.length ? (
				videos.map((video: Video) => (
					<VideoCard key={video._id} post={video} />
				))
			) : (
				<NoResults text="No Videos" />
			)}
		</div>
	);
};

export async function getServerSideProps({
	query: { topic },
}: {
	query: { topic: string };
}) {
	let response = null;
	if (topic) {
		response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
	} else {
		response = await axios.get(`${BASE_URL}/api/post`);
	}

	return {
		props: {
			videos: response.data,
		}, // will be passed to the page component as props
	};
}

export default Home;
