import { useAppSelector } from '@/network/hooks';
import React from 'react';
import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie, Doughnut } from 'react-chartjs-2';

// Registrar los componentes necesarios
Chart.register(ArcElement, Tooltip, Legend, Title);

const DashBoardStats: React.FC = () => {
    const { user } = useAppSelector((state: any) => state.user);

    // Total number of boards
    const totalBoards = user?.boards.length;

    // Total number of tasks
    const totalTasks = user?.boards?.reduce((total: number, board: any) => {
        return total + board?.notes.length;
    }, 0);

    // Total number of subtasks
    const totalSubtasks = user?.boards?.reduce((total: number, board: any) => {
        return total + board?.notes.reduce((taskTotal: number, task: any) => {
            return taskTotal + task.subTasks.length;
        }, 0);
    }, 0);


    const getTaskData = () => {
        const priorityCount: { [key: string]: number } = {
            critical: 0,
            medium: 0,
            blocker: 0,
            trivial: 0,
            high: 0,
        };
        let totalCount = 0;
        user?.boards.forEach((board: any) => {
            board?.notes.forEach((task: any) => {
                priorityCount[task.priority] = (priorityCount[task.priority] || 0) + 1;
                totalCount += 1;
            });
        });
        const backgroundColors: { [key: string]: string } = {
            critical: '#e23b5f',
            medium: '#67ff01',
            blocker: '#ff0000',
            trivial: '#0509fe',
            high: '#c4ba00',
        };
        const taskData = {
            labels: [] as string[],
            datasets: [
                {
                    data: [] as number[],
                    backgroundColor: [] as string[],
                },
            ],
        };
        for (const priority in priorityCount) {
            taskData.labels.push(priority);
            taskData.datasets[0].data.push(priorityCount[priority]);
            taskData.datasets[0].backgroundColor.push(backgroundColors[priority]);
        }
        return taskData;
    };




    const getSubtaskData = () => {
        const subtaskData = {
            labels: [] as string[],
            datasets: [{
                data: [] as number[],
                backgroundColor: ['#4ddc00', '#0008ea'],
            }],
        };
        let completedCount = 0;
        let totalCount = 0;
        user?.boards.forEach((board: any) => {
            board.notes.forEach((task: any) => {
                task.subTasks.forEach((subtask: any) => {
                    if (subtask.isCompleted) {
                        completedCount += 1;
                    }
                    totalCount += 1;
                });
            });
        });
        subtaskData.labels = ['Completed', 'Not Completed'];
        subtaskData.datasets[0].data = [completedCount, totalCount - completedCount];
        return subtaskData;
    };

    const options = {
        responsive: true,
        legend: {
            position: 'right',
            labels: {
                fontStyle: 'normal',
                textTransform: 'capitalize',
            },
        },

    };



    return (
        <div className='bg-lightGrey dark:bg-veryDarkGrey h-full sm:pt-20 pt-6  px-4'>
            <div className='stats-count space-x-4 dark:bg-darkGrey dark:text-mediumGrey dark:shadow-none'>
                <div>
                    <article>{totalBoards}</article>
                    <article> Board{totalBoards > 1 && 's'}</article>
                </div>
                <div>
                    <article>{totalTasks}</article>
                    <article> Task{totalTasks > 1 && 's'}</article>

                </div>
                <div>
                    <article>{totalSubtasks}</article>
                    <article> Sub-Task{totalSubtasks > 1 && 's'}</article>

                </div>
            </div>
            <div className='chart-container ' >
                <section className='chart-container-content dark:bg-darkGrey dark:text-mediumGrey dark:shadow-none'>
                    <div>
                        <h2>Subtask Completion</h2>
                        <Pie data={getSubtaskData()} options={options} />
                    </div>
                    <div>
                        <h2>Task Priorities</h2>
                        <Doughnut data={getTaskData()} options={options} />
                    </div>
                </section>
            </div> 
        </div>
    )
}

export default DashBoardStats