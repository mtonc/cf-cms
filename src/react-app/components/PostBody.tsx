import { useState, ChangeEvent } from 'react';
import { $currentPost } from '$store/posts';
import styled from 'styled-components';
import { useStore } from '@nanostores/react';

const StyledTextArea = styled.textarea.attrs<{
  $body: string,
  $handleChange: (e: ChangeEvent) => void
}>(({ $body, $handleChange }) => ({
  id: "body",
  name: "body",
  value: $body,
  onChange: $handleChange,
}))`
width: 100%;
height: 80%;
min-height: 300px;`;

const PostBody = () => { 
  const post = useStore($currentPost);
  const [body, setBody] = useState(post?.body ?? '');
  const handleChange = (e: ChangeEvent) => setBody((e.target as HTMLTextAreaElement).value);
  
  $currentPost.listen((p) => setBody(p.body ?? ''));

  return <StyledTextArea  $handleChange={handleChange} $body={body} />
}

export default PostBody;