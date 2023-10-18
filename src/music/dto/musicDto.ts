import { artist } from "./artistDto";

export class Music {
    name: string;
    duration_ms: number;
    image_url: string;
    release_date: string;
    artist: artist;
}
