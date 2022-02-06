let products = [
    {id: 1, name: 'Hani Big Coat', price: '69.9', description: 'Super warm winter coat!', image: '008.jpeg', category: '1', status: 'In Stock'},
    {id: 2, name: 'Nike Dunk Low', price: '69.0', description: 'It is a good shoes! Buy it!', image: '001.jpg', category: '4', status: 'In Stock'},
    {id: 3, name: 'Chicago Hoodie', price: '72.2', description: 'Super new style in Chicago!!!', image: '002.jpeg', category: '2', status: 'Sold Out'},
    {id: 4, name: 'Men South Korea Shorts', price: '46.3', description: 'Very cool!', image: '006.jpeg', category: '3', status: 'In Stock'},
    {id: 5, name: 'Basic Tube Top', price: '89.0', description: 'Very hot summer outfit', image: '003.jpeg', category: '2', status: 'In Stock'},
    {id: 6, name: 'Fashion Pikachu Hoodie', price: '69.9', description: 'Very cute anime style hoodie', image: '004.jpg', category: '2', status: 'Sold Out'},
    {id: 7, name: 'Sport Short Pants', price: '29.9', description: 'Very nice sporty style!', image: '005.jpeg', category: '3', status: 'In Stock'},
    {id: 8, name: 'Korea Oppa Coat', price: '79.9', description: 'Very warm oppa coat!', image: '007.jpeg', category: '1', status: 'In Stock'},
];

let categories = [
    {id: 1, name: 'Coat'},
    {id: 2, name: 'Top'},
    {id: 3, name: 'Bottom'},
    {id: 4, name: 'Shoes'},
];
  
export function getProducts() {
    return products;
}

export function getCategories() {
    return categories;
}