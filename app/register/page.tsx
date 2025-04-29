"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			setLoading(false);
			return;
		}

		try {
			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, password }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Registration failed");
			}

			// Redirect to login page on successful registration
			router.push("/login?registered=true");
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

				<h1 className="text-3xl font-bold">Create an Account</h1>

				{error && (
					<div className="w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded">
						{error}
					</div>
				)}

				<form className="w-full space-y-6" onSubmit={handleSubmit}>
					<div className="space-y-2">
						<label htmlFor="name" className="block text-sm font-medium">
							Name
						</label>
						<input
							id="name"
							name="name"
							type="text"
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
							placeholder="Your Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>

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

					<div className="space-y-2">
						<label
							htmlFor="confirmPassword"
							className="block text-sm font-medium"
						>
							Confirm Password
						</label>
						<input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							required
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
							placeholder="••••••••"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>

					<button
						type="submit"
						className="w-full rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-base h-12 px-5"
						disabled={loading}
					>
						{loading ? "Creating account..." : "Create Account"}
					</button>
				</form>

				<p className="text-center text-sm">
					Already have an account?{" "}
					<Link
						href="/login"
						className="font-medium hover:underline hover:underline-offset-4"
					>
						Sign in
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
