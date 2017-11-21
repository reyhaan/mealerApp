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
            itemName: "Chicken Biryani",
            itemImage: 'https://i2.wp.com/ministryofcurry.com/wp-content/uploads/2017/05/IMG_2766.jpg?resize=760%2C507',
            itemDetail: "A famous dish from India, made with slowly cooking rice with spicy chicken.",
            itemCost: 6.99,
            countryOfOrigin: "Nigeria"
        }
    }

    menus() {
        return [this.menu(), this.menu(), this.menu(), this.menu(), this.menu()]
    }

    order() {
        return {
            id: "",
            date: "",
            userId: "",
            status: "",
            orderedCount: 2,
            menu: this.menu()
        }
    }

    orders() {
        return [this.order(), this.order(), this.order(), this.order(), this.order()]
    }
}
