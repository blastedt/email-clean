import { Scrubbers } from "../src/scrubbers";

describe('cleaner functions', function () {
    it('replaces names with stars', function () {
        expect(Scrubbers.name('name')).toEqual('******');
    });
    it('replaces usernames with stars', function () {
        expect(Scrubbers.username('username')).toEqual('******');
    });
    it('replaces passwords with stars', function () {
        expect(Scrubbers.password('password')).toEqual('******');
    });
    it('replaces the username of an email with stars', function () {
        expect(Scrubbers.email('blastedt@gmail.com')).toEqual('******@gmail.com');
    });
});