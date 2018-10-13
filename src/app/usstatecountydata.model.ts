export interface USStateCountyData {
    CountyName: String;
    StateCounty: String;
    stateabbr: String;
    StateAbbr: String;
    geometry: StateCountyPoint[];
    value: number;
    GEO_ID: String;
    GEO_ID2: number;
    GeographicName: String;
    STATEnum: number;
    COUNTYnum: number;
    FIPSformula: number;
    Haserror: number;
  };

export interface StateCountyPoint {
    lat: number;
    lng: number;
}