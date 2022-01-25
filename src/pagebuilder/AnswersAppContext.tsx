
import { createContext, useContext } from 'react';
import AnswersAppConfig from './models/AnswersAppConfig';

export const AnswersAppContext = createContext<AnswersAppConfig | undefined>(undefined);

interface AnswersAppContextProviderProps {
  answersAppConfig: AnswersAppConfig
}

/**
 * Stores Answers app config in AnswersAppContext and makes the data available to any nested components.
 * 
 * @param answersAppConfig - config provided by page builder for the Answers app experience
 */
export function AnswersAppContextProvider(
  { children, answersAppConfig }: React.PropsWithChildren<AnswersAppContextProviderProps>
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
