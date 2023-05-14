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
import { scroll } from 'components/utils';

export class App extends React.Component {
  state = {
    value: '',
    images: null,
    visible: false,
    page: 1,
    isLoader: false,
    showModal: false,
    modalImage: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.value !== prevState.value && this.state.value !== '') {
      try {
        this.setState({ isLoader: true, images: null, visible: false });
        const data = await getImages(this.state.value, 1);
        this.setState({ images: data.hits, page: 2 });
        if (data.hits.length === 0) {
          this.setState({ images: null });
          return toast.error(
            'There are no such images. Please enter another keyword',
            { autoClose: 3000 }
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoader: false });
      }
    }
  }

  setSearchValue = value => {
    this.setState({ value });
  };

  handleLoadMore = async () => {
    try {
      this.setState({ isLoader: true });

      const data = await getImages(this.state.value, this.state.page);

      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        page: prevState.page + 1,
      }));

      if (this.state.images.length === data.totalHits) {
        this.setState({ visible: true });
        toast.info(
          "We're sorry, but you've reached the end of the search results"
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoader: false });
      scroll();
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
        <Searchbar searchValue={this.setSearchValue} />

        {this.state.images && (
          <ImageGallery
            className="gallery"
            images={this.state.images}
            setUrl={this.setModalImage}
            openModal={this.toggleModal}
          />
        )}

        {this.state.images && !this.state.isLoader && !this.state.visible && (
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
