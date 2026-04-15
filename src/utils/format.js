/**
 * Service API de base pour l'intégration avec le backend ERP Pressing
 * Base URL: https://erp-pressing-production.up.railway.app
 *
 * Ce service gère:
 * - L'authentification via token Bearer
 * - La gestion des erreurs
 * - Les headers communs
 * - Les requêtes HTTP de base (GET, POST, PUT, DELETE)
 */

/**
 * Formate un montant en FCFA
 */
export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return "0 FCFA";
  return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} FCFA`;
};

/**
 * Formate une date
 */
export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

/**
 * Formate une date avec l'heure
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
