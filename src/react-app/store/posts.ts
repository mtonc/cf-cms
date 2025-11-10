import { atom, PreinitializedWritableAtom, computed } from 'nanostores';
import { useStore } from '@nanostores/react';
import type Post from '$types/post';
import { useEffect, useState } from 'react';
import { processForClient } from '$utils/helpers';
import { POSTS } from '$types/consts';

const $id = atom<number>(-1);
const $posts = atom<Post[]>([]);
export const $currentPost = computed([$posts, $id], (posts, id) => {
  const post = posts.find((p) => p.id == id);
  console.log(id, post)
  return processForClient(post);
});

export const useId = (): [number, (newId: number) => void] => {
  const id = useStore($id);
  return [id, (newId: number) => $id.set(newId)];
}

export const usePosts = (): [PreinitializedWritableAtom<Post[]>, React.Dispatch<React.SetStateAction<boolean>>] => {  
  const [shouldUpdate, setUpdate] = useState(true);

  useEffect(() => {
    let loading = false;
    if (!loading && shouldUpdate) {
      loading = true;
      (async function() {
        await fetch(POSTS)
        .then(res => res.json())
        .then(data => $posts.set(data))
        .catch(error => console.error(error))
        .finally(() => {
          loading = false;
          setUpdate(false);
        });
      })()
    }
  }, [shouldUpdate]);
  return [$posts, setUpdate];
}
