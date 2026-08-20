import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { categorieService } from "../../api/categorieService";
import {formatId} from "../../utils/format";
export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    categorieService
      .getAll()
      .then((res) => setCategories(res.data))
      .catch(() => setError("Erreur de chargement"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Catalogue
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">
          Catégories
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Liste des catégories disponibles.
        </p>
      </div>

      <section className="table-shell">
        <table className="table-auto w-full text-left">
          <thead className="table-head">
            <tr className="border-b border-slate-200">
              <th className="px-6 py-3 font-semibold">#</th>
              <th className="px-6 py-3 font-semibold">Nom</th>
              <th className="px-6 py-3 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
                {loading ? (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-6 text-center text-slate-500"
                    >
                      Chargement...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-6 text-center text-rose-600"
                    >
                      {error}
                    </td>
                  </tr>
                ) : (
                  categories.map((cat) => (
                    <tr className="transition-colors hover:bg-slate-50" key={cat.id}>
                      <td className="px-6 py-4 text-slate-600">#{formatId(cat.id)}</td>
                      <td className="px-6 py-4 text-slate-900">{cat.name}</td>
                      <td className="px-6 py-4 text-slate-700">{cat.description}</td>
                    </tr>
                  ))
                )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
