# vue3-di-helper

帮助您快速完成带 ts 提示的 `provide/inject`。

提供的方法：

1. `provide`
2. `inject`
3. `createInjectable`

使用：

创建 Service：

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

在父级组件：

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

在子组件任意位置，都可使用：

```ts
import { inject } from "vue3-di-helper";
import SomeService from "./some.service.ts";

const someService = inject(SomeService);
```
