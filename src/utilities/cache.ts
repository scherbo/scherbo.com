// deno-lint-ignore-file no-explicit-any
export class Cache {
  state: Map<any, any>;

  constructor(initial: Map<any, any>) {
    this.state = initial;
  }

  protected get(key: any) {
    return this.state.get(key);
  }

  protected set(key: any, value: any) {
    this.state.set(key, value);

    return value;
  }
}
