const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiFetch = (url: string, options?:RequestInit) => {
    if (options?.body){
        const headers = new Headers(options?.headers || {});
        if(!headers.has("Content-Type")){
            headers.set("Content-Type", "application/json; charset=utf-8");
        }
        options.headers = headers;
    }
    return fetch(`${NEXT_PUBLIC_API_BASE_URL}${url}`,options)
    .then((res) => res.json());
}


export async function isLogin(): Promise<boolean>{
    return apiFetch(`/api/v1/members/my`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    }).then((data) => {
        if (data.resultCode === "200-1") return true;
        else return false;
    });}
