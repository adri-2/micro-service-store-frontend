import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supplierService } from "../../api/supplierService";

function SuppliersCreater() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    contact_name: "",
    email: "",
    phone_number: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await supplierService.create({
        name: formData.name.trim(),
        contact_name: formData.contact_name.trim(),
        email: formData.email.trim(),
        phone_number: formData.phone_number.trim(),
        address: formData.address.trim(),
      });

      alert("Fournisseur créé !");
      navigate("/suppliers");
    } catch (err) {
      console.error(err);
      const errorData = err?.response?.data;
      const details =
        typeof errorData === "string"
          ? errorData
          : JSON.stringify(errorData || { detail: "Erreur création" });
      setError(`Erreur création: ${details}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
              Fournisseurs
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              Créer un fournisseur
            </h1>
          </div>

          <button
            type="button"
            onClick={() => navigate("/suppliers")}
            className="btn-secondary"
          >
            Retour
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="surface p-6"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-700">
                Nom
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact_name" className="text-sm font-medium text-slate-700">
                Contact
              </label>
              <input
                id="contact_name"
                type="text"
                name="contact_name"
                value={formData.contact_name}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phone_number" className="text-sm font-medium text-slate-700">
                Téléphone
              </label>
              <input
                id="phone_number"
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="address" className="text-sm font-medium text-slate-700">
                Adresse
              </label>
              <textarea
                id="address"
                name="address"
                rows={4}
                value={formData.address}
                onChange={handleChange}
                required
                className="input-field min-h-32"
              />
            </div>
          </div>

          {error ? (
            <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/suppliers")}
              className="btn-secondary"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Création..." : "Créer le fournisseur"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SuppliersCreater;
