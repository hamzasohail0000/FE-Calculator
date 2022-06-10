import React, { useEffect, useState } from 'react';
import { BlobServiceClient } from '@azure/storage-blob';
import { createImage, getAllImages, deleteImage } from '../../commonServices';
import { useNavigate } from 'react-router-dom';

let imagesize = 0;
export default function ImageUploader() {
	const navigate = useNavigate();
	const containerName = `tutorial-container`;
	const sasToken = process.env.REACT_APP_STORAGESASTOKEN;
	const storageAccountName = process.env.REACT_APP_STORAGERESOURCENAME;
	const [fileSelected, setFileSelected] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [blobList, setBlobList] = useState([]);
	const [inputKey, setInputKey] = useState('');
	const [imagesList, setImagesList] = useState([]);
	async function getImages() {
		const user = JSON.parse(localStorage.getItem('user'));
		const getImages = await getAllImages(user._id);
		setImagesList(getImages.data);
	}
	useEffect(async () => {
		await getImages();
	}, []);

	const createBlobInContainer = async (containerClient, file) => {
		// create blobClient for container
		const blobClient = containerClient.getBlockBlobClient(file.name);

		// set mimetype as determined from browser with file upload control
		const options = { blobHTTPHeaders: { blobContentType: file.type } };

		// upload file
		await blobClient.uploadData(file, options);
	};

	const getBlobsInContainer = async (containerClient) => {
		const returnedBlobUrls = [];

		// get list of blobs in container
		// eslint-disable-next-line
		for await (const blob of containerClient.listBlobsFlat()) {
			// if image is public, just construct URL
			returnedBlobUrls.push(
				`https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`
			);
		}

		return returnedBlobUrls;
	};
	// <snippet_uploadFileToBlob>
	const uploadFileToBlob = async (file) => {
		if (!file) return [];

		// get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
		const blobService = new BlobServiceClient(
			`https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
		);

		// get Container - full public read access
		const containerClient = blobService.getContainerClient(containerName);
		await containerClient.createIfNotExists({
			access: 'container',
		});

		// upload file
		await createBlobInContainer(containerClient, file);

		// get list of blobs in container
		return getBlobsInContainer(containerClient);
	};

	const onFileChange = async (event) => {
		// capture file into state
		console.log(
			parseInt(imagesize) + parseInt(event.target.files[0].size) / 1000 / 1000 >
				8
		);
		if (parseInt(imagesize) + event.target.files[0].size / 1000 / 1000 > 8) {
			alert(
				'You have used more than 80% of your space please delete some images.'
			);
		} else if (
			parseInt(imagesize) + event.target.files[0].size / 1000 / 1000 >
			10
		) {
			alert('You have used 100% space please delete some images.');
			setFileSelected(null);
			return;
		}

		setFileSelected(event.target.files[0]);
		const user = JSON.parse(localStorage.getItem('user'));
		const imageObj = {
			fileName: event.target.files[0].name,
			fileSize: event.target.files[0].size / 1000 / 1000,
			createdBy: user._id,
		};
		const res = await createImage(imageObj);
	};

	const onFileUpload = async () => {
		// prepare UI
		setUploading(true);

		// *** UPLOAD TO AZURE STORAGE ***
		const blobsInContainer = await uploadFileToBlob(fileSelected);

		// prepare UI for results
		setBlobList(blobsInContainer);

		// reset state/form
		setFileSelected(null);
		setUploading(false);
		await getImages();
		setInputKey(Math.random().toString(36));
	};

	const onLogout = async () => {
		// prepare UI
		navigate('/');
	};
	imagesize = imagesList.length
		? imagesList.reduce((acc, item) => acc + item.fileSize, 0).toFixed(2) || 0
		: 0;
	const allImageSize = (imagesize / 10) * 100 || 0;
	return (
		<div style={{ margin: '20px' }}>
			<div style={{ margin: '20px' }}>
				<h2>Choose an Image to upload</h2>

				<input type="file" onChange={onFileChange} key={inputKey} />
				<button type="submit" onClick={onFileUpload}>
					Upload!
				</button>
				<button
					style={{
						width: '100px',
						height: '30px',
						marginLeft: '75%',
						backgroundColor: 'blue',
						color: 'white',
					}}
					onClick={onLogout}
				>
					logout
				</button>

				{uploading && '    . . . File Uploading. Please Wait'}
			</div>
			<div style={{ margin: '20px' }}>
				<hr></hr>
				<h3>Storage</h3>
				You have used cloud storage of {imagesize} MB out of 10MB.
				<br />
				<label for="file">Used Storage:</label>
				<progress id="file" value={allImageSize} max="100"></progress>
				{allImageSize.toFixed(2)}%<hr></hr>
			</div>
			<h4>Uploaded Images</h4>
			{imagesList.map((item, index) => (
				<div
					style={{ border: 'solid', display: 'inline-block', margin: '10px' }}
				>
					<img
						src={`https://cloudimagestorage.blob.core.windows.net/tutorial-container/${item.fileName}`}
						width={200}
						height={200}
						key={item.fileName + index}
						style={{ margin: '20px' }}
					/>
					<button
						type="button"
						style={{
							background: 'red',
							color: 'white',
							marginBottom: '10px',
						}}
						key={item.fileName + index + 'button'}
						value={index}
						id={index}
						onClick={(e) => {
							deleteImage(imagesList[parseInt(e.target.id)]._id).then(
								async () => await getImages()
							);
						}}
					>
						Delete!
					</button>
				</div>
			))}
		</div>
	);
}
