import { provide as vueProvide, InjectionKey } from "vue";

import { injectKeysHash } from "./inject-keys-hash";

export function provide<T>(Service: { new (...args: any[]): T }): void {
  if (injectKeysHash.get(Service)) {
    console.warn("Please do not provide one service repeatedly!!!");
    return;
  }
  const key: InjectionKey<T> = Symbol();
  injectKeysHash.set(Service, key);
  vueProvide(key, new Service());
}
