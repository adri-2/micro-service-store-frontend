import { useState, useEffect } from "react";
import { categorieService } from "../api/categorieService";
import NavBar from "../components/NavBar";
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

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-700">{error}</p>;

  return (
    <div className="bg-gray-950 h-screen">
      <div className="flex flex-col">
        {/* menu */}
        <NavBar />
        {/* liste */}
        <section className="w-full ">
          <div className="overflow-x-auto  border border-gray-700">
            <table className="table-auto text-left  w-full">
              <thead className="bg-gray-950 text-primary uppercase text-sm ">
                <tr className=" border-b border-primary ">
                  <th className="px-6 py-3 font-bold">#</th>
                  <th className="px-6 py-3 font-bold">Nom</th>
                  <th className="px-6 py-3 font-bold">description</th>

                  {/* <th className="px-6 py-3 font-bold">titre</th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700 bg-white/5  ">
                {categories.map((cat) => (
                  <tr
                    className="hover:bg-gray-800 transition-colors bg-secondary border-b border-primary"
                    key={cat.id}
                  >
                    <td className="px-6 py-4 text-primary">{cat.id}</td>
                    <td className="px-6 py-4 text-primary">{cat.name}</td>
                    <td className="px-6 py-4 text-primary">
                      {cat.description}
                    </td>
                    {/* <td className="px-6 py-4 text-primary">{cat.name}</td> */}
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
