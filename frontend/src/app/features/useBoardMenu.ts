import { useState } from "react";

const useBoardMenu = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleMenuToggle = (id: string) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  return {
    openMenu,
    handleMenuToggle,
  };
};

export default useBoardMenu;