import React, { useEffect, useState } from 'react';
import { BlobServiceClient } from '@azure/storage-blob';
import { createImage, getAllImages } from '../../commonServices';

export default function ImageUploader() {
  const containerName = `tutorial-container`;
  const sasToken = process.env.REACT_APP_STORAGESASTOKEN;
  const storageAccountName = process.env.REACT_APP_STORAGERESOURCENAME;
  const [fileSelected, setFileSelected] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [blobList, setBlobList] = useState([]);
  const [inputKey, setInputKey] = useState('');
  const [imagesList, setImagesList] = useState([]);

  useEffect(async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const getImages = await getAllImages(user._id);
    setImagesList(getImages.data);
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
    setFileSelected(event.target.files[0]);
    console.log({ eventFile: event.target.files });
    const user = JSON.parse(localStorage.getItem('user'));
    const imageObj = {
      fileName: event.target.files[0].name,
      fileSize: event.target.files[0].size / 1000 / 1000,
      createdBy: user._id,
    };
    const res = await createImage(imageObj);
    console.log({ res });
  };

  const onFileUpload = async () => {
    // prepare UI
    setUploading(true);

    // *** UPLOAD TO AZURE STORAGE ***
    const blobsInContainer = await uploadFileToBlob(fileSelected);
    console.log({ blobsInContainer });

    // prepare UI for results
    setBlobList(blobsInContainer);

    // reset state/form
    setFileSelected(null);
    setUploading(false);
    setInputKey(Math.random().toString(36));
  };
  return (
    <div>
      <div style={{ margin: '20px' }}>
        <h4>Choose an Image to upload</h4>

        <input type="file" onChange={onFileChange} key={inputKey} />
        <button type="submit" onClick={onFileUpload}>
          Upload!
        </button>

        {uploading && '    . . . File Uploading. Please Wait'}
      </div>
      <hr></hr>
      <h4>Uploaded Images</h4>
      {imagesList.map((item, index) => (
        <img
          src={`https://cloudimagestorage.blob.core.windows.net/tutorial-container/${item.fileName}`}
          width={200}
          height={200}
          key={item.fileName + index}
          style={{ margin: '20px' }}
        />
      ))}
    </div>
  );
}
