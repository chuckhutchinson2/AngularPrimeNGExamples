export interface FeatureCollection {
	collectionType: string;
	metaData: FeatureMetaData;
	features: EarthQuakeFeature[];
	boundingBox: number[];
}

export interface FeatureMetaData {
	generated: number;
    url: string;
    title: string;
    api: string;
    count: number;
    status: number;
}

export interface EarthQuakeFeature {
	featureType: string;
	properties: EarthQuakeProperties;
	geometry: EarthQuakeGeometry;
	id: string;
}

export interface EarthQuakeProperties {
    mag: number;
    place: string;
    time: number;
    updated: number;
    tz: number;
    url: string;
    detail: string;
    felt:number;
    cdi: number;
    mmi: number;
    alert: string;
    status: string;
    tsunami: number;
    sig:number;
    net: string;
    code: string;
    ids: string;
    sources: string;
    types: string;
    nst: number;
    dmin: number;
    rms: number;
    gap: number;
    magType: string;
    type: string;  
}

export interface EarthQuakeGeometry {
	type: string;
	coordinates: number[];
}
