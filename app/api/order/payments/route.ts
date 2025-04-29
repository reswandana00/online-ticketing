import { NextResponse } from "next/server";
import sql from "@/lib/db"; // Menggunakan koneksi DB yang telah dibuat sebelumnya

export async function POST(request: Request) {
	try {
		const { orderedTicketId, metode } = await request.json();

		if (!orderedTicketId || !metode) {
			return NextResponse.json(
				{ message: "Missing required fields" },
				{ status: 400 },
			);
		}

		// Cek apakah tiket dengan ID tersebut ada
		const ticketResult = await sql`
      SELECT * FROM ordered_tickets WHERE id = ${orderedTicketId};
    `;
		if (ticketResult.length === 0) {
			return NextResponse.json(
				{ message: "Ordered ticket not found" },
				{ status: 404 },
			);
		}

		const paymentResult = await sql`
      INSERT INTO payments (ordered_ticket_id, metode)
      VALUES (${orderedTicketId}, ${metode})
      RETURNING *;
    `;

		const payment = paymentResult.rows[0]; // Ambil data pembayaran yang baru disimpan

		return NextResponse.json(payment, { status: 201 });
	} catch (error) {
		console.error("Error processing payment:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 },
		);
	}
}
