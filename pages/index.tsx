import axios from "axios";
import NoResults from "../components/NoResults";
import VideoCard from "../components/VideoCard";
import { Video } from "../types";

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

export async function getServerSideProps() {
	const { data } = await axios.get(`http://localhost:3001/api/post`);

	return {
		props: {
			videos: data,
		}, // will be passed to the page component as props
	};
}

export default Home;
