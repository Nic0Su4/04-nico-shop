"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);
  const { subtotal, tax, total, totalItems } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  const router = useRouter();

  useEffect(() => {
    if (totalItems === 0 && loaded) {
      router.replace("/empty");
    }
  }, [totalItems, loaded, router]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p className="text-center">Cargando...</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">
          {totalItems === 1 ? "1 artículo" : `${totalItems} artículos`}
        </span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subtotal)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">
          {currencyFormat(total)}
        </span>
      </div>
    </div>
  );
};
