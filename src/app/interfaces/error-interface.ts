export interface ErrorInterface {
    status:'error' | 'success' | 'warning';
    action:'redirect',
    errors: Record<string, string[] | string>;
}
