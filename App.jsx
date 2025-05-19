import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import Config from './src/utils/toast/Config';
import {MainContext} from './src/context/mainContext/MainContext';
import {Provider} from 'react-redux';
import {store} from './src/redux/store/Store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';

const App = () => {
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainContext>
          <AppNavigator />
          <Toast config={Config} />
        </MainContext>
      </PersistGate>
    </Provider>
  );
};

export default App;
