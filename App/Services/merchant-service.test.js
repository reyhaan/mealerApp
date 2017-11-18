import merchantService from './merchant-service';
import testData from './test-data-service';

describe('merchant-service', function () {
    test('should create merchant menu', async () => {
        try { 
            await merchantService.createMenu(testData.customerUser.uid, testData.merchantUser.menu[0]);
            expect(true).toBeTruthy();
        } catch (err) {
            expect(false).toBeTruthy();
        }
    });
});

