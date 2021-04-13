export const getInitials = (string) =>
    string
        .split(' ')
        .map(([firstLetter]) => firstLetter)
        .filter(
            (_, index, array) =>
                index === 0 || index === array.length - 1
        )
        .join('')
        .toUpperCase()
