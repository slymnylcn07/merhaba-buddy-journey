import { Navigate, useLocation, useParams } from "react-router-dom";
import { getLandingVariantId, productLandingPath } from "@/lib/product-landing";
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
  const { search, hash } = useLocation();
  const publicHandle = getPublicProductHandle(handle);

  if (publicHandle !== handle) {
    return <Navigate to={productLandingPath(getProductPath(handle), search, hash)} replace />;
  }

  const shopifyHandle = resolveShopifyProductHandle(handle);

  if (shopifyHandle === PRIMARY_PRODUCT_HANDLE) {
    return <ProductDetail key={`${handle}:${getLandingVariantId(search) || ""}`} />;
  }

  return <SecondaryProductDetail key={`${handle}:${getLandingVariantId(search) || ""}`} />;
}
