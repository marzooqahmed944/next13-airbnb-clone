"use client";

import React from "react";

interface ComponentProps {
  children: React.ReactNode;
}

const Container: React.FC<ComponentProps> = ({ children }) => {
  return (
    <div className={"mx-auto max-w-[2520px] px-4 sm:px-2 md:px-10 xl:px-20"}>
      {children}
    </div>
  );
};

export default Container;
