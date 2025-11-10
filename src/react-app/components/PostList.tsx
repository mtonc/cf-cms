import { useRef } from "react";
import { useStore } from "@nanostores/react";
import styled from "styled-components";
import { usePosts, useId } from "$store/posts";

const StyledSelect = styled.select`
  width: 23rem;
  border:1px solid #888;
  width: 100%;`;

const PostList = () => {
  const [$posts, setUpdate] = usePosts();
  const posts = useStore($posts);
  const [id, setId] = useId();
  const selRef = useRef<HTMLSelectElement | null>(null);

  const handleChange = (): void => {
    const id = parseInt(selRef.current?.value as string);
    setId(id);
    if (id < 0) {
      setUpdate(true);
    }
  }

  return (
    <StyledSelect
      ref={selRef}
      onChange={handleChange}
      value={id}
    >
      <option value={-1}>Select a post</option>
      {...posts.map((p, i) => <option key={`${i}-${p.title}`} value={p.id}>{p.title}</option>)}
    </StyledSelect>
  );
}

export default PostList;