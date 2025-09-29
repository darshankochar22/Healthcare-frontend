import React from "react";
import { FloatingNav } from "../ui/floating-navbar.jsx";
import { IconHome, IconUser, IconLogin, IconDatabase, IconLayout, IconDatabaseDollar, IconLogout } from "@tabler/icons-react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    
    const maxItems = [
        {name: "Home", link: "/", icon: <IconHome size={18}/> },
        {name: "About", link: "/about", icon: <IconDatabase size={18}/> },
        {name: "Hospitals", link:"/hospitals", icon: <IconLayout size={18}/> },
        {name: "Medicals", link:"/medicals", icon: <IconDatabase size={18} />},
        {name: "Feedback", link:"/feedback", icon: <IconDatabaseDollar size={18} />},
    ];

    const actionItems = isAuthenticated() ? [
        {name: user?.given_name || "Profile", link: "/profile", icon: <IconUser size={18}/> },
        {name: "Logout", link: "#", icon: <IconLogout size={18}/>, onClick: logout },
    ] : [
        {name: "Login", link: "/login", icon: <IconLogin size={18}/> },
        {name: "Sign Up", link: "/signup", icon: <IconUser size={18}/> },
    ];

    return <FloatingNav navItems={maxItems} actions={actionItems} />;
};

export default Navbar;