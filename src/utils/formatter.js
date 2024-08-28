export const dateFormatter = new Intl.DateTimeFormat('pt-BR')

export const priceFormatter = (valor) => {
  let newValue = valor;
  const formatadorMoeda = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  const partes = formatadorMoeda.formatToParts(newValue);

  let resultado = '';
  let sinalNegativo = '';
  partes.forEach(parte => {
    if (parte.type === 'minusSign') {
      sinalNegativo = parte.value;
    } else if (parte.type === 'literal') {
      resultado += parte.value + sinalNegativo;
    } else {
      resultado += parte.value;
    }
  });

  return resultado;
}

export const maskCurrency = (valor, locale = 'pt-BR', currency = 'BRL') => {
  const onlyDigits = valor
    .split("")
    .filter(s => /\d/.test(s))
    .join("")
    .padStart(3, "0")

  const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2);

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(digitsFloat)
}

export const toFloat = (stringValue) => {
  return parseFloat(stringValue?.replace(/[^\d.,]/g, '')?.replace(".", "")?.replace(",", "."))
}
