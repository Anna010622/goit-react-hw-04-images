import { ProgressBar } from 'react-loader-spinner';
import { LoaderBackdrop } from './Loader.styled';

export const Loader = () => (
  <LoaderBackdrop>
    <ProgressBar
      height="80"
      width="80"
      ariaLabel="progress-bar-loading"
      wrapperStyle={{}}
      wrapperClass="progress-bar-wrapper"
      borderColor="#bea9de"
      barColor="#c399eb"
    />
  </LoaderBackdrop>
);
