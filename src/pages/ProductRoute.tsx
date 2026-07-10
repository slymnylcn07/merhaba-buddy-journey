import { useParams } from "react-router-dom";
import { PRIMARY_PRODUCT_HANDLE } from "@/lib/product-config";
import ProductDetail from "@/pages/ProductDetail";
import SecondaryProductDetail from "@/pages/SecondaryProductDetail";

export default function ProductRoute() {
  const { handle = "" } = useParams();

  if (handle === PRIMARY_PRODUCT_HANDLE) {
    return <ProductDetail />;
  }

  return <SecondaryProductDetail />;
}
