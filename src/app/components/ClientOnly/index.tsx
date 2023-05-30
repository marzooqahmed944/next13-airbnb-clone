"use client";

import { useState, useEffect, FC, ReactNode } from "react";

interface IClientOnlyProps {
  children: ReactNode;
}

const ClientOnly: FC<IClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;
  return <>{children}</>;
};

export default ClientOnly;
