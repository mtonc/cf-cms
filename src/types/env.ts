import type Post from './post';

type Env = {
  Variables: {
    $posts: Post[];
  }
}

export default Env;