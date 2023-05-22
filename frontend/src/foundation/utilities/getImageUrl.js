import {CloudinaryImage} from '@cloudinary/url-gen';
import {fill} from '@cloudinary/url-gen/actions/resize';
import {IMAGE_ASSETS_PATH} from 'foundation/constants';

export function getImageUrl(image, logo, size) {
  const HEIGHT_SIZE = size ? size.height : 250;
  const WIDTH_SIZE = size ? size.width : 300;

  const cldImage = new CloudinaryImage(image, {
    cloudName: 'dv6n26bjx',
    secure: true,
  }).resize(fill().height(HEIGHT_SIZE).width(WIDTH_SIZE));

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
      .resize(fill().height(HEIGHT_SIZE).width(WIDTH_SIZE))
      .toURL();
  }

  return cldImage.toURL();
}
