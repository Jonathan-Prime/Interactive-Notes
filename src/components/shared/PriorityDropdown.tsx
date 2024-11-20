
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import TextInput from "./TextInput";
import { priorityArr } from "@/utils/data";
import { menuVariations } from "@/utils/animation";

interface IProps {
    setStatus: any,
    label: any,
}

const PriorityDropdown = ({ label = "Status", setStatus }: IProps) => {
    
    const [showMenu, setShowMenu] = useState(false);
   

    return (
        <>
            <h3 className="mt-6 body-md text-mediumGrey sm:text-[16px] text-[14px] dark:text-white">{label}</h3>
            <div className="relative z-0">
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    type="button"
                    className="inline-flex justify-between items-center w-full bg-white text-sm font-medium text-black focus:outline-mainPurple dark:bg-darkGrey dark:text-white dark:outline-darkGreyLine"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                >
                    <TextInput name={'priority'} disabled type="text" style={{ textTransform: 'capitalize' }} placeholder="select task priority"
                    />
                    <svg className="-mr-1 ml-2 h-5 w-5 fill-mainPurple" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
                <AnimatePresence>
                    {showMenu &&
                        <motion.div
                            className="origin-top-right absolute right-0 w-full rounded-md shadow-lg bg-white  focus:outline-none dark:bg-veryDarkGrey"
                            variants={menuVariations as any}
                            initial="closed"
                            animate={showMenu ? "open" : "closed"}
                            exit="closed"
                        >
                            <div className="py-1 zedder " >
                                {priorityArr.map((val: any, i: number) => (
                                    <a
                                        onClick={() => {
                                            setStatus('priority', val.name)
                                            setShowMenu(false)
                                        }}
                                        key={i}
                                        href="#"
                                        className="text-mediumGrey block px-4 py-2 text-sm hover:text-mainPurple hover:bg-mainPurple dark:hover:bg-white hover:bg-opacity-10 dark:hover:bg-opacity-10"
                                    >
                                        <span className="flex items-center space-x-2">
                                            <span>{val.icon}</span>
                                            <span className="capitalize">{val.name}</span>
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
        </>
    )
}
export default PriorityDropdown
