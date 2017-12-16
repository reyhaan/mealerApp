import merchantService from './merchant-service';
import {merchant, customer, User} from './test-data-service';

afterAll(async () => {

});

describe('order-service', function () {
    test('should update merchants quota', async () => {
        try {
            const result = await merchantService.updateQuota(merchant.uid);
            expect(result).toBeTruthy();
        } catch (err) {
            expect(err).toBeUndefined();
        }
    });
});

