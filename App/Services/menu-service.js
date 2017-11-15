import firebase from '../Config/database';
import {  Images } from '../Themes';

let foodMenuQueries = {};

foodMenuQueries.getAllFoodMenu = () => {
    return new Promise ((resolve, reject)=>{
        resolve ([
            {
              itemName: "Chicken Biryani",
              itemImage: Images.biryani,
              itemDetail: "A famous dish from India, made with slowly cooking rice with spicy chicken.",
              itemCost: 6.99
            },
            {
              itemName: "Chicken Biryani",
              itemImage: Images.biryani,
              itemDetail: "A famous dish from India, made with slowly cooking rice with spicy chicken.",
              itemCost: 6.99
            },
            {
              itemName: "Chicken Biryani",
              itemImage: Images.biryani,
              itemDetail: "A famous dish from India, made with slowly cooking rice with spicy chicken.",
              itemCost: 6.99
            },
            {
              itemName: "Chicken Biryani",
              itemImage: Images.biryani,
              itemDetail: "A famous dish from India, made with slowly cooking rice with spicy chicken.",
              itemCost: 6.99
            },
            {
              itemName: "Chicken Biryani",
              itemImage: Images.biryani,
              itemDetail: "A famous dish from India, made with slowly cooking rice with spicy chicken.",
              itemCost: 6.99
            },
            {
              itemName: "Chicken Biryani",
              itemImage: Images.biryani,
              itemDetail: "A famous dish from India, made with slowly cooking rice with spicy chicken.",
              itemCost: 6.99
            }
          ]);
    })
    //to do, add query to return all menu
    
}
export default foodMenuQueries;
