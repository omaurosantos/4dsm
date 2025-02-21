import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Car {
    id: number;
    plate: string;
    color: string;
}

interface CarState {
    cars: Car[]; // Array de carros
}

const initialState: CarState = {
    cars: [] // Inicialmente, o array de carros está vazio
}; 

const carSlice = createSlice({
    name: "cadastro",
    initialState,
    reducers: {
        // Reducer para adicionar um carro
        addCar: (state, action: PayloadAction<Omit<Car, 'id'>>) => {
            // Gera um novo ID
            const newId = state.cars.length > 0 ? Math.max(...state.cars.map((car) => car.id)) + 1 : 1;
            // Cria um novo carro com o ID gerado
            const newCar = { ...action.payload, id: newId };
            console.log('Generated ID:', newId);
            console.log('New Car:', newCar);
            // Adiciona o novo carro ao estado
            state.cars.push(newCar);
            // Ordena o array cars por plate (outra propriedade pode ser usada se necessário)
            state.cars.sort((a, b) => a.plate.localeCompare(b.plate));
        },
        removeCar: (state, action: PayloadAction<number>) => {
            state.cars = state.cars.filter((cars) => action.payload !== cars.id);
        },
    },
});

export const { addCar, removeCar } = carSlice.actions;
export default carSlice.reducer;