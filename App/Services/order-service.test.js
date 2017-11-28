import orderService from './order-service';
import {merchant, User} from './test-data-service';
import database from '../Config/database';

let createdOrder = null;
const merchantUser = new User(merchant);

afterAll(async () => {
    // delete a merchant order.
    try {
        await orderService.removeOrder(merchantUser.uid, createdOrder.id);
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

    test('should add order to merchant', async () => {
        try {
            const order = await orderService.createOrder(merchantUser.uid, merchantUser.order());
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
            const orders = await orderService.getOrders(merchantUser.uid);
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
            const order = await orderService.updateOrder(merchantUser.uid, createdOrder);
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
            const menu = await orderService.getOrderById(merchantUser.uid, createdOrder.id);
            expect(menu.status).toEqual("accepted");
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });

    test('should get merchant order by status', async () => {
        try {
            const orders = await orderService.getOrdersByStatus(merchantUser.uid, "new");
            expect(orders.length).toBeGreaterThan(0);
            expect(orders[0].status).toEqual("new");
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });
});

