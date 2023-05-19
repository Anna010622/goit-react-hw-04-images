import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContainer } from './App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { getImages } from 'api/api';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { scroll } from 'utils';

export const App = () => {
  const [value, setValue] = useState('');
  const [images, setImages] = useState(null);
  const [totalImages, setTotalImages] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoader, setIsLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (value !== '') {
      try {
        setIsLoader(true);
        async function fetchAPI() {
          const data = await getImages(value, page);

          if (!data.totalHits) {
            setTotalImages(null);
            return toast.error(
              'There are no such images. Please enter another keyword',
              { autoClose: 3000 }
            );
          }
          setImages(prevState => [...prevState, ...data.hits]);
          setTotalImages(data.totalHits);
        }

        fetchAPI();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoader(false);
      }
    }
  }, [page, value]);

  useEffect(() => {
    if (images?.length === totalImages) {
      setTotalImages(null);
    }
  }, [images?.length, totalImages]);

  const handleSubmit = newValue => {
    if (value === newValue) {
      return toast.info(`You are already viewing ${newValue}`, {
        autoClose: 3000,
      });
    }
    setValue(newValue);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);

    setTimeout(() => {
      scroll();
    }, 1000);
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <AppContainer>
      <Searchbar handleSubmit={handleSubmit} />

      {images && (
        <ImageGallery
          className="gallery"
          images={images}
          setUrl={setModalImage}
          openModal={toggleModal}
        />
      )}

      {images && !isLoader && totalImages && (
        <Button handleLoadMore={handleLoadMore} />
      )}

      {isLoader && <Loader />}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={modalImage} alt={value} />
        </Modal>
      )}
      <ToastContainer />
    </AppContainer>
  );
};
