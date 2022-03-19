export const getImgUrl = (imgPath, width = 185) => {
    return `https://image.tmdb.org/t/p/w${width}${imgPath}`
}

export const formatDate = date => {
    const newDate = new Date(date)
    return newDate.getMonth() + 1 + '/' + (newDate.getDate() + 1) + '/' + newDate.getFullYear()
}
