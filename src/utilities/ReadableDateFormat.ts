export function readableDateFormat(date:string): string{
    let spt = String(new Date(date)).split(' ')
    return (`${spt[0]} ${spt[2]}/${spt[1]}/${spt[3]} (${spt[4]})`)
}