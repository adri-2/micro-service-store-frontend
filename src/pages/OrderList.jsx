import React, { useEffect, useState } from "react";
import { orderService } from "../api/orderService";
import NavBar from "../components/NavBar";
import OrderStatus from "../components/layouts/OrderStatus";
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
  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-700">{error}</p>;
  console.log("///", orders);
  return (
    <div className="bg-gray-950 h-screen">
      <div className="flex flex-col">
        {/* menu */}
        {/*  */}
        <NavBar linkTo={"/orders/new"} />
        {/* liste */}
        <section className="w-full ">
          <div className="overflow-x-auto  border border-gray-700">
            <table className="table-auto text-left  w-full">
              <thead className="bg-gray-950 text-primary uppercase text-sm ">
                <tr className=" border-b border-primary ">
                  <th className="px-6 py-3 font-bold">#</th>
                  <th className="px-6 py-3 font-bold">Date</th>
                  <th className="px-6 py-3 font-bold">client</th>
                  <th className="px-6 py-3 font-bold">total</th>
                  <th className="px-6 py-3 font-bold">Resp</th>
                  <th className="px-6 py-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700 bg-white/5  ">
                {orders.map((order) => (
                  <tr
                    className="hover:bg-gray-800 transition-colors bg-secondary border-b border-primary text-white"
                    key={order.id}
                  >
                    <td className="px-6 py-4 text-white">{order.id}</td>
                    <td className="px-6 py-4 ">{order.created_at}</td>
                    <td className="px-6 py-4 ">{order.client_name}</td>
                    <td className="px-6 py-4 ">{order.total_amount}</td>
                    <td className="px-6 py-4 ">{order.user_name}</td>
                    <td className="px-6 py-4 ">
                      <OrderStatus status={order.status} variant="solid" />
                    </td>
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

export default OrderList;
