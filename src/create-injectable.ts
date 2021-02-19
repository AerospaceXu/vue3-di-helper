export function createInjectable<T extends new (...args: any[]) => {}>(
  constructor: T
) {
  return class extends constructor {
    static INJECT_KEY = "";
  };
}
