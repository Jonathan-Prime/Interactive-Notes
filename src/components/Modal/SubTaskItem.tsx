import { Subtask } from '../../types';


interface IProps {
    subtask: Subtask,
    i: number,
    onChangeSubtaskStatus: (val: boolean) => void
}

const SubTaskItem = ({ subtask, i, onChangeSubtaskStatus }: IProps) => {

    return (
        <>
            <label
                key={i}
                htmlFor={`${subtask}-${i}`}
                className={`text-[13px] font-bold p-3 mb-2 inline-flex w-full rounded transition bg-lightGrey cursor-pointer hover:bg-mainPurple hover:bg-opacity-25 dark:text-white dark:bg-veryDarkGrey dark:hover:bg-mainPurple dark:hover:bg-opacity-25`}
            >
                <input
                    type="checkbox"
                    checked={subtask?.isCompleted}
                    className="mr-3 accent-mainPurple"
                    onChange={() => { onChangeSubtaskStatus(!subtask.isCompleted) }}
                />
                <span className={`${subtask.isCompleted ? "opacity-50 line-through" : "opacity-100"} transition`}>
                    {subtask?.description}
                </span>
            </label>
        </>
    )
}



export default SubTaskItem;