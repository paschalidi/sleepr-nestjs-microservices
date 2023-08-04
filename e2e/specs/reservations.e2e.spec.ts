import {ping} from 'tcp-ping';

describe('Reservations', () => {
    beforeAll(async () => {
        const user = {
            email: "paschalidi+test@gmail.com",
            password: "strongTest12345678!",

        }
        await fetch('http://reservations:3000/auth/users', {
            method: 'POST',
            body: JSON.stringify(user)
        })

    })
    test('create', (done) => {

    });
});