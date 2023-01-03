import Image from "next/image";
import Link from "next/link";
import Logo from "../utils/tiktik-logo.png";

const Navbar = () => {
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
		</div>
	);
};

export default Navbar;
