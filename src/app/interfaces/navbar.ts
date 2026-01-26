export interface Navbar {
    id:number,
    parent_id:number | null,
    name:string,
    slug:string,
    image:string | null,
    children?:Navbar[],
    popular_adverts?:any[]
}
