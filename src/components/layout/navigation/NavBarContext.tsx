"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface NavbarContextType {
	defaultColor: "white" | "black" | undefined;
	setDefaultColor: (value?: "white" | "black") => void;
	noAccents: boolean;
	setNoAccents: (value: boolean) => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const NavbarProvider = ({ children }: { children: ReactNode }) => {
	const [defaultColor, setDefaultColor] = useState<"white" | "black" | undefined>();
	const [noAccents, setNoAccents] = useState(false);

	return (
		<NavbarContext.Provider value={{ defaultColor, setDefaultColor, noAccents, setNoAccents }}>
			{children}
		</NavbarContext.Provider>
	);
};

export const useNavbar = () => {
	const context = useContext(NavbarContext);
	if (!context) throw new Error("useNavbar must be used within a NavbarProvider");
	return context;
};
