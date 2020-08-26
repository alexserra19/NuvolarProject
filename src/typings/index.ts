
interface ICurrentUser {
    profile: IGitUser;
    followers: Array<{}>;
    repositories: Array<{}>
    userInfo: any
}

interface IGitUser {
    login: string;
    avatar_url: string;
}
