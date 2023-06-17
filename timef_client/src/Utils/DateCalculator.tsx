export const getPaddingDays = (date : Date) =>{
    const firstDay = (`${date}`.substring(0,3))

    switch(firstDay) {
        case 'Sun':
            return 0
        case 'Sat':
            return 6
        case 'Fri':
            return 5
        case 'Thu':
            return 4
        case 'Wed':
            return 3
        case 'Tue':
            return 2
        default : 
            return 1
    }
}
