import React, { useEffect, useState } from "react";
import { orderService } from "../../api/orderService";
import OrderStatus from "../../components/layouts/OrderStatus";
import { formatCurrency, formatDate, formatId } from "../../utils/format";
import { Link} from "react-router-dom";
function OrderList() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    orderService
      .getAll()
      .then((res) => setOrders(res.data))
      .catch(() => setError("Erreur de chargement"))
      .finally(() => setLoading(false));
  }, []);

  console.log("///", orders);
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Commandes
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">
          Liste des commandes
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Vue simple et lisible des commandes disponibles.
        </p>
      </div>

      <section className="table-shell">
        <table className="table-auto w-full text-left">
          <thead className="table-head">
            <tr className="border-b border-slate-200">
              <th className="px-6 py-3 font-semibold">#</th>
              <th className="px-6 py-3 font-semibold">Date</th>
              <th className="px-6 py-3 font-semibold">Client</th>
              <th className="px-6 py-3 font-semibold">Total</th>
              <th className="px-6 py-3 font-semibold">Resp</th>
              <th className="px-6 py-3 font-semibold">Statut</th>
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
                ) : orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-6 text-center text-slate-500"
                    >
                      Aucune commande trouvee.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr className="transition-colors hover:bg-slate-50" key={order.id}>
                      <td className="px-6 py-4 text-slate-600">

                        <Link to={`${order.id}`}>#{formatId(order.id)}</Link>
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {formatDate(order.created_at)}
                      </td>
                      <td className="px-6 py-4 text-slate-900">{order.client_name}</td>
                      <td className="px-6 py-4 text-slate-700">
                        {formatCurrency(order.total_amount)}
                      </td>
                      <td className="px-6 py-4 text-slate-700">{order.user_name}</td>
                      <td className="px-6 py-4">
                        <OrderStatus status={order.status} variant="solid" />
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

export default OrderList;
