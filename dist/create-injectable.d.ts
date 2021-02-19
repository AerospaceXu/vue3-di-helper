export declare function createInjectable<T extends new (...args: any[]) => {}>(constructor: T): {
    new (...args: any[]): {};
    INJECT_KEY: string;
} & T;
