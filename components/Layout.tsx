import React, { useContext, ReactNode } from "react";
import Header from "./Header";

interface Layoutprops {
  children: ReactNode;
}

function Layout({ children }: Layoutprops) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default Layout;
