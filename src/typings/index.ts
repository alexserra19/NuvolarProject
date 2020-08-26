
interface ICurrentUser {
    profile: IGitUser
}

interface IGitUser {
    login: string;
    avatar_url: string;
}
