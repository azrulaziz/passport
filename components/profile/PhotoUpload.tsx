import React from "react";
import { useDropzone } from "react-dropzone";
import {UploadOutlined} from '@ant-design/icons'
import { PrimaryButton, PrimaryTransparentButton } from "components/common/Button";

const Dropzone = ({
    onChange,
  }) => {
  
    const {
      getRootProps,
      getInputProps,
    } = useDropzone({})
  
    return (
      <div {...getRootProps()}>
        <input {...getInputProps({ onChange })} />
        <PrimaryTransparentButton type="button" extraStyle="w-full px-0">
             <p className="flex items-center justify-center">
                 <UploadOutlined />
                 <span className="pl-1">Upload a new image</span>
             </p>
         </PrimaryTransparentButton>
      </div>
    )
}
// function Dropzone(props) {
//   const { onChange } = props;
//   const { getRootProps, getInputProps } = useDropzone();

    

//   return (
//     <div {...getRootProps()}>
//       <input {...getInputProps({ onChange })} />
//       <PrimaryTransparentButton type="button" extraStyle="w-full px-0">
//             <p className="flex items-center justify-center">
//                 <UploadOutlined />
//                 <span className="pl-1">Upload a new image</span>
//             </p>
//         </PrimaryTransparentButton>
//     </div>
//   );
// }

export default Dropzone

// export default function Form() {
//   const { handleSubmit, control } = useForm();

//   function onSubmit(data) {
//     console.log(data);
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Controller
//         name="file"
//         control={control}
//         render={({ onChange }) => <Dropzone onChange={onChange} />}
//       />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }
