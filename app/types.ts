  export interface ILogInData {
    email: string,
    password: string
  }

  export interface ISignUpData {
    userName: string,
    email: string,
    password: string
  }

  export interface IUserBasic {
    userName: string,
    email: string,
    bio: string,
    profilePic: string
  }

  export interface ILoginResponse {
    user: IUserBasic;
  }

  export interface ISignUpResponse {
    user: IUserBasic;
  }