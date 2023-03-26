

export function listeProduit() {
    return fetch('https://webmobui-22-exa-backend.herokuapp.com/api/products')
    .then(response => response.json());

}

export function listeProduitCategory(id){
return fetch(`https://webmobui-22-exa-backend.herokuapp.com/api/categories/${id}/products`)
.then(response => response.json())
}


export function produitDetaille(id){
    return fetch(`https://webmobui-22-exa-backend.herokuapp.com/api/products/${id}`)
    .then(response => response.json())
    }


export function afficheListeCategory(){
    return fetch('https://webmobui-22-exa-backend.herokuapp.com/api/categories')
    .then(response => response.json())

}