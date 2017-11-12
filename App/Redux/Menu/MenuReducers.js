import { FETCH_MENU } from './MenuActions';
import { Images } from '../../Themes';
const initialState = [];
const userObject = [
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
  ];
export function fetchMenuReducer(state=initialState, action){
    switch(action.type){
        case FETCH_MENU:
            console.log("reducer triggered!")
            return userObject
        default:
            return state
    }
}