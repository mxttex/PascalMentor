export const formatItalianDate = (dateStr) => {
    const date = new Date(dateStr);
    const giorni = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
    const mesi = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
    const nomeGiorno = giorni[date.getDay()];
    const giorno = date.getDate();
    const nomeMese = mesi[date.getMonth()];
    const anno = date.getFullYear();
    return `${nomeGiorno} ${giorno} ${nomeMese} ${anno}`;
};
