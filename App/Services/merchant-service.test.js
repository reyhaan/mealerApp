import authenticationService from './authentication-service';

describe('menu-service', function () {
    it('should fetch merchant menu', async () => {
        const user = await authenticationService.fetchUser('49cUHEsmznO6M5HsxLEqQOFQAjA2');
        expect(user.email).toEqual('merchant@mealer.com');
        expect(user.name).toEqual('Merchant Sir');
        expect(user.type).toEqual('merchant');
        expect(user.uid).toEqual('49cUHEsmznO6M5HsxLEqQOFQAjA2');
    });
});

