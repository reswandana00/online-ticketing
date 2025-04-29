import { NextResponse } from "next/server";
import sql from "@/lib/db";

// GET handler to test database connection
export async function GET() {
	try {
		// Query the database version
		const result = await sql`SELECT version()`;

		return NextResponse.json({
			status: "connected",
			message: "Database connection successful",
			version: result[0].version,
		});
	} catch (error) {
		console.error("Database connection error:", error);
		return NextResponse.json(
			{ status: "error", message: "Failed to connect to database" },
			{ status: 500 },
		);
	}
}
