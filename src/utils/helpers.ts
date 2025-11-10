import Post, { PostFields, ServerValues, ClientValues } from "$types/post";

export const processforServer = (data: Record<string, ClientValues>): Post  => {
  const values: Post = {} as Post;
  PostFields.forEach(pf => {
    values[pf] = data[pf] === undefined ? null : data[pf] as ServerValues
  });
  return values;
}

export const processForClient = (data: Post | undefined): Post => {
  const values: Post = {} as Post;
  const isNull = (value: ServerValues | undefined) => value === null || value === "null";
  if (data !== undefined) {
    for (const f of PostFields) {
      values[f] = isNull(data[f]) ? undefined : data[f];
    }
  }
  return values;
}