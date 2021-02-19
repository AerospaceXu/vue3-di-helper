import { inject as vueInject } from "vue";

import { ServiceType } from "./service.type";

export function inject<T>(Service: ServiceType<T>): T {
  const service = vueInject<T>(Service.INJECT_KEY);
  if (!service) {
    console.error("You have to provide service first!!!");
  }
  return service!;
}
