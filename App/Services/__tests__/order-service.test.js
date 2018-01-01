import orderService from '../order-service';
import {vendor, customer, User} from './test-data-service';
import database from '../../Config/database';

let createdOrder = null;
const merchantUser = new User(vendor);
const customerUser = new User(customer);

afterAll(async () => {
    // delete a vendor order.
    try {
        await orderService.removeOrder(customerUser.uid, createdOrder.id);
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

describe('order-service', function () {
    test('should add order to customerUser', async () => {
        try {
            const order = await orderService.createCustomerOrder(customerUser.uid, merchantUser.uid, merchantUser.order().items);
            expect(order.id).toBeTruthy();
            expect(order.status).toEqual("new");
            expect(order.time).toBeTruthy();
            expect(order.from).toBeTruthy();
            expect(order.to).toBeTruthy();
            expect(order.items.length).toBeGreaterThan(0);
            expect(order.items[0].countryOfOrigin).toBeTruthy();
            expect(order.items[0].itemCost).toBeTruthy();
            expect(order.items[0].itemDetail).toBeTruthy();
            expect(order.items[0].itemImage).toBeTruthy();
            expect(order.items[0].itemName).toBeTruthy();
            createdOrder = order;
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });

    test('should get customerUser orders', async () => {
        try {
            const orders = await orderService.getOrders(merchantUser.uid);
            expect(orders.length).toBeGreaterThan(0);
            expect(orders[0].from).toBeTruthy();
            expect(orders[0].id).toBeTruthy();
            expect(orders[0].status).toBeTruthy();
            expect(orders[0].time).toBeTruthy();
            expect(orders[0].to).toBeTruthy();
            // expect(orders[0].items.length).toBeGreaterThan(0);
            // expect(orders[0].items[0].countryOfOrigin).toBeTruthy();
            // expect(orders[0].items[0].itemCost).toBeTruthy();
            // expect(orders[0].items[0].itemDetail).toBeTruthy();
            // expect(orders[0].items[0].itemImage).toBeTruthy();
            // expect(orders[0].items[0].itemName).toBeTruthy();
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });

    test('should update customerUser order', async () => {
        try {
            createdOrder.status = "accepted";
            const order = await orderService.updateOrder(merchantUser.uid, createdOrder);
            expect(order.id).toEqual(createdOrder.id);
            expect(order.userId).toEqual(customerUser.order().userId);
            expect(order.status).toEqual(createdOrder.status);
            expect(order.menu).toEqual(customerUser.order().menu);
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });

    test('should get customerUser order by Id', async () => {
        try {
            const menu = await orderService.getOrderById(merchantUser.uid, createdOrder.id);
            expect(menu.status).toEqual("accepted");
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });

    test('should get vendor order by status', async () => {
        try {
            const orders = await orderService.getOrdersByStatus(merchantUser.uid, "accepted");
            expect(orders.length).toBeGreaterThan(0);
            expect(orders[0].status).toEqual("accepted");
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });
});

