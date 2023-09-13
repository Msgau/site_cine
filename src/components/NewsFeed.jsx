import "../styles/NewsFeed.css";

export default function NewsFeed() {
  return (
    <div className="newsFeed">
      <h2>Actualités</h2>
      <div className="composantActu first">
      Bonjour et bienvenue sur Ciné Crew. <br />
      Le site est actuellement 
      en cours de développement. N'hésitez pas à utiliser le moteur de
      recherche et à naviger un peu pour vous faire une idée de l'avancée des travaux !
      </div>
      
      <div className="composantActu">
        <h3>To do list :</h3>
        <ul>
        <li>Ajouter une fonction recherche pour les personnalités</li>
        <li>optimiser la recherche en utilisant la barre d'adresse</li>
        <li>Intégrer un système de connexion</li>
        <li>Intégrer un système de notation</li>
        <li>Intégrer des fonctions sociales</li>
        <li>Intégrer le menu du site</li>
        <li>Créer le fil d'actualité de la page d'acceuil</li>
        <li>Créer un footer</li>
        </ul>
      </div>
      <div className="composantActu">
        <h3>Ce qui fonctionne :</h3>
      <ul>
        <li>La fonction recherche</li>
        <li>La navigation entre les pages de recherche</li>
        <li>l'accès à la fiche d'un film</li>
        <li>L'accès à la fiche d'une personalité</li>
      </ul>
      </div>
    </div>
  );
}
