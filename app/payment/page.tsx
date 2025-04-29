"use client";

import { useSearchParams } from "next/navigation";

export default function Payment() {
	const searchParams = useSearchParams();
	const kotaAsal = searchParams.get("kotaAsal");
	const kotaTujuan = searchParams.get("kotaTujuan");
	const kendaraan = searchParams.get("kendaraan");
	const jumlahOrang = searchParams.get("jumlahOrang");

	const handlePayment = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		alert("Pembayaran berhasil! Terima kasih.");
	};

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 -mt-10 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-[32px] row-start-2 items-center text-center max-w-3xl">
				<h1 className="text-6xl font-bold">Pembayaran</h1>

				<div className="text-xl flex flex-col gap-2">
					<p>
						<strong>Kota Asal:</strong> {kotaAsal}
					</p>
					<p>
						<strong>Kota Tujuan:</strong> {kotaTujuan}
					</p>
					<p>
						<strong>Jenis Kendaraan:</strong> {kendaraan}
					</p>
					<p>
						<strong>Jumlah Orang:</strong> {jumlahOrang}
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
