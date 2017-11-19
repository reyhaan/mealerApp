import merchantService from './merchant-service';
import testData from './test-data-service';

describe('merchant-service', function () {
    test('should create merchant menu', async () => {
        try {
            await merchantService.createMenu(testData.customerUser.uid, testData.merchantUser.menu[0]);
        } catch (err) {
            expect(false).toBeTruthy();
        }
    });

    test('should get merchant menu', async () => {
        try {
            const menus = await merchantService.getMenu(testData.customerUser.uid);
            expect(menus.length).toBeGreaterThan(0);
            expect(menus[0].itemCost).toBeTruthy();
            expect(menus[0].itemDetail).toBeTruthy();
            expect(menus[0].itemName).toBeTruthy();
            expect(menus[0].itemImage).toBeTruthy();
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });

    test('should delete a merchant menu', async () => {

    });
});

