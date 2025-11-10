import { useRef } from 'react';
import UpperForm from '$comps/UpperForm';
import PostList from '$comps/PostList';
import Button from '$comps/Buttons';
import PostBody from '$comps/PostBody';
import { FormCTX } from './contexts/FormContext';

import './App.css';

const App = () => {
  const formRef = useRef(null);
  return <>
    <PostList />
    <form ref={formRef}>
      <FormCTX.Provider value={formRef} >
        <UpperForm/>
        <PostBody />
        <Button type={'submit'} value={'Submit'} />
        <Button
          type={'button'}
          customType='delete'
          value={'Delete Post'}
        />
      </FormCTX.Provider>
    </form>
  </>
}

export default App;