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
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Relations fournisseurs
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Fournisseurs
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Liste des fournisseurs disponibles.
          </p>
        </div>
        <Link to="/suppliers/new" className="btn-primary">
          Nouveau fournisseur
        </Link>
      </div>

      <section className="table-shell">
        <table className="table-auto w-full text-left">
          <thead className="table-head">
            <tr className="border-b border-slate-200">
              <th className="px-6 py-3 font-semibold">#</th>
              <th className="px-6 py-3 font-semibold">Nom</th>
              <th className="px-6 py-3 font-semibold">Responsable</th>
              <th className="px-6 py-3 font-semibold">Email</th>
              <th className="px-6 py-3 font-semibold">Adresse</th>
              <th className="px-6 py-3 font-semibold">Tel</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
                {loading ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-6 text-center text-slate-500"
                    >
                      Chargement...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-6 text-center text-rose-600"
                    >
                      {error}
                    </td>
                  </tr>
                ) : suppliers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-6 text-center text-slate-500"
                    >
                      Aucun fournisseur trouvé.
                    </td>
                  </tr>
                ) : (
                  suppliers.map((supplier, index) => (
                    <tr className="transition-colors hover:bg-slate-50" key={supplier.id}>
                      <td className="px-6 py-4 text-slate-600">#{index + 1}</td>
                      <td className="px-6 py-4 text-slate-900">{supplier.name}</td>
                      <td className="px-6 py-4 text-slate-700">{supplier.contact_name}</td>
                      <td className="px-6 py-4 text-slate-700">{supplier.email}</td>
                      <td className="px-6 py-4 text-slate-700">{supplier.address}</td>
                      <td className="px-6 py-4 text-slate-700">{supplier.phone_number}</td>
                    </tr>
                  ))
                )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default SuppliersList;
