import GroundnutOilImage from '/assests/images/Rectangle 87.png'

export const cartItems = [
    {
        id: "1000",
        code: "f230fh0g3",
        name: "Desiri-Groundnut-Oils",
        description: "Product Description",
        image: process.env.PUBLIC_URL + GroundnutOilImage,						
        price: 390,
        date: "09/13/2022",
        category: "Oils",
        quantity: 24,
        inventoryStatus: "INSTOCK",
        rating: 5
    },
    {
        id: "1002",
        code: "zz21cz3c1",
        name: "Desiri-Coconut-Oils",
        description: "Product Description",
        image: process.env.PUBLIC_URL + GroundnutOilImage,
        price: 350,
        date: "09/13/2022",
        category: "Oils",
        quantity: 5,			
        inventoryStatus: "LOWSTOCK",
        rating: 3
    }
];