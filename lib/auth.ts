import { compare, hash } from "bcrypt";

// Update the query import or define a proper type
import query from "./db";

// Define User type
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
	const existingUserResult = await query`
		SELECT * FROM users WHERE email = ${email}
	`;

	if (existingUserResult.length > 0) {
		throw new Error("User already exists");
	}

	// Hash the password
	const hashedPassword = await hash(password, 10);

	// Create the user
	const resultRows = await query`
		INSERT INTO users (email, password, name) 
		VALUES (${email}, ${hashedPassword}, ${name || null}) 
		RETURNING id, email, name, created_at, updated_at, is_verified
	`;

	return resultRows[0] as User;
}

export async function verifyCredentials(
	email: string,
	password: string,
): Promise<User | null> {
	// Find the user
	interface UserWithPassword extends User {
		password: string;
	}

	const resultRows = await query`
		SELECT * FROM users WHERE email = ${email}
	`;

	if (resultRows.length === 0) {
		return null;
	}

	const user = resultRows[0] as UserWithPassword;

	// Verify the password
	const isValid = await compare(password, user.password);

	if (!isValid) {
		return null;
	}

	// Return user without password
	// Use destructuring without assignment to exclude password
	const { ...userWithoutPassword } = user;
	return userWithoutPassword as User;
}

export async function getUserById(id: number): Promise<User | null> {
	const resultRows = await query`
		SELECT id, email, name, created_at, updated_at, is_verified 
		FROM users WHERE id = ${id}
	`;

	if (resultRows.length === 0) {
		return null;
	}

	return resultRows[0] as User;
}
