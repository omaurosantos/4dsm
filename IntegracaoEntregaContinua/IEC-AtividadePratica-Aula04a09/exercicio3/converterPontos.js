function converterPontos(score) {
  if (score < 0) {
    return 0;
  }
  if (score > 1000) {
    return score + score * 0.10;
  }
  return score;
}

module.exports = converterPontos;