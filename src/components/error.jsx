import { useContext } from 'react';
import { Context } from 'components/provider';

const errors = {
  currentPositionDenied: {
    name: "Couldn't Access Your Location",
    description:
      'We were unable to access your location. Please enable location access in your browser settings and try again.',
  },
  locationFailed: {
    name: "Couldn't get Location Data",
    description:
      'We were unable to fetch location data from the server. Please try again later.',
  },
  forecastFailed: {
    name: "Couldn't get Forecast Data",
    description:
      'We were unable to fetch forecast data from the server. Please try again later.',
  },
};

function Error() {
  const context = useContext(Context);
  const error = errors[context.error];

  return (
    <div className="error">
      <h2 className="error__heading">{error.name}</h2>
      <p className="error__description">{error.description}</p>
    </div>
  );
}

Error.displayName = 'Error';

export default Error;
