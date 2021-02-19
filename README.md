# vue3-di-helper

帮助您快速完成带 ts 提示的 `provide/inject`。

- [vue3-di-helper](#vue3-di-helper)
  - [Vue3 原生](#vue3-原生)
  - [原生存在的问题](#原生存在的问题)
  - [解决方案](#解决方案)
    - [第一步](#第一步)
    - [第二步](#第二步)
    - [第三步](#第三步)

## Vue3 原生

Vue3 提供了 `provide/inject` API，进行注入。

在父组件使用 `provide(key, variable);` 后，便可在任意子组件中使用 `const variable = inject(key);` 将之前 provide 的变量获取到。

通过这一特性，我们可以实现类似 Angular 的 service 功能。

即创建一个 class，其属性可以使用响应式的 `ref` 与 `reactive`：

```ts
class SomeService {
  // ...

  count: Ref<number>;

  constructor() {
    this.count = ref(0);
  }

  increase = () => {
    this.count.value++;
  };

  // ...
}
```

那么在父组件进行实例化后，将其 provide，即可获得单例服务：`provide("SOME_SERVICE_KEY", new SomeService());`。

子组件中，调用：

```ts
setup: () => {
  const someService = inject("SOME_SERVICE_KEY");

  return { count: someService.count, increase: someService.increase };
};
```

即可使用了！如此一来 Vuex 都不需要了，我们完全可以通过 service 实现非常美妙的 DDD。

## 原生存在的问题

但是原生的 provide/inject 还是存在一些问题的——主要就在于类型获取的复杂程度。

如果说我们 provide 了一个变量，那么就必须在 inject 的时候书写他的类型：`inject<Type>(key);`。这无疑是增加了复杂度。

再加上 **KEY 是一个不便与记忆与获取**的东西。

## 解决方案

提供的方法：

1. `provide`
2. `inject`
3. `createInjectable`

vue3-di-helper 的 API 为了代替原生的 provide/inject，也是为了 service 而做的。

### 第一步

创建 Service，并在导出时使用 `createInjectable(YOUR_SERVICE_CLASS)`：

```ts
import { Ref, ref } from "vue";

class SomeService {
  // ...

  count: Ref<number>;

  constructor() {
    this.count = ref(0);
  }

  increase = () => {
    this.count.value++;
  };

  // ...
}

export default createInjectable(SomeService);
```

### 第二步

在父级组件进行 provide 操作，只需要传入刚刚 `createInjectable` 处理之后变量即可。

```vue
<template></template>

<script lang="ts">
//...
import { provide } from "vue3-di-helper";

import SomeService from "./some.service.ts";

setup: () => {
  provide(SomeService);
};
//...
</script>
```

### 第三步

在子组件任意位置，都可使用 inject 和 Service 来获取刚刚注入的单例服务，并且具有完善的类型推断。

```ts
import { inject } from "vue3-di-helper";
import SomeService from "./some.service.ts";

const someService = inject(SomeService);
```
