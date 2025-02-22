"use client";

import { useConfettiStore } from "../../../hooks/use-confetti-store";

export const ConfettiProvider = () => {
  const confetti = useConfettiStore();

  if(!confetti)
};
