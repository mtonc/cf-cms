import { Hono } from "hono";
import { processforServer } from "$utils/helpers";
import type Post from '$types/post';

type Bindings = {
  DB: D1Database
}

const Posts = new Hono<{ Bindings: Bindings }>();

Posts.get('/', async (c) => {
  const { results } = await c.env.DB.prepare(`SELECT * FROM blogs`).run();
  console.table(results)
  return c.json(results as Post[]);
});

Posts.get('/:id', async (c) => {
  const paramId = c.req.param('id');
  const stmnt = 'SELECT * FROM blogs WHERE id = ?';
  const { results } = await c.env.DB.prepare(stmnt).bind(paramId).run();
  return c.json(results);
})

Posts.post('/', async (c) => {
  const { title, blurb, body, heroImage, heroAlt, draft } = processforServer(await c.req.json());
  const stmnt = `INSERT INTO blogs 
  (title, blurb, body, publishedAt, heroImage, heroAlt, draft) 
  VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const prepared = c.env.DB.prepare(stmnt).bind(
    title, blurb, body, Date.now(), heroImage, heroAlt, draft 
  );
  const { results } = await prepared.run();
  return c.json(results);
});

Posts.put('/:id', async (c) => {
  const paramId = c.req.param('id');
  const { title, blurb, body, heroImage, heroAlt, draft }  = processforServer(await c.req.json())
  console.log(title);
  const stmnt = `UPDATE blogs
  SET title = ?, blurb = ?, body = ?, updatedDate = ?, heroImage = ?, heroAlt = ?, draft = ?
  WHERE id = ?`;
  const prepared = c.env.DB.prepare(stmnt).bind(
    title, blurb, body, Date.now(), heroImage, heroAlt, draft, paramId
  );
  const { results, success} = await prepared.run();
  return c.json({
    results,
    success
  })
});

Posts.delete('/:id',async (c) => {
  const paramID = c.req.param('id');
  const stmnt = 'DELETE FROM blogs WHERE id = ?';
  const prepared = c.env.DB.prepare(stmnt).bind(paramID);
  const { results, success} = await prepared.run();
  return c.json({
    results,
    success
  })
});

export default Posts;

