export type Identable = { key: number };

export function nextId(collection: Identable[]): number {
    return collection.reduce((acc, val) => (acc > val.key ? acc : val.key), 0) + 1;
}
