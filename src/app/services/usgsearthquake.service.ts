import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

import { FeatureCollection} from '../earthquakedata.model';

// earth quakes
// http://geojson.org/
// https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_hour.geojson
// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_hour.geojson
// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_hour.geojson
// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson
// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson
// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.geojson
// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson
// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson
// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson
// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson
// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson
// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson
// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson
// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson
// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson
// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson
// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson
// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson
// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson
// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson

@Injectable()
export class USGSEarthquakeService {

  	url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/';

    constructor(private http:HttpClient) {
    }

  	load(magnitude, period): Observable<FeatureCollection> {
  		var url = this.url + magnitude +'_' + period + '.geojson';
  		
  		console.log(url);

        return this.http.get<FeatureCollection>(url);
    }
}