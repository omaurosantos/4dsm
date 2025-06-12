def calcular_intervalo_confianca(media_amostral, desvio_padrao, n, z):
    erro_padrao = desvio_padrao / (n ** 0.5)
    margem_erro = z * erro_padrao
    limite_inferior = media_amostral - margem_erro
    limite_superior = media_amostral + margem_erro
    return (limite_inferior, limite_superior)

# Dados fixos
media = 4.85
desvio = 0.75

# Z para 95% e 98%
z_95 = 1.96
z_98 = 2.33

# a) 95% de confiança, n = 20
ic_95_n20 = calcular_intervalo_confianca(media, desvio, 20, z_95)
print("a) IC 95% (n=20):", ic_95_n20)

# b) 95% de confiança, n = 16
ic_95_n16 = calcular_intervalo_confianca(media, desvio, 16, z_95)
print("b) IC 95% (n=16):", ic_95_n16)

# c) 98% de confiança, n = 20
ic_98_n20 = calcular_intervalo_confianca(media, desvio, 20, z_98)
print("c) IC 98% (n=20):", ic_98_n20)
