import { S3, S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";
import { S3ClientConfig } from "@aws-sdk/client-s3";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool} from "@aws-sdk/credential-provider-cognito-identity"

var albumBucketName = 'toilet-img';
var bucketRegion = 'ap-northeast-2';
var IdentityPoolId = 'ap-northeast-2:2d2379f3-53b0-483c-b484-2a264f42c276';

const s3 = new S3Client({
    region: bucketRegion,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: bucketRegion }),
      identityPoolId: IdentityPoolId, // IDENTITY_POOL_ID e.g., eu-west-1:xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxx
    }),
  });
  // Show the photos that exist in an album
export const viewAlbum = async (albumName, pk) => {
    try {
      const albumPhotosKey = encodeURIComponent(albumName) + "/" + pk;
      const data = await s3.send(
        new ListObjectsCommand({
          Prefix: albumPhotosKey,
          Bucket: albumBucketName,
        })
      );
      console.log(data)
      const href = "https://s3." + bucketRegion + ".amazonaws.com/";
      const bucketUrl = href + albumBucketName + "/";
      const urls = []

      const photos = data.Contents.map(function (photo) {
        const photoKey = photo.Key;
        const photoUrl = bucketUrl + encodeURIComponent(photoKey);
        console.log(photoUrl)
        urls.push(photoUrl)
      });
      console.log(urls)

      return urls;
    } catch (err) {
      return alert("There was an error viewing your album: " + err.message);
    }
  };
  
  // Make the viewAlbum function available to the browser
  window.viewAlbum = viewAlbum;