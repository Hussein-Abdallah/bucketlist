import {CloudinaryImage} from '@cloudinary/url-gen';
import {fill} from '@cloudinary/url-gen/actions/resize';
import {IMAGE_ASSETS_PATH} from 'foundation/constants';

export function getImageUrl(image, logo) {
  const cldImage = new CloudinaryImage(image, {
    cloudName: 'dv6n26bjx',
    secure: true,
  }).resize(fill().height(250).width(300));

  if (logo) {
    return new CloudinaryImage(IMAGE_ASSETS_PATH.logo, {
      cloudName: 'dv6n26bjx',
      secure: true,
    }).toURL();
  }
  if (!cldImage || !image) {
    return new CloudinaryImage(IMAGE_ASSETS_PATH.placeHolder, {
      cloudName: 'dv6n26bjx',
      secure: true,
    })
      .resize(fill().height(250).width(300))
      .toURL();
  }

  return cldImage.toURL();
}
