import authenticationService from './authentication-service';
import testData from './test-data-service';
import database from '../Config/database';

afterAll(() => {
    return database.firebase.database().goOffline();
});

describe('authentication-service', function () {
    test('fetch merchantUser user', async () => {
        const user = await authenticationService.fetchUser(testData.merchantUser.uid);
        expect(user.email).toEqual(testData.merchantUser.email);
        expect(user.name).toEqual(testData.merchantUser.name);
        expect(user.type).toEqual(testData.merchantUser.type);
        expect(user.uid).toEqual(testData.merchantUser.uid);
    });
    test('fetch customerUser user', async () => {
        const user = await authenticationService.fetchUser(testData.customerUser.uid);
        expect(user.email).toEqual(testData.customerUser.email);
        expect(user.name).toEqual(testData.customerUser.name);
        expect(user.type).toEqual(testData.customerUser.type);
        expect(user.uid).toEqual(testData.customerUser.uid);
    });
});

