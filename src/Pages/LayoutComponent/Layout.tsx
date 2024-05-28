import React from "react";
import Footer from "../../Components/Footer/Footer";
import "./Layout.css"; // Create this file for any specific styling needed for the layout
import NavBarWhite from "../../Components/NavBar/NavBarWhite/NavBarWhite";

interface PageLayoutProps {
  children: React.ReactNode;
}
const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="page-layout">
      <div>
        <NavBarWhite />
      </div>
      <div className="page-layout-content">
        {children}
      </div>
      <div className="main-footer py-5">
        <Footer />
      </div>
    </div>
  );
};

export default PageLayout;
