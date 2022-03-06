async function buildResponseWithStatus(rawResponse) {
    let responseDataWithStatus = {};
    if (rawResponse.ok) {
        try {
            responseDataWithStatus = await rawResponse.json();
        } catch (error) {
            responseDataWithStatus.ok = false;
        }
        responseDataWithStatus.ok = true;
    } else {
        responseDataWithStatus.ok = false;
    }
    responseDataWithStatus.status = rawResponse.status;
    return responseDataWithStatus;
}

export async function createOne(data) {
    try {
        let url = `${'http://cloudcomputingassignment1.azurewebsites.net'}/${'calculations'}`;
        const rawResponse = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return buildResponseWithStatus(rawResponse);
    } catch (error) {
        console.error(error);
        return buildResponseWithStatus({ ok: false, status: 500 });
    }
}