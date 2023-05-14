import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ images, setUrl, openModal }) => {
  return (
    <Gallery className="gallery">
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          setUrl={setUrl}
          openModal={openModal}
        />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  setUrl: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};
