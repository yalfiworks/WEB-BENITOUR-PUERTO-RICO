"use client";

import type { ReactNode } from "react";

const BOKUN_SRC =
  "https://widgets.bokun.io/online-sales/d9a0c12d-26e4-4dac-bb99-92aa2b0d5a8e/experience/1223590?partialView=1";

type BokunButtonProps = {
  id: string;
  className: string;
  children: ReactNode;
  ariaLabel?: string;
};

export function BokunButton({ id, className, children, ariaLabel }: BokunButtonProps) {
  return (
    <button
      className={`${className} bokunButton`}
      disabled
      id={id}
      type="button"
      data-src={BOKUN_SRC}
      data-testid="widget-book-button"
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
