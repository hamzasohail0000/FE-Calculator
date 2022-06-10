const token = localStorage.getItem('token');
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
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		return buildResponseWithStatus(rawResponse);
	} catch (error) {
		console.error(error);
		return buildResponseWithStatus({ ok: false, status: 500 });
	}
}

export async function createImage(data) {
	try {
		let url = `${'http://cloudcomputingassignment1.azurewebsites.net'}/${'images'}`;
		const rawResponse = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			body: JSON.stringify(data),
		});
		return buildResponseWithStatus(rawResponse);
	} catch (error) {
		console.error(error);
		return buildResponseWithStatus({ ok: false, status: 500 });
	}
}

export async function deleteImage(id) {
	try {
		let url = `${'http://cloudcomputingassignment1.azurewebsites.net'}/${'images'}/${id}`;
		const rawResponse = await fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		});
		return buildResponseWithStatus(rawResponse);
	} catch (error) {
		console.error(error);
		return buildResponseWithStatus({ ok: false, status: 500 });
	}
}

export async function Signup(data) {
	try {
		let url = `${'http://cloudcomputingassignment1.azurewebsites.net'}/${'Signup'}`;
		const rawResponse = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		return buildResponseWithStatus(rawResponse);
	} catch (error) {
		console.error(error);
		return buildResponseWithStatus({ ok: false, status: 500 });
	}
}

export async function Signin(data) {
	try {
		let url = `${'http://cloudcomputingassignment1.azurewebsites.net'}/${'Signin'}`;
		const rawResponse = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		return buildResponseWithStatus(rawResponse);
	} catch (error) {
		console.error(error);
		return buildResponseWithStatus({ ok: false, status: 500 });
	}
}

export async function getAllImages(createdBy) {
	try {
		let url = `${'http://cloudcomputingassignment1.azurewebsites.net'}/${
			'images?createdBy=' + createdBy
		}`;
		const rawResponse = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		});
		return buildResponseWithStatus(rawResponse);
	} catch (error) {
		console.error(error);
		return buildResponseWithStatus({ ok: false, status: 500 });
	}
}
