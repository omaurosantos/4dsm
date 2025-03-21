
/*
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons"; // Usando a versão do Expo
import Dois2 from "./src/screens_2/Dois2";
import Tres2 from "./src/screens_2/Tres2";
import { RootStackParamList } from "./types";

const Drawer = createDrawerNavigator<RootStackParamList>();

const App: React.FC = () => (
  <NavigationContainer>
    <Drawer.Navigator
      initialRouteName="Um"
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#F5F5F5",
          width: 240,
        },
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "bold",
        },
        drawerActiveTintColor: "#FFA500",
        drawerInactiveTintColor: "#333",
      }}
    >
      <Drawer.Screen
        name="Um"
        component={Um}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Dois"
        component={Dois}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Tres"
        component={Tres}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Quatro"
        component={Quatro}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cube" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Cinco"
        component={Cinco}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="flag" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Seis"
        component={Seis}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="time" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Sete"
        component={Sete}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="musical-note" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Oito"
        component={Oito}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="eye" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Nove"
        component={Nove}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="chatbubble" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Dez"
        component={Dez}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Dois2"
        component={Dois2}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="menu" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Tres2"
        component={Tres2}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="menu" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default App;

*/
// src/App.tsx
// src/App.tsx

// APP DO EXERCÍCIO 4
/*
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Quatro2 from "./src/screens_2/Quatro2"; // Certifique-se de que este arquivo existe
import { RootStackParamList } from "./types"; // Ajuste o caminho se necessário
import { CepProvider } from "./src/contexts/CepContext";

const Drawer = createDrawerNavigator<RootStackParamList>();

const App: React.FC = () => (
  <CepProvider>
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Quatro2" // Deve coincidir com o name da Drawer.Screen
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#F5F5F5",
            width: 240,
          },
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: "bold",
          },
          drawerActiveTintColor: "#FFA500",
          drawerInactiveTintColor: "#333",
        }}
      >
        <Drawer.Screen
          name="Quatro2" // Nome da rota, deve estar em RootStackParamList
          component={Quatro2} // Componente associado à rota
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="search" size={size} color={color} />
            ),
            title: "ViaCEP",
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  </CepProvider>

  
);


export default App;

*/

// src/App.tsx
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Quatro2 from "./src/screens_2/Quatro2"; // Certifique-se de que este arquivo existe
import Cinco2 from "./src/screens_2/Cinco2"; // Importando o Cinco2
import { RootStackParamList } from "./types"; // Ajuste o caminho se necessário
import { CepProvider } from "./src/contexts/CepContext";

const Drawer = createDrawerNavigator<RootStackParamList>();

const App: React.FC = () => (
  <CepProvider>
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Quatro2" // Pode alterar para "Cinco2" se preferir que seja a tela inicial
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#F5F5F5",
            width: 240,
          },
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: "bold",
          },
          drawerActiveTintColor: "#FFA500",
          drawerInactiveTintColor: "#333",
        }}
      >
        <Drawer.Screen
          name="Quatro2" // Nome da rota, deve estar em RootStackParamList
          component={Quatro2} // Componente associado à rota
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="search" size={size} color={color} />
            ),
            title: "ViaCEP",
          }}
        />
        <Drawer.Screen
          name="Cinco2" // Nome da nova rota
          component={Cinco2} // Componente associado à rota
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="flag" size={size} color={color} />
            ),
            title: "Consulta de CEP", // Título que aparecerá no drawer
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  </CepProvider>
);

export default App;