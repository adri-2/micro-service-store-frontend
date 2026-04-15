import React, { useEffect, useState } from "react";
import { productService } from "../api/categorieService";
import { formatCurrency, formatDate } from "../utils/format";

function ProductsList() {
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
  console.log("//", products);

  return (
    <div className="bg-gray-950 h-screen">
      <div className="flex flex-col">
        {/* liste */}
        <section className="w-full ">
          <div className="max-h-[70vh] border border-gray-700">
            <table className="table-auto text-left  w-full">
              <thead className="bg-gray-950 text-primary uppercase text-sm sticky top-0 z-20">
                <tr className=" border-b border-primary ">
                  <th className="px-6 py-3 font-bold">#</th>
                  <th className="px-6 py-3 font-bold">Nom</th>
                  <th className="px-6 py-3 font-bold">prix</th>
                  <th className="px-6 py-3 font-bold">description</th>
                  <th className="px-6 py-3 font-bold">categorie</th>
                  {/* <th className="px-6 py-3 font-bold">stock</th> */}
                  <th className="px-6 py-3 font-bold">suppliers</th>
                  <th className="px-6 py-3 font-bold">cree le</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700 bg-white/5  ">
                {loading ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-4 text-center text-gray-400"
                    >
                      Chargement...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-4 text-center text-red-400"
                    >
                      {error}
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      Aucune commande trouvee.
                    </td>
                  </tr>
                ) : (
                  products.map((product, index) => (
                    <tr
                      className="hover:bg-gray-800 transition-colors bg-secondary border-b border-primary text-white"
                      key={product.id}
                    >
                      <td className="px-6 py-4 ">#{index}</td>
                      <td className="px-6 py-4 ">{product.name}</td>
                      <td className="px-6 py-4 ">
                        {formatCurrency(product.price)}
                      </td>
                      <td className="px-6 py-4 ">{product.description}</td>
                      <td className="px-6 py-4 ">{product.category_name}</td>
                      {/* <td className="px-6 py-4 ">{product.stock}</td> */}
                      <td className="px-6 py-4 ">{product.suppliers_name}</td>
                      <td className="px-6 py-4">
                        {formatDate(product.created_at)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProductsList;
