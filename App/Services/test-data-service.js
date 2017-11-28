import db from '../Config/database';

export const customer = {
    email: "customer@mealer.com",
    password: "customer",
    name: "Customer Mealer",
    type: "customer",
    uid: "yPeGFu975KQbfFrKo04lcn44VGz1"
};

export const merchant = {
    email: "merchant@mealer.com",
    password: "merchant",
    name: "Merchant Sir",
    type: "merchant",
    uid: "49cUHEsmznO6M5HsxLEqQOFQAjA2",
};

export class User {
    constructor(user) {
        const {type, uid, email, password, name} = user;
        this.type = type;
        this.uid = uid;
        this.email = email;
        this.password = password;
        this.name = name;
        this.avatar = "";
        this.phone = "+16131111111";
        this.address = "2-1000 rideau street Ottawa On Canada K1Z8K1";
        this.quotaLimit = 0;
        this.quotaUsed = 0;
    }

    menu() {
        return {
            itemName: "Chicken Biryani ukeme",
            itemImage: "https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/v1438133716000/photosp/ig-498695320661758884_396353171/stock-photo-food-soup-healthy-foods-health-recipe-vegan-food-and-drink-stew-ig-498695320661758884_396353171.jpg",
            itemDetail: "A famous dish from India, made with slowly cooking rice with spicy chicken.",
            itemCost: "6.99",
            countryOfOrigin: "Nigeria"
        }
    }

    order() {
        return {
            from: customer.uid,
            to: merchant.uid,
            items: [this.menu(),this.menu()],
            time: db.firebase.database.ServerValue.TIMESTAMP,
            status: "new",
        }
    }
}
