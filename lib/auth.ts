import { query } from "./db";
import { compare, hash } from "bcrypt";

export type User = {
	id: number;
	email: string;
	name: string | null;
	created_at: Date;
	updated_at: Date;
	is_verified: boolean;
};

export async function createUser(
	email: string,
	password: string,
	name?: string,
): Promise<User> {
	// Check if user already exists
	const existingUser = await query("SELECT * FROM users WHERE email = $1", [
		email,
	]);

	if (existingUser.rows.length > 0) {
		throw new Error("User already exists");
	}

	// Hash the password
	const hashedPassword = await hash(password, 10);

	// Create the user
	const result = await query(
		"INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name, created_at, updated_at, is_verified",
		[email, hashedPassword, name || null],
	);

	return result.rows[0];
}

export async function verifyCredentials(
	email: string,
	password: string,
): Promise<User | null> {
	// Find the user
	const result = await query("SELECT * FROM users WHERE email = $1", [email]);

	if (result.rows.length === 0) {
		return null;
	}

	const user = result.rows[0];

	// Verify the password
	const isValid = await compare(password, user.password);

	if (!isValid) {
		return null;
	}

	// Return user without password
	const { password: _, ...userWithoutPassword } = user;
	return userWithoutPassword as User;
}

export async function getUserById(id: number): Promise<User | null> {
	const result = await query(
		"SELECT id, email, name, created_at, updated_at, is_verified FROM users WHERE id = $1",
		[id],
	);

	if (result.rows.length === 0) {
		return null;
	}

	return result.rows[0];
}
