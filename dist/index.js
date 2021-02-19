import { provide as provide$1, inject as inject$1 } from 'vue';

const injectKeysHash = new Map();

function provide(Service) {
    if (injectKeysHash.get(Service)) {
        console.warn("Please do not provide one service repeatedly!!!");
        return;
    }
    const key = Symbol();
    injectKeysHash.set(Service, key);
    provide$1(key, new Service());
}

function inject(Service) {
    const key = injectKeysHash.get(Service);
    if (!key) {
        console.error("You have to provide service first!!!");
    }
    const service = inject$1(key);
    return service;
}

export { inject, provide };
