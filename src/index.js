import './css/index.css'
import { domOn, domForEach } from './lib/domManipulator'
import {listeProduit,listeProduitCategory, produitDetaille, afficheListeCategory} from './api'
import {afficheProduits} from './sections/products'
import JsonStorage from './lib/JsonStorage'
import {afficheCategorie} from './sections/categorie'
myStorage = new JsonStorage();


/* vérifier si en ligne
 */

window.addEventListener('offline', function() {
  alert('vous devez être en ligne au vu de la connextion a des api externe');
});






/* mon service worker
 */
if ('serviceWorker' in navigator) {
 
  navigator.serviceWorker.register(
    new URL('./workerCacheFetched.js', import.meta.url),
    { type: 'module' }
   )    

}

function toggleSection(section) {
  document.querySelector('section.active')?.classList.remove('active')
  document.querySelector(`${section}-section`)?.classList.add('active')
}

function toggleNav(section) {
  document.querySelector('nav a.active')?.classList.remove('active')
  document.querySelector(`nav a[href="${section}"]`)?.classList.add('active')
}

function displaySection() {
  const section = window.location.hash || '#home'
  const sectionSplit = section.split('-')
  document.querySelector("#products-section > h4").innerHTML = "Produits";
  if(sectionSplit[0]=='#categories'){
    afficheCategorie();

  }

  else if(sectionSplit[0]=='#products' && sectionSplit[1] != undefined){
    toggleSection('#product');
    toggleNav('#product');  
    produitDetaille(sectionSplit[1]).then((data) => {
      console.log(data);

      let text = `<h4>Produits > ${data.category.name} > ${data.name} </h4>

      <!-- Utilisez ce <a> pour afficher le nom de la catégorie et lier l'url de la page de la catégorie -->
      <a href="#categories-${data.category.id}" class="product-category-link">
        Habits
      </a>

      <div class="product-image-wrapper">
        <!-- Utilisez cette image pour afficher l'image du produit -->
        <img src="${data.image_url}" />
      </div>`

      document.querySelector("#product-section").innerHTML = text;  

    });
  }

  else if(window.location.hash=='#cart'){

    toggleSection('#card');
    toggleNav(sectionSplit[0]);
    document.querySelector("#card-section > h4").innerText= `panier (${myStorage.length})`;
   let cardSection =  document.querySelector("#card-section > div");
   cardSection.innerHTML = "";
  

  myStorage.forEach((value, key) => {
      const itemElement = document.createElement('li');
      itemElement.textContent = `Article: ${JSON.stringify(value)}`;
      cardSection.appendChild(itemElement);
    
    
  
  });

  }
  

  else{
    toggleSection(sectionSplit[0])
    toggleNav(sectionSplit[0])
    listeProduit().then(data => afficheProduits(data));

    (function() {
      const categoryPosition = document.querySelector("#home-section > div")
      categoryPosition.innerHTML = "";

      afficheListeCategory().then((data) => {
        
        data.forEach(category => {
          categoryPosition.insertAdjacentHTML("beforeend", `<a href="#categories-${category.id}">${category.name}</a>`)
          });
      });




    })();


  }
  // Toggle par défaut des sections et de la navigation
  
}

window.addEventListener('hashchange', displaySection)

displaySection()



//execute la fonction listeProduit et enregistre le résultat dans la variable listeProduit et sulement ensuite execute la fonction afficheProduit
//listeProduit();


//gestion panier
let boutonsAjout = document.querySelector("#products-section > div");
boutonsAjout.addEventListener("click", function(event){
  console.log(event.target.parentElement.parentElement.querySelector("div > div").innerText);
  if(event.target.getAttribute('class')=='material-icons'){

    if(event.target.innerHTML == "add_shopping_cart"){
    
    event.target.innerHTML = "remove_shopping_cart";
    let leLien = (event.target.parentElement.parentElement.querySelector("a").getAttribute('href'));
    myStorage.setItem(`${leLien.split('-')[1]}`, event.target.parentElement.parentElement.querySelector("div > div").innerText);
    }

    else{
      event.target.innerHTML = "add_shopping_cart";
      let leLien = (event.target.parentElement.parentElement.querySelector("a").getAttribute('href'));
      myStorage.removeItem(`${leLien.split('-')[1]}`);
    }
    
}


});


//a externaliser: l'affichage des catégories
//le panier





