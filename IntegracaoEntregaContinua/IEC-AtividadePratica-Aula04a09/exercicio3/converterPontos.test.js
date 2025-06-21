const converterPontos = require('./converterPontos');

describe('Testes para a função converterPontos', () => {

  // Teste com valor positivo dentro do limite (não deve mudar)
  test('deve retornar o mesmo valor para score positivo igual ou abaixo de 1000', () => {
    expect(converterPontos(500)).toBe(500); // Usa expect().toBe() para comparar valores
  });

  // Teste com valor positivo no limite
  test('deve retornar o mesmo valor para score igual a 1000', () => {
    expect(converterPontos(1000)).toBe(1000);
  });

  // Teste com valor positivo acima do limite (deve aplicar bônus)
  test('deve retornar o score com 10% de bônus para valores acima de 1000', () => {
    expect(converterPontos(2000)).toBe(2200);
  });

  // Teste com valor zero
  test('deve retornar 0 para score igual a 0', () => {
    expect(converterPontos(0)).toBe(0);
  });

  // Teste com valor negativo
  test('deve retornar 0 para score negativo', () => {
    expect(converterPontos(-50)).toBe(0);
  });

});