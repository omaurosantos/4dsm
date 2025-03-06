import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    id: number;
    name: string;
    age: number;
}

interface UserState {
    users: User[];
}

const initialState = {
    users: []
}; 

const userSlice = createSlice({
    name: "cadastro",
    initialState: {
        users: [],
    } as UserState,
    reducers: {
        addUser: (state, action: PayloadAction<Omit<User, 'id'>>) => {
            // Inicio exercício 1
            const newId = state.users.length > 0 ? Math.max(...state.users.map((user) => user.id)) + 1 : 1;
            const newUser = { ...action.payload, id: newId };
            console.log('Generated ID:', newId);
            console.log('New User:', newUser);
            state.users.push(newUser);
            // Fim exercício 1
            state.users.sort((a, b) => a.age - b.age); // Ordena o array users por idade - Exercício 2


        },
        removeUser: (state, action: PayloadAction<number>) => {
            // Filtra o array e atualiza o estado
            state.users = state.users.filter((user) => action.payload !== user.id);
        },
        incrementAge: (state, action: PayloadAction<number>) => {
            // Filtra o array, mantendo apenas os usuários com id diferente do user.id
            const user = state.users.find((user) => action.payload === user.id);
            if (user) {
                user.age = user.age + 1; // Incrementa a idade no estado
            }
        }
    },
});

export const { addUser, removeUser, incrementAge } = userSlice.actions;
export default userSlice.reducer;