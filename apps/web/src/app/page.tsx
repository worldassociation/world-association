import Image from "next/image";
import { ConnectButton } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { accountAbstraction, client } from "./constants";
import Link from "next/link";

export default function Home() {
	return (
		<div className="py-20">
			<Header />

			<div className="flex justify-center mb-20">
				<ConnectButton
					client={client}
					accountAbstraction={accountAbstraction}
				/>
			</div>

			<Menu />

			<Footer />
		</div>
	);
}

function Header() {
	return (
		<header className="flex flex-col items-center mb-20 md:mb-20">
			<Image
				src={thirdwebIcon}
				alt=""
				width={120}
				style={{
					filter: "drop-shadow(0px 0px 24px #a726a9a8)",
				}}
			/>

			<h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
				Account Abstraction Examples
			</h1>

			<p className="text-zinc-300 text-base">
				Collection of ERC4337 examples using the thirdweb{" "}
				<a
					className="text-purple-400"
					target="_blank"
					href="https://portal.thirdweb.com/connect"
				>
					Connect SDK
				</a>
				.
			</p>
		</header>
	);
}

function Menu() {
	return (
		<div className="grid gap-4 lg:grid-cols-3 justify-center">
			<MenuItem
				title="Sponsored transactions"
				href="/gasless"
				description="Execute transactions without requiring users to hold ETH."
			/>

			<MenuItem
				title="Multichain transactions"
				href="/multichain"
				description="Execute transactions on different chains maintaining the same smart account address."
			/>

			<MenuItem
				title="Session keys"
				href="/session-keys"
				description="Add other admins and signers to your smart accounts"
			/>

			<MenuItem
				title="Batching transactions"
				href="/batching"
				description="Execute multiple transactions atomically."
			/>
		</div>
	);
}

function MenuItem(props: { title: string; href: string; description: string }) {
	return (
		<Link
			href={props.href}
			className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700"
		>
			<article>
				<h2 className="text-lg font-semibold mb-2">{props.title}</h2>
				<p className="text-sm text-zinc-400">{props.description}</p>
			</article>
		</Link>
	);
}

function Footer() {
	return (
		<div className="flex flex-col items-center mt-20">
			<Link
				className="text-center text-sm text-gray-400"
				target="_blank"
				href="https://github.com/thirdweb-example/account-abstraction"
			>
				View code on GitHub
			</Link>
		</div>
	);
}
