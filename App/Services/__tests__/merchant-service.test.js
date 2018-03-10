import merchantService from '../vendor-service';
import { vendor } from '../test-data-service';

afterAll(async () => {

});

describe('order-service', () => {
  test('should update merchants quota', async () => {
    try {
      const result = await merchantService.updateQuota(vendor.uid);
      expect(result).toBeTruthy();
    } catch (err) {
      expect(err).toBeUndefined();
    }
  });
});

