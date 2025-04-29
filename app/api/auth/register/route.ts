import { NextResponse } from "next/server";
import sql from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { name, email, password } = body;

		if (!email || !password) {
			return NextResponse.json(
				{ message: "Missing email or password" },
				{ status: 400 },
			);
		}

		const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
		if (existingUser.length > 0) {
			return NextResponse.json(
				{ message: "Email already registered" },
				{ status: 400 },
			);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		// Include name in the user record if provided
		if (name) {
			await sql`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${hashedPassword})`;
		} else {
			await sql`INSERT INTO users (email, password) VALUES (${email}, ${hashedPassword})`;
		}

		return NextResponse.json(
			{ message: "User registered successfully" },
			{ status: 201 },
		);
	} catch (error) {
		console.error("Registration error:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 },
		);
	}
}
