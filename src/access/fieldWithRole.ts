import type { User } from "@/payload-types";
import type { FieldAccess } from "payload";

export const fieldWithRole = (roles: User["role"][]): FieldAccess<any, any> => {
	return ({ req: { user } }) => {
		return !!user && roles.includes(user.role);
	};
};
