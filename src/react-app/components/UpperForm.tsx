import { useState  } from 'react';
import { useStore } from '@nanostores/react';
import { $currentPost } from '$store/posts';

const UpperForm = () => {
  const cp = useStore($currentPost)
  const [title, setTitle] = useState(cp.title ?? '');
  const [blurb, setBlurb] = useState(cp.blurb ?? '');
  const [image, setImage] = useState(cp.heroImage ?? '');
  const [alt, setAlt] = useState(cp.heroAlt ?? '');
  const [draft, setDraft] = useState(cp.draft ?? true);

  $currentPost.listen((post) => {
    setTitle(post.title ?? '');
    setBlurb(post.blurb ?? '');
    setImage(post.heroImage ?? '')
    setAlt(post.heroAlt ?? '');
    setDraft(post.draft ?? true);
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'blurb':
        setBlurb(value);
        break;
      case 'heroImage':
        setImage(value);
        break;
      case 'heroAlt':
        setAlt(value);
        break;
      case 'draft':
        setDraft(checked);
        break;
      default:
        break;
    }
  }

  return (
    <>
      <label htmlFor="title">
        Title:&nbsp;
        <input
          id="title"
          name='title'
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleChange}
          required
        />
      </label><br/>
      <label htmlFor="blurb">
        Blurb:&nbsp;
        <input
          id="blurb"
          name="blurb"
          type="text"
          placeholder="A short description" 
          value={blurb}
          onChange={handleChange}
          required
        />
      </label><br/>
      <label htmlFor="draft">
        Draft:&nbsp;
        <input
          id="draft"
          name="draft"
          type="checkbox"
          checked={draft}
          onChange={handleChange}
        />
      </label><br/>
      <label htmlFor="heroImage">
        Cloudinary Image Name:
        <input
          id="image"
          name='heroImage'
          type="text"
          placeholder='Cloudinary Image Id'
          value={image as string}
          onChange={handleChange}
        />
      </label><br/>
      <label htmlFor="heroAlt">
        Image Alt:
        <input
          id="alt"
          name='heroAlt'
          type="text"
          placeholder="A description of the image"
          value={alt as string}
          onChange={handleChange}
        />
        </label><br/>
    </>
  );
}

export default UpperForm;