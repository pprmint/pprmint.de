import type { AccessArgs } from "payload";
import type { User } from "@/payload-types";

export const withRole = (roles: User["role"][]) => {
	return ({ req: { user } }: AccessArgs<User>) => {
		return !!user && roles.includes(user.role);
	};
};
