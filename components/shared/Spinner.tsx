import { LoaderCircle } from 'lucide-react';
import styles from './Spinner.module.css'; // Import the CSS module

const Spinner = () => {
  return (
    <div className={styles.centeredSpinner}>
      <LoaderCircle className={styles.spinnerIcon} />
    </div>
  );
};

export default Spinner;
