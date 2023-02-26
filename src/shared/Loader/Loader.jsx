import { ColorRing } from 'react-loader-spinner';
import scss from './loader.module.scss';

const Loader = () => {
  return (
    <div className={scss.loader}>
      <ColorRing
        padding="20"
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    </div>
  );
};

export default Loader;
