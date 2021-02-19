export interface ServiceType<T> {
  new (): T;
  INJECT_KEY: string;
}
