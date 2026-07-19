import { Navigate, useParams } from "react-router-dom";
import {
  getProductPath,
  getPublicProductHandle,
  PRIMARY_PRODUCT_HANDLE,
  resolveShopifyProductHandle,
} from "@/lib/product-config";
import ProductDetail from "@/pages/ProductDetail";
import SecondaryProductDetail from "@/pages/SecondaryProductDetail";

export default function ProductRoute() {
  const { handle = "" } = useParams();
  const publicHandle = getPublicProductHandle(handle);

  if (publicHandle !== handle) {
    return <Navigate to={getProductPath(handle)} replace />;
  }

  const shopifyHandle = resolveShopifyProductHandle(handle);

  if (shopifyHandle === PRIMARY_PRODUCT_HANDLE) {
    return <ProductDetail key={handle} />;
  }

  return <SecondaryProductDetail key={handle} />;
}
