import { compare, hash } from "bcrypt";

// Update the query import or define a proper type
import query from "./db";

// Define the expected return type from your database query
interface QueryResult<T> {
	rows: T[];
}

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
	const existingUser = (await query<User>(
		"SELECT * FROM users WHERE email = $1",
		[email],
	)) as QueryResult<User>;

	if (existingUser.rows.length > 0) {
		throw new Error("User already exists");
	}

	// Hash the password
	const hashedPassword = await hash(password, 10);

	// Create the user
	const result = (await query<User>(
		"INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name, created_at, updated_at, is_verified",
		[email, hashedPassword, name || null],
	)) as QueryResult<User>;

	return result.rows[0];
}

export async function verifyCredentials(
	email: string,
	password: string,
): Promise<User | null> {
	// Find the user
	interface UserWithPassword extends User {
		password: string;
	}

	const result = (await query<UserWithPassword>(
		"SELECT * FROM users WHERE email = $1",
		[email],
	)) as QueryResult<UserWithPassword>;

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
	// Use underscore prefix to indicate intentionally unused variable
	const { password: _password, ...userWithoutPassword } = user;
	return userWithoutPassword as User;
}

export async function getUserById(id: number): Promise<User | null> {
	const result = (await query<User>(
		"SELECT id, email, name, created_at, updated_at, is_verified FROM users WHERE id = $1",
		[id],
	)) as QueryResult<User>;

	if (result.rows.length === 0) {
		return null;
	}

	return result.rows[0];
}
