import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categorieService, productService } from "../../api/categorieService";
import { supplierService } from "../../api/supplierService";

function ProductsCreater() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "Coffee Machine Plus",
    price: "229.00",
    description: "Automatic coffee machine",
    category: "",
    suppliers: "",
    stock: 20,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesRes, suppliersRes] = await Promise.all([
          categorieService.getAll(),
          supplierService.getAll(),
        ]);
        setCategories(categoriesRes.data || []);
        setSuppliers(suppliersRes.data || []);
      } catch {
        setError("Impossible de charger catégories et fournisseurs.");
      }
    };

    loadData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await productService.create({
        name: formData.name.trim(),
        price: formData.price,
        description: formData.description.trim(),
        category: formData.category,
        suppliers: formData.suppliers,
        stock: Number(formData.stock),
      });

      alert("Produit créé !");
      navigate("/products");
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
              Produits
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              Créer un produit
            </h1>
          </div>

          <button
            type="button"
            onClick={() => navigate("/products")}
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
            <div className="flex flex-col gap-2 md:col-span-2">
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
              <label htmlFor="price" className="text-sm font-medium text-slate-700">
                Prix
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                min="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="stock" className="text-sm font-medium text-slate-700">
                Stock
              </label>
              <input
                id="stock"
                type="number"
                min="0"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="category" className="text-sm font-medium text-slate-700">
                Catégorie
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Choisir une catégorie</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="suppliers" className="text-sm font-medium text-slate-700">
                Fournisseur
              </label>
              <select
                id="suppliers"
                name="suppliers"
                value={formData.suppliers}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Choisir un fournisseur</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-slate-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
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
              onClick={() => navigate("/products")}
              className="btn-secondary"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Création..." : "Créer le produit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductsCreater;
