import {CloudinaryImage} from '@cloudinary/url-gen';
import {fill} from '@cloudinary/url-gen/actions/resize';

export function getImageUrl(image) {
  const cldImage = new CloudinaryImage(image, {
    cloudName: 'dv6n26bjx',
    secure: true,
  }).resize(fill().height(250).width(300));

  if (!cldImage || !image) {
    return new CloudinaryImage('bucketlist/pxbsztxuay31oyjkfsha.gif', {
      cloudName: 'dv6n26bjx',
      secure: true,
    })
      .resize(fill().height(250).width(300))
      .toURL();
  }

  return cldImage.toURL();
}
