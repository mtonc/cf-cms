import { RefObject, useEffect, MouseEvent, useCallback} from 'react';
import { atom, PreinitializedWritableAtom } from 'nanostores';
import { useStore } from '@nanostores/react'
import { useId, usePosts } from './posts';
import type { ClientValues, Methods } from '$types/post';
import { API_BASE, BASE_URL, POSTS } from '$types/consts';

type FiredType = PreinitializedWritableAtom<boolean>;
type MethodsType = PreinitializedWritableAtom<Methods>;
type PayloadType = PreinitializedWritableAtom<Record<string, ClientValues> | undefined>;

const $fired: FiredType = atom<boolean>(false);
const $method: MethodsType = atom<Methods>('POST');
const $payload: PayloadType = atom<Record<string, ClientValues> | undefined>(undefined);

export const useForm = (
  formRef: RefObject<HTMLFormElement | null>
): [(e: MouseEvent) => void, (e: MouseEvent) => void] => {
  const form = formRef?.current as HTMLFormElement;
  const method = useStore($method);
  const [, setUpdate] = usePosts();
  const [id, setId] = useId();

  const processFormData = (data: FormData | undefined) => {
    if (data === undefined) {
      $payload.set(undefined);
    } else {
      const values: Record<string, ClientValues> = {};
      data.forEach((val, key) => {
        values[key] = val as ClientValues;
      })
      $payload.set(values);
    }
    $fired.set(true);
  }

  const handleDelete = (e: MouseEvent) => {
    e.preventDefault();
    $method.set('DELETE');
    processFormData(undefined);
  }

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    if ((e.target as HTMLButtonElement).type !== 'submit') return;
    $method.set(id === -1 ? 'POST' : 'PUT');
    processFormData(new FormData(form));
  }
  
  const buildRequest = useCallback((): Request => {
    const REQ_URL = BASE_URL + API_BASE;
    let url: URL | undefined = undefined;
    const payload = $payload.get();

    if (id == -1 && method === 'POST') {
      url = new URL(POSTS, REQ_URL)
    }
    if (id > -1 && (method === 'DELETE' || method === 'PUT')) {
      url = new URL(`${POSTS}/${id}`, REQ_URL);
    }
    if (payload === undefined && method !== 'DELETE') {
      throw new TypeError('Payload can only be undefined if the method is "DELETE"');
    }
    return new Request(url as URL, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: payload !== undefined ? JSON.stringify(payload) : undefined,
    })
  }, [id, method]);

  const effectCleanup = useCallback(() => {
    setId(-1);
    $method.set('POST');
    $fired.set(false);
    setUpdate(true);
  }, [setId, setUpdate])

  useEffect(() => {
    if ($fired.get()) {
      (async () => {
        await fetch(buildRequest())
        .catch(error => console.error(error))
        .finally(() => effectCleanup())
      })()
    }
  }, [buildRequest, effectCleanup]);

  return [handleDelete, handleSubmit];
}