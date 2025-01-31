"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface NavbarContextType {
	inverted: boolean;
	setInverted: (value: boolean) => void;
	noAccents: boolean;
	setNoAccents: (value: boolean) => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const NavbarProvider = ({ children }: { children: ReactNode }) => {
	const [inverted, setInverted] = useState(false);
	const [noAccents, setNoAccents] = useState(false);

	return <NavbarContext.Provider value={{ inverted, setInverted, noAccents, setNoAccents }}>{children}</NavbarContext.Provider>;
};

export const useNavbar = () => {
	const context = useContext(NavbarContext);
	if (!context) throw new Error("useNavbar must be used within a NavbarProvider");
	return context;
};
