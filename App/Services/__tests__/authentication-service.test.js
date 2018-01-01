import authenticationService from '../authentication-service';
import {vendor, customer, User} from './test-data-service';
import database from '../../Config/database';

const merchantUser = new User(vendor);
const customerUser = new User(customer);
const fakeUser = {
    email: "test",
    name:"name mane",
    type:"vendor",
    uid:"testUser"
};

afterAll(async () => {
    // delete a fake user.
    try {
        await authenticationService.removeUser(fakeUser.uid);
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

describe('authentication-service', function () {
    test('fetch merchantUser user', async () => {
        const user = await authenticationService.fetchUser(merchantUser.uid);
        expect(user.email).toEqual(merchantUser.email);
        expect(user.name).toBeTruthy();
        expect(user.type).toEqual(merchantUser.type);
        expect(user.uid).toEqual(merchantUser.uid);
    });
    test('fetch customerUser user', async () => {
        const user = await authenticationService.fetchUser(customerUser.uid);
        expect(user.email).toEqual(customerUser.email);
        expect(user.name).toEqual(customerUser.name);
        expect(user.type).toEqual(customerUser.type);
        expect(user.uid).toEqual(customerUser.uid);
    });
    test('add sample user', async () => {
        const user = await authenticationService.addUser(fakeUser);
        expect(user.uid).toEqual(fakeUser.uid);
    });
});

