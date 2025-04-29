"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Login failed");
			}

			// Store user data in localStorage (in a real app, you'd use cookies or a more secure method)
			localStorage.setItem("user", JSON.stringify(data.user));

			// Redirect to dashboard on successful login
			router.push("/dashboard");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-[32px] row-start-2 items-center w-full max-w-md">
				<Link href="/">
					<Image
						className="dark:invert mb-8"
						src="/next.svg"
						alt="Ticketing System Logo"
						width={180}
						height={38}
						priority
					/>
				</Link>

				<h1 className="text-3xl font-bold">Login</h1>

				{error && (
					<div className="w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded">
						{error}
					</div>
				)}

				<form className="w-full space-y-6" onSubmit={handleSubmit}>
					<div className="space-y-2">
						<label htmlFor="email" className="block text-sm font-medium">
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							required
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
							placeholder="your@email.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="password" className="block text-sm font-medium">
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							required
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
							placeholder="••••••••"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<input
								id="remember-me"
								name="remember-me"
								type="checkbox"
								className="h-4 w-4 border-gray-300 rounded"
							/>
							<label htmlFor="remember-me" className="ml-2 block text-sm">
								Remember me
							</label>
						</div>

						<div className="text-sm">
							<Link
								href="/forgot-password"
								className="hover:underline hover:underline-offset-4"
							>
								Forgot your password?
							</Link>
						</div>
					</div>

					<button
						type="submit"
						className="w-full rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-base h-12 px-5"
						disabled={loading}
					>
						{loading ? "Signing in..." : "Sign in"}
					</button>
				</form>

				<p className="text-center text-sm">
					Don't have an account?{" "}
					<Link
						href="/register"
						className="font-medium hover:underline hover:underline-offset-4"
					>
						Create one!
					</Link>
				</p>
			</main>

			<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
				<p className="text-sm">
					© 2023 Online Ticketing System. All rights reserved.
				</p>
			</footer>
		</div>
	);
}
