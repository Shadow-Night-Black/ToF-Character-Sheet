export type Update<T> = (update: (old: T) => T) => void;
export type UpdateMember<Property, Object> = (update: (old: Property) => Property) => (old: Object) => Object;

export type UpdateListItem<T> = (item: T, updated: T) => void;
export type AddListItem<T> = (item: T) => void;
export type RemoveListItem<T> = (item: T) => void;

export interface ListAccessors<Property> {
  update: UpdateListItem<Property>;
  add: AddListItem<Property>;
  remove: AddListItem<Property>;
}

export const GetCollectionLens: <Member, Class>(
  map: UpdateMember<Member[], Class>,
  update: Update<Class>
) => ListAccessors<Member> = (map, update) => ({
  add: (skill) => update(map((old) => old.concat(skill))),
  update: (skill, updated) => update(map((old) => old.map((s) => (s !== skill ? s : updated)))),
  remove: (item) => update(map((old) => old.filter((s) => s !== item)))
});
