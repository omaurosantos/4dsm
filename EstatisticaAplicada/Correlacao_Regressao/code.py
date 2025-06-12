# Dados
x = [1, 2, 3, 4, 5]
y = [1, 2, 4, 5, 8]

# Número de pontos
n = len(x)

# Soma dos termos necessários
soma_x = sum(x)
soma_y = sum(y)
soma_xy = sum(x[i] * y[i] for i in range(n))
soma_x2 = sum(x[i] ** 2 for i in range(n))

# Cálculo dos coeficientes da reta y = ax + b
a = (n * soma_xy - soma_x * soma_y) / (n * soma_x2 - soma_x ** 2)
b = (soma_y - a * soma_x) / n

print(f"Equação da reta ajustada: y = {a:.2f}x + {b:.2f}")

# Interpolação para x = 3.5
x_interp = 3.5
y_interp = a * x_interp + b
print(f"Valor estimado de y para x = {x_interp}: {y_interp:.2f}")

# Extrapolação para x = 10
x_extra = 10
y_extra = a * x_extra + b
print(f"Valor estimado de y para x = {x_extra}: {y_extra:.2f}")
