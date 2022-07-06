
import { SpinnerCircular } from 'spinners-react';
import './spinner.css';
const LoadingSpinner =()=> {
  return (
    <div className="spinner-container">
      <div className="loading-spinner">
        
      </div>
      <p className='message'>please wait..</p>
    </div>

  );
}

export default LoadingSpinner;