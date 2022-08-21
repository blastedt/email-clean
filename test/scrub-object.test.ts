import { scrub } from "../src/scrub-object";

describe('Cleaning objects', function () {
    describe('with no depth', function () {
        it('cleans usernames', function () {
            expect(scrub({ username: 'Tim' })).toEqual({ username: '******' });
        });
        it('cleans passwords', function () {
            expect(scrub({ password: 'hunter2' })).toEqual({ password: '******' });
        });
        it('cleans names', function () {
            expect(scrub({ name: 'Tim' })).toEqual({ name: '******' });
        });
        it('cleans emails', function () {
            expect(scrub({ email: 'blastedt@gmail.com' })).toEqual({ email: '******@gmail.com' });
        });
        it('leaves other string fields alone', function () {
            expect(scrub({ foo: 'bar' })).toEqual({ foo: 'bar' });
        });
        it('leaves other types of fields alone', function () {
            expect(scrub({ numeric: 3 })).toEqual({ numeric: 3 });
        });
        it('cleans multiple fields', function () {
            const original = {
                email: 'blastedt@gmail.com',
                foo: 'bar',
                name: 'Tim',
                password: 'hunter2',
                username: 'Tim',
            };
            const expected = {
                email: '******@gmail.com',
                foo: 'bar',
                name: '******',
                password: '******',
                username: '******',
            };
            expect(scrub(original)).toEqual(expected);
        });
    });

    describe('with depth', function () {
        it('cleans objects', function () {
            const original = {
                username: 'Tim',
                foo: 3,
                data: {
                    email: 'blastedt@gmail.com',
                    password: 'hunter2',
                    bar: 'qux',
                    moreDepth: {
                        name: 'Tim',
                        quack: 'quack',
                    },
                },
            };
            const expected = {
                username: '******',
                foo: 3,
                data: {
                    email: '******@gmail.com',
                    password: '******',
                    bar: 'qux',
                    moreDepth: {
                        name: '******',
                        quack: 'quack',
                    },
                },
            };
            expect(scrub(original)).toEqual(expected);
        });
        it('cleans arrays of objects', function () {
            const original = {
                static: [
                    { name: 'Tim', job: 'Gunbreaker' },
                    { name: 'Quinndolyn', job: 'Warrior' },
                    { name: 'Rose', job: 'Dragoon' },
                    { name: 'Rebecca', job: 'Ninja' },
                    { name: 'Chris', job: 'White Mage' },
                    { name: 'Oat', job: 'Scholar' },
                    { name: 'Elly', job: 'Black Mage' },
                    { name: 'Alex', job: 'Machinist' },
                ],
            };
            const expected = {
                static: [
                    { name: '******', job: 'Gunbreaker' },
                    { name: '******', job: 'Warrior' },
                    { name: '******', job: 'Dragoon' },
                    { name: '******', job: 'Ninja' },
                    { name: '******', job: 'White Mage' },
                    { name: '******', job: 'Scholar' },
                    { name: '******', job: 'Black Mage' },
                    { name: '******', job: 'Machinist' },
                ],
            };
            expect(scrub(original)).toEqual(expected);
        });
        it('cleans stacked arrays', function () {
            const original = {
                static: [
                    [
                        { name: 'Tim', job: 'Gunbreaker' },
                        { name: 'Quinndolyn', job: 'Warrior' },
                    ],
                    [
                        { name: 'Chris', job: 'White Mage' },
                        { name: 'Oat', job: 'Scholar' },
                    ],
                    [
                        { name: 'Elly', job: 'Black Mage' },
                        { name: 'Alex', job: 'Machinist' },
                        { name: 'Rose', job: 'Dragoon' },
                        { name: 'Rebecca', job: 'Ninja' },
                    ]
                ],
            };
            const expected = {
                static: [
                    [
                        { name: '******', job: 'Gunbreaker' },
                        { name: '******', job: 'Warrior' },
                    ],
                    [
                        { name: '******', job: 'White Mage' },
                        { name: '******', job: 'Scholar' },
                    ],
                    [
                        { name: '******', job: 'Black Mage' },
                        { name: '******', job: 'Machinist' },
                        { name: '******', job: 'Dragoon' },
                        { name: '******', job: 'Ninja' },
                    ]
                ],
            };
            expect(scrub(original)).toEqual(expected);
        });
        it('leaves other array elements alone', function () {
            const original = {
                arr: [
                    'a',
                    {name: 'Tim'},
                    3
                ]
            };
            const expected = {
                arr: [
                    'a',
                    {name: '******'},
                    3
                ]
            };
            expect(scrub(original)).toEqual(expected);
        });
    });

    it('matches the given example', function () {
        const original = {
            id: 123,
            name: "Elsa",
            username: "xXfrozen_princessXx",
            email: "elsa@arendelle.com",
            age: 21,
            power: "ice ray",
            friends: [{
                id: 234,
                username: "MagicSnowman32"
            }, {
                id: 456,
                username: "call_me_anna"
            }],
        };
        const expected = {
            id: 123,
            name: "******",
            username: "******",
            email: "******@arendelle.com",
            age: 21,
            power: "ice ray",
            friends: [{
                id: 234,
                username: "******"
            }, {
                id: 456,
                username: "******"
            }],
        };
        expect(scrub(original)).toEqual(expected);
    });
});