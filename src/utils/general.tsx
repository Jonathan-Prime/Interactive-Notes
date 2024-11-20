
export function formatDate(dateItem: string | undefined) {
    const dateString = dateItem
    const date = new Date(dateString as string);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
}

export const characterLimit = (text: string | undefined, limit: number) => text?.length! > limit ? (text!.substr(0, limit - 1).trim() + '...') : text;


