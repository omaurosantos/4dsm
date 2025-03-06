import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import carReducer from "./slices/carSlice"; // Importa o reducer de veículos

export const store = configureStore({
    reducer: {
        userObject: userReducer,
        carsObject: carReducer,
    },
});
// Tipos para uso com TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;