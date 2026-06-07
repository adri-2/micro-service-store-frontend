import React, { useEffect, useState } from "react";
import { supplierService } from "../../api/supplierService";
import { Link } from "react-router-dom";

function SuppliersList() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const supplierservice = () => {
    supplierService
      .getAll()
      .then((res) => setSuppliers(res.data))
      .catch(() => setError("Erreur de chargement"))
      .finally(() => setLoading(false));
  };
  useEffect(supplierservice, []);
  console.log("///", suppliers);

  return (
    <div className="bg-gray-950 h-screen">
      <div className="flex flex-col">
        {/* <div className="flex items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Fournisseurs</h1>
            <p className="text-sm text-gray-400">
              Liste des fournisseurs disponibles.
            </p>
          </div>

          <Link to="/suppliers/new" className="btn-primary">
            Nouveau fournisseur
          </Link>
        </div> */}
        {/* liste */}
        <section className="w-full ">
          <div className="max-h-[70vh] border border-gray-700">
            <table className="table-auto text-left  w-full ">
              <thead className="bg-gray-950 text-primary uppercase text-sm sticky top-0 z-20">
                <tr className="border-b border-primary">
                  <th className="px-6 py-3 font-bold">#</th>
                  <th className="px-6 py-3 font-bold">Nom</th>
                  <th className="px-6 py-3 font-bold">responsable</th>
                  <th className="px-6 py-3 font-bold">email</th>
                  <th className="px-6 py-3 font-bold">adresse</th>
                  <th className="px-6 py-3 font-bold">tel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700 bg-white/5  ">
                {loading ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-gray-400"
                    >
                      Chargement...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-red-400"
                    >
                      {error}
                    </td>
                  </tr>
                ) : suppliers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      Aucun fournisseur trouvé.
                    </td>
                  </tr>
                ) : (
                  suppliers.map((supplier, index) => (
                    <tr
                      className="hover:bg-gray-800 transition-colors bg-secondary border-b border-primary text-white"
                      key={supplier.id}
                    >
                      <td className="px-6 py-4 text-white">#{index + 1}</td>
                      <td className="px-6 py-4 ">{supplier.name}</td>
                      <td className="px-6 py-4 ">{supplier.contact_name}</td>
                      <td className="px-6 py-4 ">{supplier.email}</td>
                      <td className="px-6 py-4 ">{supplier.address}</td>
                      <td className="px-6 py-4 ">{supplier.phone_number}</td>
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

export default SuppliersList;
