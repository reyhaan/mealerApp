import menuService from './menu-service';
import {merchant, User} from './test-data-service';
import database from '../Config/database';

let createdMenu = null;
const merchantUser = new User(merchant);

afterAll(async () => {
    // delete a merchant menu.
    try {
        await menuService.removeMenu(merchantUser.uid, createdMenu.id);
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

describe('menu-service', function () {
    test('should create merchant menu', async () => {
        try {
            const menu = await menuService.createMenu(merchantUser.uid, merchantUser.menu());
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
            const menus = await menuService.getMenu(merchantUser.uid);
            expect(menus.length).toBeGreaterThan(0);
            expect(menus[0].id).toBeTruthy();
            expect(menus[0].itemCost).toBeTruthy();
            expect(menus[0].itemDetail).toBeTruthy();
            expect(menus[0].itemName).toBeTruthy();
            expect(menus[0].itemImage).toBeTruthy();
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });

    test('should update merchant menu', async () => {
        try {
            createdMenu.itemName = "john snow";
            createdMenu.itemCost = 10000.00;
            const menu = await menuService.updateMenu(merchantUser.uid, createdMenu);
            expect(menu.id).toBeTruthy();
            expect(menu.itemCost).toBeTruthy();
            expect(menu.itemDetail).toBeTruthy();
            expect(menu.itemName).toBeTruthy();
            expect(menu.itemImage).toBeTruthy();
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });

    test('should get merchant menu by Id', async () => {
        try {
            const menu = await menuService.getMenuById(merchantUser.uid, createdMenu.id);
            expect(menu.id).toEqual(createdMenu.id);
            expect(menu.itemCost).toEqual(createdMenu.itemCost);
            expect(menu.itemDetail).toEqual(merchantUser.menu().itemDetail);
            expect(menu.itemName).toEqual(createdMenu.itemName);
            expect(menu.itemImage).toEqual(merchantUser.menu().itemImage);
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });
});