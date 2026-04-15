import { useState, useEffect } from "react";
import { categorieService } from "../api/categorieService";
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
                  <th className="px-6 py-3 font-bold">description</th>

                  {/* <th className="px-6 py-3 font-bold">titre</th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700 bg-white/5  ">
                {loading ? (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-4 text-center text-gray-400"
                    >
                      Chargement...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-4 text-center text-red-400"
                    >
                      {error}
                    </td>
                  </tr>
                ) : (
                  categories.map((cat, index) => (
                    <tr
                      className="hover:bg-gray-800 transition-colors bg-secondary border-b border-primary text-white"
                      key={cat.id}
                    >
                      <td className="px-6 py-4 ">#{index}</td>
                      <td className="px-6 py-4 ">{cat.name}</td>
                      <td className="px-6 py-4 ">{cat.description}</td>
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
