export const environment = {
    production:true,
//    apiUrl:`https://gurmepet.com.tr/api/`
    apiUrl: typeof window === 'undefined' 
    ? 'http://nginx:8080/api/'   // SSR (server-side)
    : 'https://gurmepet.com.tr/api/'
};
