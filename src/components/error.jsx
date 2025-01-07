import { useContext } from 'react';
import { Context } from 'provider';

function Error() {
  const context = useContext(Context);

  return (
    <div className="error">
      <h2 className="error__heading">{context.error.name}</h2>
      <p className="error__description">{context.error.description}</p>
    </div>
  );
}

Error.displayName = 'Error';

export default Error;
