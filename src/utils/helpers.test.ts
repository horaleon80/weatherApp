import { cleanTimeZone } from './helpers';

describe('cleanTimeZone', () => {
    it('should replace slashes with commas and spaces', () => {
        const input = 'America/New_York';
        const expectedOutput = 'America, New York';
        expect(cleanTimeZone(input)).toBe(expectedOutput);
    });

    it('should replace underscores with spaces', () => {
        const input = 'America/New_York';
        const expectedOutput = 'America, New York';
        expect(cleanTimeZone(input)).toBe(expectedOutput);
    });

    it('should handle both slashes and underscores', () => {
        const input = 'America/New_York_City';
        const expectedOutput = 'America, New York City';
        expect(cleanTimeZone(input)).toBe(expectedOutput);
    });

    it('should return an empty string if input is undefined', () => {
        const input = undefined;
        const expectedOutput = '';
        expect(cleanTimeZone(input)).toBe(expectedOutput);
    });

    it('should return an empty string if input is an empty string', () => {
        const input = '';
        const expectedOutput = '';
        expect(cleanTimeZone(input)).toBe(expectedOutput);
    });
});