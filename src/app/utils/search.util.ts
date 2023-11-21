
/* eslint-disable @typescript-eslint/typedef */
const searchUtil = <T>(array: T[], key: keyof T, search: string): T[] => {

    return [...array].filter((str: T) => {
        const getKey: T[keyof T] = str[key];

        const result: string = getKey as string;
        const find = result.toLocaleLowerCase().includes(search.toLowerCase());
        return find;
    });
};

export default searchUtil;