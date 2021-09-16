export const toDateTime = (value:number) => {
    return `${zeroCond(Math.floor(value / 60))}:${zeroCond(value % 60)}`
}

const zeroCond = (value: number) => {
    return value > 10 ? value : '0' + value
}