import React, { useEffect, useState } from "react";
import { orderService } from "../../api/orderService";
import OrderStatus from "../../components/layouts/OrderStatus";
import { formatCurrency, formatDate } from "../../utils/format";
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
    <div className="bg-gray-950 h-screen">
      <div className="flex flex-col">
        {/* <div>
          <h1 className="text-2xl font-bold text-white">Categories</h1>
          <p className="text-sm text-gray-400">
            Liste des commandes disponibles.
          </p>
        </div> */}
        {/* liste */}
        <section className="w-full ">
          <div className="max-h-[70vh] border border-gray-700">
            <table className="table-auto text-left  w-full ">
              <thead className="bg-gray-950 text-primary uppercase text-sm sticky top-0 z-20">
                <tr className="border-b border-primary">
                  <th className="px-6 py-3 font-bold">#</th>
                  <th className="px-6 py-3 font-bold">Date</th>
                  <th className="px-6 py-3 font-bold">Client</th>
                  <th className="px-6 py-3 font-bold">Total</th>
                  <th className="px-6 py-3 font-bold">Resp</th>
                  <th className="px-6 py-3 font-bold">Status</th>
                  {/* <th className="px-6 py-3 font-">Cree le</th> */}
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
                ) : orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      Aucune commande trouvee.
                    </td>
                  </tr>
                ) : (
                  orders.map((order, index) => (
                    <tr
                      className="hover:bg-gray-800 transition-colors bg-secondary border-b border-primary text-white"
                      key={order.id}
                    >
                      <td className="px-6 py-4 text-white">#{index}</td>
                      <td className="px-6 py-4 ">
                        {formatDate(order.created_at)}
                      </td>
                      <td className="px-6 py-4 ">{order.client_name}</td>
                      <td className="px-6 py-4 ">
                        {formatCurrency(order.total_amount)}
                      </td>
                      <td className="px-6 py-4 ">{order.user_name}</td>
                      <td className="px-6 py-4 ">
                        <OrderStatus status={order.status} variant="solid" />
                      </td>
                      {/* <td className="px-6 py-4">{order.created_at}</td> */}
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

export default OrderList;
