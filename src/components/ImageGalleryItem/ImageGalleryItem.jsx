import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, setUrl, openModal }) => {
  const handleImageClick = () => {
    setUrl(image.largeImageURL);
    openModal();
  };

  return (
    <GalleryItem>
      <GalleryImage
        src={image.webformatURL}
        alt={image.tags}
        onClick={handleImageClick}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  setUrl: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};
