import React, { useEffect, useState } from "react";
import { productService } from "../../api/categorieService";
import { formatCurrency, formatDate,formatId} from "../../utils/format";
import { Link } from "react-router-dom";

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
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Catalogue
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Produits
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Liste des produits disponibles.
          </p>
        </div>
        <Link to="/product/new" className="btn-primary">
          Nouveau produit
        </Link>
      </div>

      <section className="table-shell">
        <table className="table-auto w-full text-left">
          <thead className="table-head">
            <tr className="border-b border-slate-200">
              <th className="px-6 py-3 font-semibold">#</th>
              <th className="px-6 py-3 font-semibold">Nom</th>
              <th className="px-6 py-3 font-semibold">Prix</th>
              <th className="px-6 py-3 font-semibold">Description</th>
              <th className="px-6 py-3 font-semibold">Catégorie</th>
              <th className="px-6 py-3 font-semibold">Qte</th>
              <th className="px-6 py-3 font-semibold">Créé le</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
                {loading ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-6 text-center text-slate-500"
                    >
                      Chargement...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-6 text-center text-rose-600"
                    >
                      {error}
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-6 text-center text-slate-500"
                    >
                      Aucun produit trouvé.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr className="transition-colors hover:bg-slate-50" key={product.id}>
                      <td className="px-6 py-4 text-slate-600">#{formatId(product.id)}</td>
                      <td className="px-6 py-4 text-slate-900">{product.name}</td>
                      <td className="px-6 py-4 text-slate-700">
                        {formatCurrency(product.price)}
                      </td>
                      <td className="px-6 py-4 text-slate-700">{product.description}</td>
                      <td className="px-6 py-4 text-slate-700">{product.reserved_stock}</td>
                      {/* <td className="px-6 py-4 ">{product.stock}</td> */}
                      <td className="px-6 py-4 text-slate-700">{product.stock}</td>
                      <td className="px-6 py-4 text-slate-700">
                        {formatDate(product.created_at)}
                      </td>
                    </tr>
                  ))
                )}
          </tbody>
        </table>
        </section>
    </div>
  );
}

export default ProductsList;
