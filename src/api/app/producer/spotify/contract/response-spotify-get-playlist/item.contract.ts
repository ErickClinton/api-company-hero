import { ExternalUrlsContract } from "./externalUrls.contract";
import { ImagesContract } from "./images.contract";
import { OwnerContract } from "./owner.contract";
import { TracksContract } from "./tracks.contract";

export class ItemContract {
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrlsContract;
    href: string;
    id: string;
    images: ImagesContract[];
    name: string;
    owner: OwnerContract;
    primary_color?: string;
    public?: string;
    snapshot_id: string;
    "tracks": TracksContract;
    type: string;
    uri: string;
}
