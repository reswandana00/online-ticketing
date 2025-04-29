import Link from "next/link";

export default function Home() {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 -mt-10 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-[32px] row-start-2 items-center text-center max-w-3xl">
				<h1 className="text-6xl font-bold">Online Ticketing System</h1>

				<p className="text-xl">
					Your one-stop solution for hassle-free event ticket booking and
					management. Purchase tickets, track events, and enjoy seamless
					experiences.
				</p>

				<div className="flex flex-col gap-10 w-full max-w-md">
					<Link
						className="mt-5 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-lg h-12 px-5"
						href="/login"
					>
						Get Started
					</Link>
				</div>
			</main>

			<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
				<p className="text-sm">
					© 2023 Online Ticketing System. All rights reserved.
				</p>
			</footer>
		</div>
	);
}
