export type Scrubber = (value: string) => string;
export interface ScrubberMap {
    [field: string]: Scrubber
};

export const Scrubbers: ScrubberMap = {
    email: (email: string) => `******${email.substring(email.indexOf('@'))}`,
    name: () => "******",
    password: () => "******",
    username: () => "******",
};