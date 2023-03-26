import {listeProduit,listeProduitCategory, produitDetaille, afficheListeCategory} from '../api'
import {afficheProduits} from './products'


function toggleSection(section) {
    document.querySelector('section.active')?.classList.remove('active')
    document.querySelector(`${section}-section`)?.classList.add('active')
  }
  
  function toggleNav(section) {
    document.querySelector('nav a.active')?.classList.remove('active')
    document.querySelector(`nav a[href="${section}"]`)?.classList.add('active')
  }
export function afficheCategorie(){
    toggleSection('#products');
    toggleNav('#products');
    document.querySelector("#products-section > div").innerHTML="";
    listeProduitCategory(window.location.hash.split('-')[1]).then((data) => {
      afficheProduits(data);
      document.querySelector("#products-section > h4").innerHTML = "Produits > " + data[0].category.name;
    }); 
}