import React from 'react';
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

export class App extends React.Component {
  state = {
    value: '',
    images: null,
    totalImages: null,
    page: 1,
    isLoader: false,
    showModal: false,
    modalImage: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.value !== prevState.value ||
      this.state.page !== prevState.page
    ) {
      try {
        this.setState({ isLoader: true });
        const data = await getImages(this.state.value, this.state.page);

        if (!data.totalHits) {
          this.setState({ totalImages: null });
          return toast.error(
            'There are no such images. Please enter another keyword',
            { autoClose: 3000 }
          );
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          totalImages: data.totalHits,
        }));

        if (this.state.images.length === data.totalHits) {
          this.setState({ totalImages: null });
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoader: false });
      }
    }
  }

  handleSubmit = value => {
    if (this.state.value === value) {
      return toast.info(`You are already viewing ${value}`, {
        autoClose: 3000,
      });
    }
    this.setState({ value, images: [], page: 1 });
  };

  handleLoadMore = async () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));

    setTimeout(() => {
      scroll(this.state.totalImages / 3);
    }, 1000);

    if (this.state.images.length === this.state.totalImages) {
      toast.info(
        "We're sorry, but you've reached the end of the search results"
      );
    }
  };

  setModalImage = largeUrl => {
    this.setState({
      modalImage: largeUrl,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    return (
      <AppContainer>
        <Searchbar handleSubmit={this.handleSubmit} />

        {this.state.images && (
          <ImageGallery
            className="gallery"
            images={this.state.images}
            setUrl={this.setModalImage}
            openModal={this.toggleModal}
          />
        )}

        {this.state.images &&
          !this.state.isLoader &&
          this.state.totalImages && (
            <Button handleLoadMore={this.handleLoadMore} />
          )}

        {this.state.isLoader && <Loader />}

        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={this.state.modalImage} alt={this.state.value} />
          </Modal>
        )}
        <ToastContainer />
      </AppContainer>
    );
  }
}
