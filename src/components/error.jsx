import { useContext } from 'react';
import { Context } from 'components/provider';

const errors = {
  currentPositionDenied: {
    name: "Couldn't Access Your Location",
    description:
      'We were unable to access your location. Please allow access to your location in your browser settings.',
  },
  locationFailed: {
    name: "Couldn't get the Location Data",
    description:
      'We were unable to fetch the location data from the server. Please try again later.',
  },
  forecastFailed: {
    name: "Couldn't get the Forecast Data",
    description:
      'We were unable to fetch the forecast data from the server. Please try again later.',
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
