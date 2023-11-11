export function dateFormatter(stringDate: string){
    const date = new Date(stringDate);
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};
