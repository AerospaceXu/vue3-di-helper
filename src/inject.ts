import { inject as vueInject } from "vue";

import { injectKeysHash } from "./inject-keys-hash";

export function inject<T>(Service: { new (...args: any[]): T }): T {
  const key = injectKeysHash.get(Service);
  if (!key) {
    console.error("You have to provide service first!!!");
  }
  const service = vueInject<T>(key!)!;
  return service;
}
