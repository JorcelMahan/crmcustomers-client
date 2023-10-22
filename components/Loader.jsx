import ClipLoader from 'react-spinners/ClipLoader';

const Backdrop = ({ children }) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center'>
      {children}
    </div>
  );
};

const Loader = () => {
  return (
    <Backdrop>
      <ClipLoader
        color={'#123abc'}
        loading={true}
        size={150}
        aria-label='Loading Spinner'
      />
    </Backdrop>
  );
};

export default Loader;
