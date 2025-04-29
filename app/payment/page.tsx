"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

// Create a client component that uses useSearchParams
function PaymentContent() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const orderedTicketId = searchParams.get("orderedTicketId");

	// Mock ticket data since we're not using the API
	const [ticketData, setTicketData] = useState({
		kotaAsal: "Jakarta",
		kotaTujuan: "Bandung",
		kendaraan: "Bus",
		jumlahOrang: "2",
		harga: "150000",
	});

	// Simulate fetching ticket data
	useEffect(() => {
		// This would normally fetch data from the API
		console.log(`Ticket ID: ${orderedTicketId}`);

		// In a real app, we would fetch the ticket details using the ID
		// For now, we'll just use mock data
		// Mock different data based on the ticket ID to simulate real behavior
		if (orderedTicketId === "mock-ticket-123") {
			setTicketData({
				kotaAsal: "Jakarta",
				kotaTujuan: "Bandung",
				kendaraan: "Bus",
				jumlahOrang: "2",
				harga: "150000",
			});
		}
	}, [orderedTicketId]);

	const handlePayment = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		alert("Pembayaran berhasil! Terima kasih.");
		// Redirect to dashboard after payment
		router.push("/dashboard");
	};

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 -mt-10 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-[32px] row-start-2 items-center text-center max-w-3xl">
				<h1 className="text-6xl font-bold">Pembayaran</h1>

				<div className="text-xl flex flex-col gap-2">
					<p>
						<strong>ID Tiket:</strong> {orderedTicketId}
					</p>
					<p>
						<strong>Kota Asal:</strong> {ticketData.kotaAsal}
					</p>
					<p>
						<strong>Kota Tujuan:</strong> {ticketData.kotaTujuan}
					</p>
					<p>
						<strong>Jenis Kendaraan:</strong> {ticketData.kendaraan}
					</p>
					<p>
						<strong>Jumlah Orang:</strong> {ticketData.jumlahOrang}
					</p>
					<p>
						<strong>Total Harga:</strong> Rp {ticketData.harga}
					</p>
				</div>

				<form
					onSubmit={handlePayment}
					className="flex flex-col gap-6 w-full max-w-md text-left mt-8"
				>
					<div className="flex flex-col gap-2">
						<label htmlFor="metode" className="font-medium">
							Metode Pembayaran
						</label>
						<select
							id="metode"
							name="metode"
							className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-foreground"
							required
						>
							<option value="">Pilih Metode</option>
							<option value="transfer">Transfer Bank</option>
							<option value="ewallet">E-Wallet</option>
							<option value="kartu">Kartu Kredit</option>
						</select>
					</div>

					<button
						type="submit"
						className="mt-5 rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-lg h-12 px-5"
					>
						Bayar Sekarang
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

// Create a loading fallback component
function PaymentLoading() {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 -mt-10 sm:p-20">
			<main className="flex flex-col gap-[32px] row-start-2 items-center text-center max-w-3xl">
				<h1 className="text-6xl font-bold">Pembayaran</h1>
				<p>Loading payment details...</p>
			</main>
		</div>
	);
}

// Main page component with Suspense boundary
export default function Payment() {
	return (
		<Suspense fallback={<PaymentLoading />}>
			<PaymentContent />
		</Suspense>
	);
}
