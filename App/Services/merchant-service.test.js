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

    // remove any database connections.
    try {
        await database.firebase.database().goOffline();
    } catch (err) {
        expect(err).toBeUndefined();
    }
});

describe('merchant-service', function () {
    test('should create merchant menu', async () => {
        try {
            const menu = await merchantService.createMenu(merchantUser.uid, merchantUser.menu());
            expect(menu.id).toBeTruthy();
            expect(menu.itemCost).toEqual(merchantUser.menu().itemCost);
            expect(menu.itemDetail).toEqual(merchantUser.menu().itemDetail);
            expect(menu.itemName).toEqual(merchantUser.menu().itemName);
            expect(menu.itemImage).toEqual(merchantUser.menu().itemImage);
            createdMenu = menu;
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });

    test('should get merchant menu', async () => {
        try {
            const menus = await merchantService.getMenu(merchantUser.uid);
            expect(menus.length).toBeGreaterThan(0);
            expect(menus[0].itemCost).toEqual(createdMenu.itemCost);
            expect(menus[0].itemDetail).toEqual(createdMenu.itemDetail);
            expect(menus[0].itemName).toEqual(createdMenu.itemName);
            expect(menus[0].itemImage).toEqual(createdMenu.itemImage);
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });

    test('should update merchant menu', async () => {
        try {
            createdMenu.itemName = "john snow";
            createdMenu.itemCost = 10000.00;
            const menu = await merchantService.updateMenu(merchantUser.uid, createdMenu);
            expect(menu.id).toEqual(createdMenu.id);
            expect(menu.itemCost).toEqual(createdMenu.itemCost);
            expect(menu.itemDetail).toEqual(merchantUser.menu().itemDetail);
            expect(menu.itemName).toEqual(createdMenu.itemName);
            expect(menu.itemImage).toEqual(merchantUser.menu().itemImage);
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });

    test('should get merchant menu by Id', async () => {
        try {
            const menu = await merchantService.getMenuById(merchantUser.uid, createdMenu.id);
            expect(menu.id).toEqual(createdMenu.id);
            expect(menu.itemCost).toEqual(createdMenu.itemCost);
            expect(menu.itemDetail).toEqual(merchantUser.menu().itemDetail);
            expect(menu.itemName).toEqual(createdMenu.itemName);
            expect(menu.itemImage).toEqual(merchantUser.menu().itemImage);
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });

    test('should add order to merchant', async () => {
        try {
            const order = await merchantService.createOrder(merchantUser.uid, merchantUser.order());
            expect(order.id).toBeTruthy();
            expect(order.userId).toEqual(merchantUser.order().userId);
            expect(order.status).toEqual(merchantUser.order().status);
            expect(order.menu).toEqual(merchantUser.order().menu);
            createdOrder = order;
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
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });

    test('should update merchant order', async () => {
        try {
            createdOrder.status = "accepted";
            const order = await merchantService.updateOrder(merchantUser.uid, createdOrder);
            expect(order.id).toEqual(createdOrder.id);
            expect(order.userId).toEqual(merchantUser.order().userId);
            expect(order.status).toEqual(createdOrder.status);
            expect(order.menu).toEqual(merchantUser.order().menu);
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

    test('should get merchant order by status', async () => {
        try {
            const orders = await merchantService.getOrdersByStatus(merchantUser.uid, "new");
            expect(orders.length).toBeGreaterThan(0);
            expect(orders[0].status).toEqual("new");
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });
});

