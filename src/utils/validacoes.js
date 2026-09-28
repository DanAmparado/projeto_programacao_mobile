// Remove tudo que não é número
export function apenasNumeros(valor) {
  return String(valor).replace(/\D/g, '');
}

// Formata CPF enquanto digita: 000.000.000-00
export function formatarCpf(valor) {
  const num = apenasNumeros(valor).slice(0, 11);

  return num
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

// Valida e-mail com regex simples
export function emailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(String(email).trim().toLowerCase());
}

// Valida CPF (formato + dígitos verificadores)
export function cpfValido(cpf) {
  const num = apenasNumeros(cpf);

  if (num.length !== 11) return false;

  // Rejeita sequências tipo 111.111.111-11
  if (/^(\d)\1{10}$/.test(num)) return false;

  // Valida 1º dígito
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += Number(num[i]) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;
  if (resto !== Number(num[9])) return false;

  // Valida 2º dígito
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += Number(num[i]) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;
  if (resto !== Number(num[10])) return false;

  return true;
}

// Formata telefone: (00) 00000-0000 ou (00) 0000-0000
export function formatarTelefone(valor) {
  const num = apenasNumeros(valor).slice(0, 11);

  if (num.length <= 10) {
    return num
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d{1,4})$/, '$1-$2');
  }

  return num
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
}