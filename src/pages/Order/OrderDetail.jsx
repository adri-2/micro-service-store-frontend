import React, { useEffect, useState } from "react";
import { orderService } from "../../api/orderService";
import { useParams, Link } from "react-router-dom";
import OrderStatus from "../../components/layouts/OrderStatus";
import { formatCurrency, formatDate, formatId} from "../../utils/format";
import { useNavigate } from "react-router-dom";
export default function OrderDetail() {
  const navigate = useNavigate()
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    orderService
      .getById(id) 
      .then((res) => setOrder(res.data)) 
      .catch(() => setError("Erreur de chargement"))
      .finally(() => setLoading(false));
  }, [id]); 
  
 const handleCancel= async ()=>{
  try{
    const res = await orderService.cancel(id)
     setOrder(res.data)
  } catch(error){
          setError("Erreur de l'annulation",error)
          console.log("Erreur de l'annulation",error.response?.data)
  }
 }
  const handleConfirm = async ()=>{
    try{
      const res= await orderService.confirm(id)
      setOrder(res.data)
    }catch (error){
      setError("Erreur de confirmation",error)
       console.log("Erreur de confirmation",error.response?.data)
    }
  }
 const handleDelete = async () => {
  const confirmed = confirm(
    `Voulez-vous vraiment supprimer #${id} ?`
  );

  if (!confirmed) {
    return;
  }

  try {
    await orderService.remove(id);

    alert(`Commande #${id} supprimée`);
    navigate("/orders");

  } catch (error) {
    console.log(error);

    setError(
      error.response?.data?.detail ||
      "Impossible de supprimer cette commande."
    );
  }
};


  const handleAccount = async ()=>{
    try{
      const res= await orderService.account(id)
      setOrder(res.data)
    }catch (error){
      setError("Erreur de comptabilisation",error)
       console.log("Erreur de comptabilisation",error.response?.data)
    }
  }
  
console.log("...............",order)
   if (loading) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <p className="text-sm text-slate-500">Chargement de la commande...</p>
      </div>
    ); 
  }
  
  if (error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center">
        <p className="font-medium text-rose-600">{error}</p>

        <Link
          to="/orders"
          className="mt-4 inline-block text-sm font-medium text-slate-700 hover:underline"
        >
          ← Retour aux commandes
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
        <p className="text-slate-500">Commande introuvable.</p>

        <Link
          to="/orders"
          className="mt-4 inline-block text-sm font-medium text-slate-700 hover:underline"
        >
          ← Retour aux commandes
        </Link>
      </div>
    );
  }
const items = order.items ?? []

  return (
    <div className="space-y-6">
<div className="flex flex-wrap items-center justify-between gap-3">
        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <button className="btn-secondary cursor-pointer" onClick={handleConfirm}>Confirmer</button>
          <button className="btn-secondary cursor-pointer" onClick={handleCancel}>Annuler</button>
          <button className="bg-red-600 btn-secondary text-blue-50 cursor-pointer" onClick={handleDelete}>Suprimer</button>
        </div>
        <div className="flex gap-2">
          <button className="btn-primary">Brouillon</button>
          <button className="btn-secondary" onClick={handleAccount}>Comptabilisé</button>
        </div>
      </div>
      {/* Header */}
      <header>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Commandes
          </p>

          <Link
            to="/orders"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            ← Retour aux commandes
          </Link>
        </div>

        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">
              Détail de la commande
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Consultez les informations et le statut de cette commande.
            </p>
          </div>

          <OrderStatus
            status={order.status}
            variant="solid"
          />
        </div>
      </header>

      {/* Informations générales */}
      <section className="rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-slate-900">
          Informations générales
        </h2>

        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Numéro de commande
            </p>

            <p
              className="mt-1 truncate text-sm font-medium text-slate-900"
              title={order.id}
            >
              #{formatId(order.id)}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Date de création
            </p>

            <p className="mt-1 text-sm font-medium text-slate-900">
              {formatDate(order.created_at)}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Dernière modification
            </p>

            <p className="mt-1 text-sm font-medium text-slate-900">
              {formatDate(order.updated_at)}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Statut
            </p>

            <div className="mt-2">
              <OrderStatus
                status={order.status}
                variant="solid"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Client + Responsable */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Client */}
        <section className="rounded-2xl bg-white p-6 shadow-xl">
          <h2 className="text-lg font-semibold text-slate-900">
            Client
          </h2>

          <div className="mt-5 space-y-4">

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Nom
              </p>

              <p className="mt-1 text-sm font-medium text-slate-900">
                {order.client_name}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Identifiant client
              </p>

              <p
                className="mt-1 truncate text-sm text-slate-600"
                title={order.client_id}
              >
                {order.client_id}
              </p>
            </div>

          </div>
        </section>

        {/* Responsable */}
        <section className="rounded-2xl bg-white p-6 shadow-xl">
          <h2 className="text-lg font-semibold text-slate-900">
            Responsable
          </h2>

          <div className="mt-5 space-y-4">

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Nom
              </p>

              <p className="mt-1 text-sm font-medium text-slate-900">
                {order.user_name}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Identifiant utilisateur
              </p>

              <p
                className="mt-1 truncate text-sm text-slate-600"
                title={order.user_id}
              >
                {order.user_id}
              </p>
            </div>

          </div>
        </section>

      </div>

      {/* Résumé financier */}
      <section className="rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Résumé
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Montant total de la commande
            </p>
          </div>

          <p className="text-2xl font-bold text-slate-900">
            {formatCurrency(order.total_amount)}
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Articles de la commande
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Produits associés à cette commande.
            </p>
          </div>
        </div>


         {items.length ===0 ?(
                  <div className="mt-5 rounded-xl border border-dashed border-slate-200 p-6 text-center">
           <p className="text-sm text-slate-500">
            Aucun article disponible.
          </p>
            </div>
         )
         :
         (
<table className="table-auto w-full text-left">
  <thead  className="table-head">
    <tr className="border-b border-slate-200">
      <th className="px-6 py-3 font-semibold">ID</th>
      <th className="px-6 py-3 font-semibold">Produit</th>
      <th className="px-6 py-3 font-semibold">Prix</th>
      <th className="px-6 py-3 font-semibold">Qte</th>
      <th className="px-6 py-3 font-semibold">Sub Total</th>
    </tr>
  </thead>
  <tbody>
  {items.map((item, idx)=>(
      <tr  className="transition-colors hover:bg-slate-50" key={item.id}>
      <td  className="px-6 py-4 text-slate-600">
        {idx+1}
      </td>
      <td  className="px-6 py-4 text-slate-600">
        {item.product_name}
      </td>
      <td  className="px-6 py-4 text-slate-600">
        {formatCurrency(item.unit_price)}
      </td>
      <td  className="px-6 py-4 text-slate-600"
      >
        {item.quantity}
      </td>
        <td  className="px-6 py-4 text-slate-600">
        {item.subtotal}
      </td>
    </tr>
  )

  )

  }
  </tbody>
</table>
         )}
      
      </section>

    </div>
  );
}