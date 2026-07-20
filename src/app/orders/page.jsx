import { Suspense } from "react";
import StudioOrders from "@/components/StudioOrders";

export default function OrdersPage() {
  return (
    <Suspense fallback={null}>
      <StudioOrders />
    </Suspense>
  );
}
