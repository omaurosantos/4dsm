export interface dadosClimaticos {
    id: string;
    cidade: string;
    temperatura: number;
    umidade: number;
    velocidadeVento: number;
    condicao: 'Ensolarado' | 'Nublado' | 'Chuvoso' | 'Tempestade';
    iconeCondicao: 'weather-sunny' | 'weather-cloudy' | 'weather-rainy' | 'weather-lightning';
}

export const DADOS_SIMULADOS_CIDADES: dadosClimaticos[] = [
  {
    id: '1',
    cidade: 'São Paulo',
    temperatura: 23,
    umidade: 70,
    velocidadeVento: 15,
    condicao: 'Nublado',
    iconeCondicao: 'weather-cloudy',
  },
  {
    id: '2',
    cidade: 'Rio de Janeiro',
    temperatura: 30,
    umidade: 85,
    velocidadeVento: 10,
    condicao: 'Ensolarado',
    iconeCondicao: 'weather-sunny',
  },
  {
    id: '3',
    cidade: 'Curitiba',
    temperatura: 18,
    umidade: 88,
    velocidadeVento: 20,
    condicao: 'Chuvoso',
    iconeCondicao: 'weather-rainy',
  },
  {
    id: '4',
    cidade: 'Salvador',
    temperatura: 28,
    umidade: 75,
    velocidadeVento: 25,
    condicao: 'Tempestade',
    iconeCondicao: 'weather-lightning',
  },
]