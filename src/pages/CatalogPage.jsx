import ProductGrid from "../components/ProductGrid";
import useProducts from "../hooks/useProducts";
import Spinner from "../components/Spinner";
import Layout from "../components/Layout";

export default function CatalogPage() {
  const { data, loading, error } = useProducts();

  return (
    <Layout title="Product Catalog">
      {loading && <Spinner label="Loading products..." />}
      {!loading && !error && <ProductGrid products={data} />}
    </Layout>
  );
}
