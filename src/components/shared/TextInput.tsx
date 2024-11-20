import { useField, FieldAttributes, Field, ErrorMessage } from 'formik';
import React from 'react'

type myInputProps = { label?: string } & FieldAttributes<{}>;

const TextInput: React.FC<myInputProps> = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className="flex-grow">
            {label && (
                <label
                    className="body-md sm:text-[16px] text-[14px] text-mediumGrey dark:text-white block"
                    htmlFor={field.name}
                >
                    {label}
                </label>)
            }
            <div className="relative">

                <Field
                    className={`flex-1 bg-white body-lg w-full px-4 py-2 block rounded sm:text-[16px] text-[14px] border text-black border-mediumGrey border-opacity-25 placeholder:opacity-25 focus:outline-none focus:border-mainPurple dark:bg-darkGrey dark:text-white ${meta.touched &&
                        meta.error &&
                        'border-opacity-100 border-mainRed'
                        }`}
                    {...field}
                    {...props}
                    autoComplete="off"
                />
                <ErrorMessage component="div" name={field.name} className="text-mainRed body-lg text-sm absolute right-4 top-1/2 -translate-y-1/2" />
            </div>
        </div>
    );
};

export default TextInput;

