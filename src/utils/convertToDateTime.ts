/**
 * Converte uma string no formato 'YYYY-M-D/HH:MM' para um objeto Date.
 * Exemplo de entrada esperada: '2024-9-9/00:00' ou '2024-9-9' (preenche com 00:00).
 *
 * @param {string} dateTimeString - A string no formato 'YYYY-M-D/HH:MM' ou 'YYYY-M-D' representando a data e hora.
 * @returns {Date | null} - Retorna o objeto Date correspondente ou null se a string for indefinida ou inválida.
 */
export const convertToDateTime = (dateTimeString?: string): Date | null => {
    if (!dateTimeString) {
        return null; // Trata entradas indefinidas ou vazias
    }

    const [datePart, timePart = '00:00'] = dateTimeString.split('/');
    if (!datePart) {
        throw new Error('Formato de dateTimeString inválido. Esperado: YYYY-M-D ou YYYY-M-D/HH:MM');
    }

    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);

    // Validação mais robusta dos valores de data e hora
    if (!isValidDate(year, month, day) || !isValidTime(hours, minutes)) {
        throw new Error('Valores de data ou hora inválidos');
    }

    return new Date(year, month - 1, day, hours, minutes);
};

// Função auxiliar para validar datas
const isValidDate = (year: number, month: number, day: number): boolean => {
    if (isNaN(year) || isNaN(month) || isNaN(day)) return false;
    if (month < 1 || month > 12) return false;

    const lastDayOfMonth = new Date(year, month, 0).getDate();
    return day >= 1 && day <= lastDayOfMonth;
};

// Função auxiliar para validar horas
const isValidTime = (hours: number, minutes: number): boolean => {
    return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
};
