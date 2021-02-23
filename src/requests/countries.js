const request = async () => {

    const response = await fetch('https://restcountries.eu/rest/v2/all')
    if(response.status === 200){
        return response.json()
    } else {
        throw new Error('Unable to fetch countrires')
    }

}

export default request