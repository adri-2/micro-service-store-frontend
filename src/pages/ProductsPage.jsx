import React, { useEffect, useState } from "react";
import { productService } from "../api/categorieService";
import NavBar from "../components/NavBar";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    productService
      .getAll()
      .then((res) => setProducts(res.data))
      .catch(() => setError("Erreur de chargement"))
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-700">{error}</p>;
  console.log("//", products);

  return (
    <div className="bg-gray-950 h-screen">
      <div className="flex flex-col">
        {/* menu */}
        {/*  */}
        <NavBar />
        {/* liste */}
        <section className="w-full ">
          <div className="overflow-x-auto  border border-gray-700">
            <table className="table-auto text-left  w-full">
              <thead className="bg-gray-950 text-primary uppercase text-sm ">
                <tr className=" border-b border-primary ">
                  <th className="px-6 py-3 font-bold">#</th>
                  <th className="px-6 py-3 font-bold">Nom</th>
                  <th className="px-6 py-3 font-bold">prix</th>
                  <th className="px-6 py-3 font-bold">description</th>
                  <th className="px-6 py-3 font-bold">categorie</th>
                  <th className="px-6 py-3 font-bold">stock</th>
                  <th className="px-6 py-3 font-bold">suppliers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700 bg-white/5  ">
                {products.map((product) => (
                  <tr
                    className="hover:bg-gray-800 transition-colors bg-secondary border-b border-primary"
                    key={product.id}
                  >
                    <td className="px-6 py-4 text-primary">{product.id}</td>
                    <td className="px-6 py-4 text-primary">{product.name}</td>
                    <td className="px-6 py-4 text-primary">{product.price}</td>
                    <td className="px-6 py-4 text-primary">
                      {product.description}
                    </td>
                    <td className="px-6 py-4 text-primary">
                      {product.category_name}
                    </td>
                    <td className="px-6 py-4 text-primary">{product.stock}</td>
                    <td className="px-6 py-4 text-primary">
                      {product.suppliers_name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProductsPage;
