import JsonStorage from '../lib/JsonStorage'
myStorage = new JsonStorage();
export function afficheProduits (listeDesProduits) {


    const espaceProduit = document.querySelector("#products-section > div");
   espaceProduit.innerHTML = "";

    

    //pour toutes la listedesproduits insérer du html
    listeDesProduits.forEach(produit => { 

        let icone = "add_shopping_cart";

        if(myStorage.getItem(produit.id)){

            icone = "remove_shopping_cart";

        }

        espaceProduit.insertAdjacentHTML("beforeend", ` <article class="product-list-item">
        <!-- Utilisez ce bouton pour linker l'évent de l'ajout au panier -->
        <button type="button" class="icon-button cart-button">
          <!-- Modifier cet icône pour montrer si l'article est dans le panier ou non. Son inverse est remove_shopping_cart -->
          <span class="material-icons">${icone}</span>
        </button>

        <!-- Utilisez ce <a> pour lier l'url de la page du produit -->
        <a href="#products-${produit.id}" class="product-list-item-image-link">
          <!-- Utilisez cette image pour afficher l'image du produit -->
          <img src="${produit.image_url}" />
        </a>

        <div class="product-list-item-footer">
          <!-- Utilisez ce <div> pour afficher le nom du produit -->
          <div class="product-list-item-name">
          ${produit.name}
          </div>

          <!-- Utilisez ce <a> pour afficher le nom de la catégorie et lier l'url de la page de la catégorie -->
          <a href="#categories-${produit.category.id}" class="product-list-item-category">
          ${produit.category.name}
          </a>
        </div>
      </article>`);


    });

}