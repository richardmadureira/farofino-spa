const ZERO = "0";
const BLANK = "";
const BARRA = "/";
const DOIS_PONTOS = ":";
const ESPACO = " ";

export function getDiaFormatado(date) {
    return date ? date.getDate().toString().padStart(2, ZERO) : BLANK;
}

export function getMesFormatado(date) {
    return date ? date.getMonth().toString().padStart(2, ZERO) : BLANK;
}

export function getAnoFormatado(date) {
    return date ? date.getFullYear().toString() : BLANK;
}

export function getHoraFormatado(date) {
    return date ? date.getHours().toString().padStart(2, ZERO) : BLANK;
}

export function getMinutoFormatado(date) {
    return date ? date.getMinutes().toString().padStart(2, ZERO) : BLANK;
}

export function getSegundoFormatado(date) {
    return date ? date.getSeconds().toString().padStart(2, ZERO) : BLANK;
}

export function getDiaMesFormatado(date) {
    return getDiaFormatado(date) + BARRA + getMesFormatado(date);
}

export function getMesAnoFormatado(date) {
    return getMesFormatado(date) + BARRA + getAnoFormatado(date);
}

export function getDiaMesAnoFormatado(date) {
    return getDiaFormatado(date) + BARRA + getMesFormatado(date) + BARRA + getAnoFormatado(date);
}

export function getHoraMinutoFormatado(date) {
    return getHoraFormatado(date) + DOIS_PONTOS + getMinutoFormatado(date);
}

export function getHoraMinutoSegundoFormatado(date) {
    return getHoraMinutoFormatado(date) + DOIS_PONTOS + getSegundoFormatado(date);
}

export function getDiaMesAnoHoraMinutoFormatado(date) {
    return getDiaMesAnoFormatado(date) + ESPACO + getHoraMinutoFormatado(date);
}

export function getDiaMesAnoHoraMinutoSegundoFormatado(date) {
    return getDiaMesAnoFormatado(date) + ESPACO + getHoraMinutoSegundoFormatado(date);
}
