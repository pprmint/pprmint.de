"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface NavbarContextType {
	showNavbarGradient: boolean;
	setShowNavbarGradient: (value: boolean) => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const NavbarProvider = ({ children }: { children: ReactNode }) => {
	const [showNavbarGradient, setShowNavbarGradient] = useState(false);

	return <NavbarContext.Provider value={{ showNavbarGradient, setShowNavbarGradient }}>{children}</NavbarContext.Provider>;
};

export const useNavbar = () => {
	const context = useContext(NavbarContext);
	if (!context) throw new Error("useNavbar must be used within a NavbarProvider");
	return context;
};
