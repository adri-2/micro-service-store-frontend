import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { customerService } from "../../api/customerService";
import {formatId} from "../../utils/format";
function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    customerService
      .getAll()
      .then((res) => setCustomers(res.data))
      .catch(() => setError("Erreur de chargement"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Relation client
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Clients</h1>
          <p className="mt-2 text-sm text-slate-500">
            Liste des clients disponibles.
          </p>
        </div>
        <Link to="/customers/new" className="btn-primary">
          Nouveau client
        </Link>
      </div>

      <section className="table-shell">
        <table className="table-auto w-full text-left">
          <thead className="table-head">
            <tr className="border-b border-slate-200">
              <th className="px-6 py-3 font-semibold">#</th>
              <th className="px-6 py-3 font-semibold">Prénom</th>
              <th className="px-6 py-3 font-semibold">Nom</th>
              <th className="px-6 py-3 font-semibold">Email</th>
              <th className="px-6 py-3 font-semibold">Téléphone</th>
              <th className="px-6 py-3 font-semibold">Adresse</th>
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
                ) : customers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-6 text-center text-slate-500"
                    >
                      Aucun client trouvé.
                    </td>
                  </tr>
                ) : (
                  customers.map((customer) => (
                    <tr className="transition-colors hover:bg-slate-50" key={customer.id}>
                      <td className="px-6 py-4 text-slate-600">#{formatId(customer.id)}</td>
                      <td className="px-6 py-4 text-slate-900">{customer.first_name}</td>
                      <td className="px-6 py-4 text-slate-700">{customer.last_name}</td>
                      <td className="px-6 py-4 text-slate-700">{customer.email}</td>
                      <td className="px-6 py-4 text-slate-700">{customer.phone_number}</td>
                      <td className="px-6 py-4 text-slate-700">{customer.address}</td>
                    </tr>
                  ))
                )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default CustomerList;
