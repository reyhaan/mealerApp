import merchantService from './merchant-service';
import {merchant, User} from './test-data-service';
import database from '../Config/database';

let createdMenu = null;
let createdOrder = null;
const merchantUser = new User(merchant);

afterAll(async () => {
    // delete a merchant menu.
    try {
        await merchantService.removeMenu(merchantUser.uid, createdMenu.id);
    } catch (err) {
        expect(err).toBeUndefined();
    }

    // delete a merchant order.
    try {
        await merchantService.removeOrder(merchantUser.uid, createdOrder.id);
    } catch (err) {
        expect(err).toBeUndefined();
    }

    // remove any connection.
    try {
        database.firebase.database().goOffline();
    } catch (err) {
        expect(err).toBeUndefined();
    }
});

describe('merchant-service', function () {
    test('should create merchant menu', async () => {
        try {
            await merchantService.createMenu(merchantUser.uid, merchantUser.menu());
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });

    test('should get merchant menu', async () => {
        try {
            const menus = await merchantService.getMenu(merchantUser.uid);
            expect(menus.length).toBeGreaterThan(0);
            expect(menus[0].itemCost).toBeTruthy();
            expect(menus[0].itemDetail).toBeTruthy();
            expect(menus[0].itemName).toBeTruthy();
            expect(menus[0].itemImage).toBeTruthy();
            createdMenu = menus[0];
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });

    test('should update merchant menu', async () => {
        try {
            createdMenu.itemName = "john snow";
            createdMenu.itemCost = 10000.00;
            await merchantService.updateMenu(merchantUser.uid, createdMenu);
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });

    test('should get merchant menu by Id', async () => {
        try {
            const menu = await merchantService.getMenuById(merchantUser.uid, createdMenu.id);
            expect(menu.itemName).toEqual("john snow");
            expect(menu.itemCost).toEqual(10000.00);
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });

    test('should add order to merchant', async () => {
        try {
            await merchantService.createOrder(merchantUser.uid, merchantUser.order());
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });

    test('should get merchant orders', async () => {
        try {
            const orders = await merchantService.getOrders(merchantUser.uid);
            expect(orders.length).toBeGreaterThan(0);
            expect(orders[0].id).toBeTruthy();
            expect(orders[0].userId).toBeTruthy();
            expect(orders[0].status).toBeTruthy();
            expect(orders[0].menu).toBeTruthy();
            createdOrder = orders[0];
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });

    test('should update merchant order', async () => {
        try {
            createdOrder.status = "accepted";
            await merchantService.updateOrder(merchantUser.uid, createdOrder);
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });

    test('should get merchant order by Id', async () => {
        try {
            const menu = await merchantService.getOrderById(merchantUser.uid, createdOrder.id);
            expect(menu.status).toEqual("accepted");
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });

    // test.only('should get merchant order by status', async () => {
    //     try {
    //         const menu = await merchantService.getOrdersByStatus(merchantUser.uid, "new");
    //
    //     } catch (err) {
    //         expect(err).toBeUndefined();
    //     }
    // });
});

