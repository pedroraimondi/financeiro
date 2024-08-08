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
