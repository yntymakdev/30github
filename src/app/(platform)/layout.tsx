import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

interface PlatformLayoutProps {
    children: React.ReactNode;
}

const PlatformLayout: React.FC<PlatformLayoutProps> = ({ children }) => {
    return <ClerkProvider>{children}</ClerkProvider>;
};

export default PlatformLayout;
