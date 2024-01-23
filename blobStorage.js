const { BlobServiceClient } = require('@azure/storage-blob');
const config = require('./config/config.json')

const blobUpload =async (filename, screenshotBuffer) => {

    // Initialize BlobServiceClient
    const blobServiceClient = BlobServiceClient.fromConnectionString(config.azure.connectionstring);
    
    // Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient(config.azure.containername);
    
    // Generate a unique filename (you may use the entry ID or any other unique identifier)
    const blockBlobClient = containerClient.getBlockBlobClient(filename);
    
    console.log(
        `\nUploading to Azure storage as blob\n\tname: ${filename}:\n\tURL: ${blockBlobClient.url}`
      );
    
    // Upload the image to Azure Blob Storage
    const uploadBlobResponse = await blockBlobClient.upload(screenshotBuffer, screenshotBuffer.length);
    return {blobUrl : blockBlobClient.url, blobRequestId : uploadBlobResponse.requestId}
}

module.exports = {blobUpload}