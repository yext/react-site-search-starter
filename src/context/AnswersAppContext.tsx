
import { createContext, useContext } from 'react';
import AnswersAppConfig from '../models/AnswersAppConfig';

export const AnswersAppContext = createContext<AnswersAppConfig | undefined>(undefined);

export function AnswersAppContextProvider(
  { children, answersAppConfig }: React.PropsWithChildren<{answersAppConfig: AnswersAppConfig}>
): JSX.Element {
  return (
    <AnswersAppContext.Provider value={answersAppConfig}>
      {children}
    </AnswersAppContext.Provider>
  );
}

export function useAnswersAppContext() {
  const context = useContext(AnswersAppContext);
  if (context === undefined) {
    throw new Error('Attempted to call useAnswersAppContext() outside of AnswersAppContextProvider.'
     + ' Please ensure that \'useAnswersAppContext()\' is called within an AnswersAppContextProvider component.');
  }
  return context;
}
