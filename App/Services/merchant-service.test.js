import merchantService from './merchant-service';
import testData from './test-data-service';
import database from '../Config/database';

afterAll(() => {
    return database.firebase.database().goOffline();
});

describe('merchant-service', function () {
    let createdMenu = null;
    test('should create merchant menu', async () => {
        try {
            await merchantService.createMenu(testData.merchantUser.uid, testData.merchantUser.menu[0]);
        } catch (err) {
            expect(false).toBeTruthy();
        }
    });

    test('should get merchant menu', async () => {
        try {
            const menus = await merchantService.getMenu(testData.merchantUser.uid);
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
            await merchantService.updateMenu(testData.merchantUser.uid, createdMenu);
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });

    test('should get merchant menu by Id', async () => {
        try {
            const menu = await merchantService.getMenuById(testData.merchantUser.uid, createdMenu.id);
            expect(menu.itemName).toEqual("john snow");
            expect(menu.itemCost).toEqual(10000.00);
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });

    test('should delete a merchant menu', async () => {
        try {
            await merchantService.removeMenu(testData.merchantUser.uid, createdMenu.id);
        } catch (err) {
            expect(false).toBeTruthy();
        }
    });
});

