import { provide as provide$1, inject as inject$1 } from 'vue';

function createInjectable(constructor) {
    var _a;
    return _a = class extends constructor {
        },
        _a.INJECT_KEY = "",
        _a;
}

const createInjectKey = () => {
    const randomNumber = Math.round(Math.random() * 10 ** 12);
    return randomNumber.toString();
};

function provide(Service) {
    const key = createInjectKey();
    Service.INJECT_KEY = key;
    provide$1(key, new Service());
}

function inject(Service) {
    const service = inject$1(Service.INJECT_KEY);
    if (!service) {
        console.error("You have to provide service first!!!");
    }
    return service;
}

export { createInjectable, inject, provide };
