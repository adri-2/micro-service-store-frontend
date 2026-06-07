import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { customerService } from "../../api/customerService";

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
    <div className="bg-gray-950 h-screen">
      <div className="flex flex-col">
        <div className="flex items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Clients</h1>
            <p className="text-sm text-gray-400">
              Liste des clients disponibles.
            </p>
          </div>
          <Link to="/customers/new" className="btn-primary">
            Nouveau client
          </Link>
        </div>

        <section className="w-full">
          <div className="max-h-[70vh] border border-gray-700">
            <table className="table-auto text-left w-full">
              <thead className="bg-gray-950 text-primary uppercase text-sm sticky top-0 z-20">
                <tr className="border-b border-primary">
                  <th className="px-6 py-3 font-bold">#</th>
                  <th className="px-6 py-3 font-bold">Prénom</th>
                  <th className="px-6 py-3 font-bold">Nom</th>
                  <th className="px-6 py-3 font-bold">Email</th>
                  <th className="px-6 py-3 font-bold">Téléphone</th>
                  <th className="px-6 py-3 font-bold">Adresse</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700 bg-white/5">
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
                ) : customers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      Aucun client trouvé.
                    </td>
                  </tr>
                ) : (
                  customers.map((customer, index) => (
                    <tr
                      className="hover:bg-gray-800 transition-colors bg-secondary border-b border-primary text-white"
                      key={customer.id}
                    >
                      <td className="px-6 py-4">#{index + 1}</td>
                      <td className="px-6 py-4">{customer.first_name}</td>
                      <td className="px-6 py-4">{customer.last_name}</td>
                      <td className="px-6 py-4">{customer.email}</td>
                      <td className="px-6 py-4">{customer.phone_number}</td>
                      <td className="px-6 py-4">{customer.address}</td>
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

export default CustomerList;
