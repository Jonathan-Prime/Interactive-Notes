export interface InteractiveNotes {
    title: string,
    text: string
}

export interface IBoard {
    title: string,
    notes: InteractiveNotes[]
}

export interface IUser {
    // role: string;
    username: string;
    email: string;
    password: string;
    // board:IBoard[]
}


// auth
export interface IUserSignUp {
    username: string;
    email: string;
    password: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserForgotPassword {
    email: string;
}

export interface IResetPassword {
    email: string;
}

// user
export interface IToken {
    token: string;
}





// subtask
export interface Subtask {
    description: string;
    isCompleted: boolean;
}