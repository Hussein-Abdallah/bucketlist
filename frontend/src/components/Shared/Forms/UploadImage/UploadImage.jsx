import {FilePond, registerPlugin} from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import {useEffect, useState} from 'react';
import {useFormikContext} from 'formik';

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
);

export function UploadImage() {
  const [file, setFile] = useState([]);
  const {setFieldValue} = useFormikContext();

  useEffect(() => {
    if (file.length > 0) {
      setFieldValue('image', file[0].file);
    } else {
      setFieldValue('image', null);
    }
  }, [file, setFieldValue]);
  return (
    <FilePond
      files={file}
      onupdatefiles={setFile}
      allowMultiple={false}
      name="image"
      labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
      credits={false}
      acceptedFileTypes={['image/png', 'image/jpeg', 'image/jpg', 'image/gif']}
      acceptedFileTypesLabel="Only images are allowed"
      imagePreviewHeight={400}
    />
  );
}
