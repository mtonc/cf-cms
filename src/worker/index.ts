import { Hono } from 'hono';
import posts from '$routes/posts';
import { logger } from 'hono/logger';
import type Env from "../types/env";
import { POSTS, API_BASE } from "$types/consts";

// Init
const app = new Hono<Env>();
// Middleware
app.use(logger());
app.basePath(API_BASE);
// Route handlers
app.route(POSTS, posts);

export default {
  fetch: app.fetch
};
