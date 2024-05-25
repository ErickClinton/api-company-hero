import { ItemContract } from "./item.contract";

export class PlaylistContract {
    href: string;
    items: ItemContract[];
    limit: number;
    next: string;
    offset: number;
    previous?: string;
    total: number;
}
