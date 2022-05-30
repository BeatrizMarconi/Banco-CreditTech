import { AppContextProvider } from './context/appContext';
import RoutesPages from './routes';

export default function App() {
  return (
    <AppContextProvider>
      <RoutesPages />
    </AppContextProvider>
  );
};


