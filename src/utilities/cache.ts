export class Cache<K, V> {
  state: Map<K, V>;

  constructor(initial: Map<K, V>) {
    this.state = initial;
  }

  protected get(key: K): V | undefined {
    return this.state.get(key);
  }

  protected set(key: K, value: V): V {
    this.state.set(key, value);
    return value;
  }
}
