"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

export default function Booking() {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError("");

		const formData = new FormData(e.currentTarget);

		try {
			// Comment out the API call
			/*
			const response = await fetch("/api/order/ordered-tickets", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					kotaAsal: formData.get("kotaAsal"),
					kotaTujuan: formData.get("kotaTujuan"),
					kendaraan: formData.get("kendaraan"),
					jumlahOrang: formData.get("jumlahOrang"),
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				console.error("API error response:", data);
				throw new Error(data.message || "Failed to create ticket");
			}

			if (!data || !data.id) {
				console.error("Invalid ticket data received:", data);
				throw new Error("Invalid ticket data received");
			}

			console.log("Ticket created successfully:", data);
			*/

			// Mock successful response
			console.log("Form submitted with data:", {
				kotaAsal: formData.get("kotaAsal"),
				kotaTujuan: formData.get("kotaTujuan"),
				kendaraan: formData.get("kendaraan"),
				jumlahOrang: formData.get("jumlahOrang"),
			});

			// Use a mock ID for redirection
			const mockTicketId = "mock-ticket-123";

			// Redirect ke halaman pembayaran setelah tiket berhasil dibuat
			router.push(`/payment?orderedTicketId=${mockTicketId}`);
		} catch (err: unknown) {
			const errorMessage =
				err instanceof Error ? err.message : "An unknown error occurred";
			console.error("Error creating ticket:", err);
			setError(`Failed to create ticket: ${errorMessage}`);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 -mt-10 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-[32px] row-start-2 items-center text-center max-w-3xl">
				<h1 className="text-6xl font-bold">Pesan Tiket Online</h1>

				<p className="text-xl">
					Isi detail perjalananmu untuk memesan tiket dengan mudah dan cepat.
				</p>

				{error && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
						{error}
					</div>
				)}

				<form
					className="flex flex-col gap-6 w-full max-w-md text-left"
					onSubmit={handleSubmit}
				>
					<div className="flex flex-col gap-2">
						<label htmlFor="kotaAsal" className="font-medium">
							Kota Asal
						</label>
						<input
							type="text"
							id="kotaAsal"
							name="kotaAsal"
							className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-foreground"
							placeholder="Contoh: Jakarta"
							required
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label htmlFor="kotaTujuan" className="font-medium">
							Kota Tujuan
						</label>
						<input
							type="text"
							id="kotaTujuan"
							name="kotaTujuan"
							className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-foreground"
							placeholder="Contoh: Bandung"
							required
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label htmlFor="kendaraan" className="font-medium">
							Jenis Kendaraan
						</label>
						<select
							id="kendaraan"
							name="kendaraan"
							className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-foreground"
							required
						>
							<option className="text-black" value="">
								Pilih Kendaraan
							</option>
							<option className="text-black" value="Bus">
								Bus
							</option>
							<option className="text-black" value="Kereta">
								Kereta
							</option>
							<option className="text-black" value="Pesawat">
								Pesawat
							</option>
						</select>
					</div>

					<div className="flex flex-col gap-2">
						<label htmlFor="jumlahOrang" className="font-medium">
							Jumlah Orang
						</label>
						<input
							type="number"
							id="jumlahOrang"
							name="jumlahOrang"
							className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-foreground"
							min="1"
							placeholder="Contoh: 2"
							required
						/>
					</div>

					<button
						type="submit"
						className="mt-5 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-lg h-12 px-5"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Processing..." : "Pesan Tiket"}
					</button>
				</form>
			</main>

			<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
				<p className="text-sm">
					© 2023 Online Ticketing System. All rights reserved.
				</p>
			</footer>
		</div>
	);
}
