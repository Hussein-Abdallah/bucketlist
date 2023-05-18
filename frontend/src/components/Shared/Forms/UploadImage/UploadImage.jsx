import {FilePond, registerPlugin} from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPlugonFilePoster from 'filepond-plugin-file-poster';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import {useEffect, useState} from 'react';
import {useFormikContext} from 'formik';

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPlugonFilePoster,
);

export function UploadImage({image}) {
  const [file, setFile] = useState(() =>
    image
      ? [
          {
            source: image,
            options: {
              type: 'local',
            },
          },
        ]
      : [],
  );
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
      server={{
        load: (source, load, error, progress, abort, headers) => {
          var myRequest = new Request(source);
          fetch(myRequest).then(function (response) {
            response.blob().then(function (myBlob) {
              load(myBlob);
            });
          });
        },
      }}
      labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
      credits={false}
      acceptedFileTypes={['image/png', 'image/jpeg', 'image/jpg', 'image/gif']}
      acceptedFileTypesLabel="Only images are allowed"
      imagePreviewHeight={400}
      allowImagePreview={true}
    />
  );
}
