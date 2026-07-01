async function askLLM(message) {
  // Réponses fictives pour démonstrationif (message.includes("produit")) return "Nos produits sont listés dans la boutique.";
  if (message.includes("prix")) return "Les prix sont affichés à côté de chaque article.";
  if (message.includes("bonjour")) return "Bonjour 👋, comment puis-je vous aider ?";
  
  // Réponse générique simuléereturn "Je suis un chatbot intelligent, pouvez-vous préciser votre question ?";}
module.exports = { askLLM };