// import { useField, FieldAttributes, ErrorMessage } from 'formik';
// import { TextareaHTMLAttributes } from 'react';

// type textAreaProps = { label: string } & FieldAttributes<{}>;



// const TextArea: React.FC<textAreaProps> = ({ label, ...props }) => {
//   const [field, meta] = useField<{}>(props);
//   return (
//     <div className="mb-6">
//       <label
//         className="texts-sm text-mediumGrey dark:text-white block"
//         htmlFor={field.name}
//       >
//         {label}
//       </label>
//       <textarea
//         className={`bg-white dark:bg-darkGrey body-lg w-full h-28 px-4 py-2 my-2 block rounded text-black dark:text-white resize-none border border-mediumGrey border-opacity-25 placeholder:opacity-25
//        focus:outline-none focus:border-mainPurple
//         ${
//           meta.touched &&
//           meta.error &&
//           ' border-2 border-opacity-100 border-mainRed'
//         }`}
//         {...field}
//         {...props}
//         {...(props.innerRef ? { ref: props.innerRef } : {})}
//         autoComplete="off"
//       />
//       <ErrorMessage component="div" name={field.name} className="mt-2 text-sm text-red-500" />
//     </div>
//   );
// };

// export default TextArea;

import { useField, FieldAttributes, ErrorMessage } from 'formik';
import React, { TextareaHTMLAttributes } from 'react';

type textAreaProps = {
  label: string;
} & FieldAttributes<TextareaHTMLAttributes<HTMLTextAreaElement>>;

const TextArea: React.FC<textAreaProps> = ({ label, ...props }) => {
  const [field, meta] = useField<TextareaHTMLAttributes<HTMLTextAreaElement>>(props);
  return (
    <div className="mb-3 mt-4">
      <label
        className="texts-sm text-mediumGrey sm:text-[16px] text-[14px] dark:text-white block"
        htmlFor={field.name}
      >
        {label}
      </label>
      <textarea
        className={`bg-white dark:bg-darkGrey body-lg w-full sm:h-28 h-20 sm:text-[16px] text-[14px] px-4 py-2 block rounded text-black dark:text-white resize-none border border-mediumGrey border-opacity-25 placeholder:opacity-25
       focus:outline-none focus:border-mainPurple
        ${
          meta.touched &&
          meta.error &&
          ' border-2 border-opacity-100 border-mainRed'
        }`}
        {...field}
        {...props}
        autoComplete="off"
        ref={props.innerRef}
        name={props.name}
      />
      <ErrorMessage component="div" name={field.name} className="mt-2 text-sm text-red-500" />
    </div>
  );
};

export default TextArea; 
