
const interceptor = {
    async doRequest(url, method = 'GET') {

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });

        const responseJson = await this.responseConvertToJson(response)
        return responseJson;
    },

    async responseConvertToJson(response) {

        const respBody =  await response.json();
        return(
            {
                isSuccess: (response.status >= 200 && response.status <= 299),
                body: respBody
            }
        )
    }
}

export default interceptor;