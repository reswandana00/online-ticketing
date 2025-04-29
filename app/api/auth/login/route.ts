import { NextResponse } from "next/server";
import sql from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { email, password } = body;

		if (!email || !password) {
			return NextResponse.json(
				{ message: "Missing email or password" },
				{ status: 400 },
			);
		}

		const users = await sql`SELECT * FROM users WHERE email = ${email}`;
		if (users.length === 0) {
			return NextResponse.json(
				{ message: "Invalid email or password" },
				{ status: 400 },
			);
		}

		const user = users[0];
		const match = await bcrypt.compare(password, user.password);

		if (!match) {
			return NextResponse.json(
				{ message: "Invalid email or password" },
				{ status: 400 },
			);
		}

		// Return user data without the password
		// Use destructuring without assignment to exclude password
		const { ...userWithoutPassword } = user;

		return NextResponse.json(
			{
				message: "Login successful",
				user: userWithoutPassword,
			},
			{ status: 200 },
		);
	} catch (error: unknown) {
		console.error("Login error:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 },
		);
	}
}
