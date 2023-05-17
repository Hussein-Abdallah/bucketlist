export function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append(
    'upload_preset',
    process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
  );
  formData.append('cloud_name', process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
  return fetch(process.env.REACT_APP_CLOUDINARY_FETCH_URL, {
    method: 'POST',
    body: formData,
  }).then((res) => res.json());
}
