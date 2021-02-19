import { provide as vueProvide } from "vue";

import { ServiceType } from "./service.type";

import { createInjectKey } from "./create-inject-key";

export function provide<T>(Service: ServiceType<T>) {
  const key = createInjectKey();
  Service.INJECT_KEY = key;
  vueProvide(key, new Service());
}
