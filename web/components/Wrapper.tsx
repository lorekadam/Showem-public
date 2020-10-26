import React from "react";
import { NextPage } from "next";
import { PageBackground } from "./PageBackground";
import { NavBar, NavBarProps } from "./NavBar";

interface WrapperProps {
  navbar?: NavBarProps;
}

export const Wrapper: NextPage<WrapperProps> = ({ children, navbar }) => {
  return (
    <PageBackground>
      <NavBar {...navbar} />
      {children}
    </PageBackground>
  );
};

export default Wrapper;
